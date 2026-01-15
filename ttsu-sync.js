// ttsu-sync.js - Google Drive sync for ttsu reading data
// Add this as a separate file and include it in both index.html and settings.html

const TTSU_FOLDER_ID_KEY = 'ttsu_folder_id';
const TTSU_SYNC_ENABLED_KEY = 'ttsu_sync_enabled';
const TTSU_ACCESS_TOKEN_KEY = 'ttsu_access_token';
const TTSU_TOKEN_EXPIRY_KEY = 'ttsu_token_expiry';
const TTSU_LAST_SYNC_KEY = 'ttsu_last_sync';

let googleAccessToken = null;
let tokenClient = null;
let autoSyncInterval = null;

// Initialize Google Identity Services
function initGIS() {
  if (tokenClient) return true;
  if (!window.google || !window.google.accounts) return false;
  
  try {
    tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: '374798694344-30ikmvggrspkd1shnci57pv4dq9n0r8s.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/drive.readonly',
      callback: (tokenResponse) => {
        if (tokenResponse.access_token) {
          googleAccessToken = tokenResponse.access_token;
          const expiresIn = tokenResponse.expires_in || 3600;
          const expiry = Date.now() + (expiresIn * 1000);
          
          localStorage.setItem(TTSU_ACCESS_TOKEN_KEY, googleAccessToken);
          localStorage.setItem(TTSU_TOKEN_EXPIRY_KEY, String(expiry));
        }
      }
    });
    return true;
  } catch (e) {
    console.error('GIS init error:', e);
    return false;
  }
}

// Check if we have a valid token
function hasValidToken() {
  const token = localStorage.getItem(TTSU_ACCESS_TOKEN_KEY);
  const expiry = localStorage.getItem(TTSU_TOKEN_EXPIRY_KEY);
  
  if (!token || !expiry) return false;
  
  const expiryTime = parseInt(expiry);
  const now = Date.now();
  
  if (now + (5 * 60 * 1000) >= expiryTime) {
    return false;
  }
  
  googleAccessToken = token;
  return true;
}

// Ensure we have a valid Drive token
async function ensureDriveToken({ allowPrompt = false } = {}) {
  if (hasValidToken()) return true;
  
  if (!allowPrompt) return false;
  
  if (!initGIS()) {
    throw new Error('Google Identity Services not initialized');
  }
  
  return new Promise((resolve) => {
    const originalCallback = tokenClient.callback;
    
    tokenClient.callback = (response) => {
      tokenClient.callback = originalCallback;
      
      if (response.access_token) {
        originalCallback(response);
        resolve(true);
      } else {
        resolve(false);
      }
    };
    
    tokenClient.requestAccessToken({ prompt: 'consent' });
  });
}

// Drive API call wrapper
async function driveApiCall(endpoint, token) {
  const response = await fetch(`https://www.googleapis.com/drive/v3/${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error(`Drive API error: ${response.status}`);
  }
  
  return response.json();
}

// Download file content
async function driveDownloadFile(fileId, token) {
  const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error(`File download error: ${response.status}`);
  }
  
  return response.text();
}

// Find ttsu folder
async function findTtsuFolder() {
  const query = encodeURIComponent("name='ttsu' and mimeType='application/vnd.google-apps.folder' and trashed=false");
  const data = await driveApiCall(`files?q=${query}&spaces=drive&fields=files(id,name)`, googleAccessToken);
  
  if (!data.files || data.files.length === 0) {
    return null;
  }
  
  return data.files[0].id;
}

// Sync from ttsu Google Drive
async function syncFromTtsuGDrive() {
  const folderId = localStorage.getItem(TTSU_FOLDER_ID_KEY);
  if (!folderId) throw new Error('No folder ID configured');
  
  const lastSync = localStorage.getItem(TTSU_LAST_SYNC_KEY);
  const lastSyncDate = lastSync ? new Date(lastSync) : new Date(0);
  
  const bookFoldersQuery = encodeURIComponent(`'${folderId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`);
  const bookFoldersData = await driveApiCall(`files?q=${bookFoldersQuery}&spaces=drive&fields=files(id,name)`, googleAccessToken);
  
  const bookFolders = bookFoldersData.files || [];
  let newSessionsCount = 0;
  
  const currentData = window.data || [];
  const currentBooks = window.recentBooks || [];
  
  for (const bookFolder of bookFolders) {
    const statsQuery = encodeURIComponent(`'${bookFolder.id}' in parents and name contains 'statistics' and mimeType='application/json' and modifiedTime>'${lastSyncDate.toISOString()}'`);
    const statsData = await driveApiCall(`files?q=${statsQuery}&spaces=drive&fields=files(id,name,modifiedTime)&orderBy=modifiedTime desc`, googleAccessToken);
    
    const files = statsData.files || [];
    if (files.length === 0) continue;
    
    const file = files[0];
    const fileContent = await driveDownloadFile(file.id, googleAccessToken);
    const ttsuData = JSON.parse(fileContent);
    
    if (!Array.isArray(ttsuData)) continue;
    
    ttsuData.forEach(session => {
      if (!session.dateKey || (session.charactersRead === 0 && session.readingTime === 0)) return;
      
      const date = session.dateKey;
      const minutes = Math.round(session.readingTime / 60);
      const characters = session.charactersRead || 0;
      
      if (minutes === 0 && characters === 0) return;
      
      const exists = currentData.some(entry => 
        entry.date === date && 
        entry.title === session.title &&
        Math.abs(entry.minutes - minutes) < 2 &&
        Math.abs(entry.characters - characters) < 100
      );
      
      if (!exists) {
        currentData.push({
          date: date,
          minutes: minutes,
          characters: characters,
          title: session.title || bookFolder.name || 'Reading'
        });
        newSessionsCount++;
        
        if (session.title && !currentBooks.includes(session.title)) {
          currentBooks.unshift(session.title);
        }
      }
    });
  }
  
  if (newSessionsCount > 0) {
    window.data = currentData;
    window.recentBooks = currentBooks.slice(0, 10);
    
    localStorage.setItem('reading_heatmap_data', JSON.stringify(window.data));
    localStorage.setItem('reading_heatmap_books', JSON.stringify(window.recentBooks));
    
    if (window.aggregateData) window.aggregateData();
    if (window.loadYear) window.loadYear();
    
    if (window.saveCloudState) await window.saveCloudState();
  }
  
  localStorage.setItem(TTSU_LAST_SYNC_KEY, new Date().toISOString());
  
  return newSessionsCount;
}

// Start auto-sync
function startAutoSync() {
  if (autoSyncInterval) {
    clearInterval(autoSyncInterval);
  }
  
  autoSyncInterval = setInterval(async () => {
    const enabled = localStorage.getItem(TTSU_SYNC_ENABLED_KEY) === 'true';
    if (!enabled) return;
    
    const hasToken = await ensureDriveToken({ allowPrompt: false });
    if (!hasToken) return;
    
    try {
      await syncFromTtsuGDrive();
      console.log('Auto-sync completed');
    } catch (error) {
      console.error('Auto-sync failed:', error);
    }
  }, 5 * 60 * 1000); // 5 minutes
}

// Check sync status
function checkTtsuSyncStatus() {
  const enabled = localStorage.getItem(TTSU_SYNC_ENABLED_KEY) === 'true';
  const folderId = localStorage.getItem(TTSU_FOLDER_ID_KEY);
  const lastSync = localStorage.getItem(TTSU_LAST_SYNC_KEY);
  
  if (!enabled || !folderId) {
    return 'Not configured';
  }
  
  if (!lastSync) {
    return 'Configured (not synced yet)';
  }
  
  const lastSyncDate = new Date(lastSync);
  const now = new Date();
  const diffMinutes = Math.floor((now - lastSyncDate) / 1000 / 60);
  
  if (diffMinutes < 1) {
    return 'Active (just synced)';
  } else if (diffMinutes < 60) {
    return `Active (synced ${diffMinutes} min ago)`;
  } else {
    return `Active (synced ${Math.floor(diffMinutes / 60)}h ago)`;
  }
}

// Export functions to window
window.initGIS = initGIS;
window.ensureDriveToken = ensureDriveToken;
window.driveApiCall = driveApiCall;
window.driveDownloadFile = driveDownloadFile;
window.findTtsuFolder = findTtsuFolder;
window.syncFromTtsuGDrive = syncFromTtsuGDrive;
window.startAutoSync = startAutoSync;
window.checkTtsuSyncStatus = checkTtsuSyncStatus;