// ttsu-sync.js - Complete Google Drive sync for ttsu reading data

const TTSU_FOLDER_ID_KEY = 'ttsu_folder_id';
const TTSU_SYNC_ENABLED_KEY = 'ttsu_sync_enabled';
const TTSU_ACCESS_TOKEN_KEY = 'ttsu_access_token';
const TTSU_TOKEN_EXPIRY_KEY = 'ttsu_token_expiry';
const TTSU_LAST_SYNC_KEY = 'ttsu_last_sync';

let googleAccessToken = null;
let tokenClient = null;
let autoSyncInterval = null;

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

async function findTtsuFolder() {
  const query = encodeURIComponent("name='ttsu' and mimeType='application/vnd.google-apps.folder' and trashed=false");
  const data = await driveApiCall(`files?q=${query}&spaces=drive&fields=files(id,name)`, googleAccessToken);
  
  if (!data.files || data.files.length === 0) {
    return null;
  }
  
  return data.files[0].id;
}

async function syncFromTtsuGDrive() {
  const folderId = localStorage.getItem(TTSU_FOLDER_ID_KEY);
  if (!folderId) throw new Error('No folder ID configured');
  
  const lastSync = localStorage.getItem(TTSU_LAST_SYNC_KEY);
  const lastSyncDate = lastSync ? new Date(lastSync) : new Date(0);
  
  const bookFoldersQuery = encodeURIComponent(`'${folderId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`);
  const bookFoldersData = await driveApiCall(`files?q=${bookFoldersQuery}&spaces=drive&fields=files(id,name)`, googleAccessToken);
  
  const bookFolders = bookFoldersData.files || [];
  let newSessionsCount = 0;
  
  const currentData = window.data || JSON.parse(localStorage.getItem('reading_heatmap_data') || '[]');
  const currentBooks = window.recentBooks || JSON.parse(localStorage.getItem('reading_heatmap_books') || '[]');
  
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

function startAutoSync() {
  if (autoSyncInterval) {
    clearInterval(autoSyncInterval);
  }
  
  autoSyncInterval = setInterval(async () => {
    const enabled = localStorage.getItem(TTSU_SYNC_ENABLED_KEY) === 'true';
    if (!enabled) return;
    
    try {
      const hasToken = await ensureDriveToken({ allowPrompt: false });
      if (!hasToken) return;
      
      await syncFromTtsuGDrive();
      console.log('Auto-sync completed');
    } catch (error) {
      console.error('Auto-sync failed:', error);
    }
  }, 5 * 60 * 1000);
}

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

// High-level functions for UI
async function setupTtsuSync() {
  try {
    let attempts = 0;
    while (!initGIS() && attempts < 20) {
      await new Promise(resolve => setTimeout(resolve, 500));
      attempts++;
    }
    if (!tokenClient) {
      throw new Error('Google Identity Services not loaded. Please refresh the page.');
    }

    const ok = await ensureDriveToken({ allowPrompt: true });
    if (!ok) {
      throw new Error('Authorization failed. Please try again.');
    }

    const folderId = await findTtsuFolder();
    if (!folderId) {
      if (window.customAlert) {
        await window.customAlert('Could not find ttsu data folder in Google Drive.\n\nMake sure ttsu has exported data first!', 'Folder Not Found');
      } else {
        alert('Could not find ttsu data folder in Google Drive.\n\nMake sure ttsu has exported data first!');
      }
      return;
    }

    localStorage.setItem(TTSU_FOLDER_ID_KEY, folderId);
    localStorage.setItem(TTSU_SYNC_ENABLED_KEY, 'true');

    await syncFromTtsuGDrive();
    startAutoSync();

    if (window.loadTtsuSyncStatus) window.loadTtsuSyncStatus();

    if (window.customAlert) {
      await window.customAlert('✅ ttsu sync enabled! It will auto-sync every 5 minutes.', 'Sync Enabled');
    } else {
      alert('✅ ttsu sync enabled! It will auto-sync every 5 minutes.');
    }
  } catch (error) {
    console.error('Setup error:', error);
    if (window.customAlert) {
      await window.customAlert('Failed to setup ttsu sync:\n\n' + (error.message || JSON.stringify(error)), 'Setup Error');
    } else {
      alert('Failed to setup ttsu sync:\n\n' + (error.message || JSON.stringify(error)));
    }
  }
}

async function manualSyncTtsu() {
  const enabled = localStorage.getItem(TTSU_SYNC_ENABLED_KEY) === 'true';
  const folderId = localStorage.getItem(TTSU_FOLDER_ID_KEY);

  if (!enabled || !folderId) {
    if (window.customAlert) {
      await window.customAlert('ttsu sync is not enabled.\n\nPlease run "Setup Sync" once to configure.', 'Sync Not Enabled');
    } else {
      alert('ttsu sync is not enabled.\n\nPlease run "Setup Sync" once to configure.');
    }
    return;
  }

  const hasToken = await ensureDriveToken({ allowPrompt: false });
  if (!hasToken) {
    if (window.customAlert) {
      await window.customAlert('Google Drive authorization has expired. Please press "Setup Sync" once to refresh authorization.', 'Authorization Expired');
    } else {
      alert('Google Drive authorization has expired. Please press "Setup Sync" once to refresh authorization.');
    }
    return;
  }

  try {
    const count = await syncFromTtsuGDrive();
    const lastSync = localStorage.getItem(TTSU_LAST_SYNC_KEY);
    const lastSyncStr = lastSync ? new Date(lastSync).toLocaleString() : 'Never';

    if (window.customAlert) {
      await window.customAlert(`✅ Sync complete!\n\nNew sessions imported: ${count || 0}\nLast sync: ${lastSyncStr}`, 'Sync Complete');
    } else {
      alert(`✅ Sync complete!\n\nNew sessions imported: ${count || 0}\nLast sync: ${lastSyncStr}`);
    }

    if (window.loadTtsuSyncStatus) window.loadTtsuSyncStatus();
  } catch (error) {
    if (window.customAlert) {
      await window.customAlert('Sync failed:\n\n' + (error.message || error), 'Sync Error');
    } else {
      alert('Sync failed:\n\n' + (error.message || error));
    }
  }
}

async function batchLoadAllTtsu() {
  const customConfirm = window.customConfirm || confirm;
  const customAlert = window.customAlert || alert;
  
  const firstConfirm = await customConfirm(
    '⚠️ BATCH LOAD ALL FROM TTSU ⚠️\n\nThis will:\n1. Load ALL reading data from ttsu Google Drive\n2. OVERWRITE your existing data\n3. This action CANNOT be undone\n\nAre you sure you want to continue?',
    'Batch Load Warning'
  );
  
  if (!firstConfirm) return;
  
  const secondConfirm = await customConfirm(
    'FINAL CONFIRMATION\n\nYour current reading data will be PERMANENTLY REPLACED with all data from ttsu.\n\nClick OK to proceed or Cancel to abort.',
    'Final Confirmation'
  );
  
  if (!secondConfirm) return;
  
  try {
    const folderId = localStorage.getItem(TTSU_FOLDER_ID_KEY);
    
    if (!folderId) {
      const hasToken = await ensureDriveToken({ allowPrompt: true });
      if (!hasToken) {
        throw new Error('Authorization failed. Please try again.');
      }
      
      const foundFolderId = await findTtsuFolder();
      if (!foundFolderId) {
        await customAlert(
          'Could not find ttsu data folder in Google Drive.\n\nMake sure ttsu has exported data first!',
          'Folder Not Found'
        );
        return;
      }
      
      localStorage.setItem(TTSU_FOLDER_ID_KEY, foundFolderId);
    } else {
      const hasToken = await ensureDriveToken({ allowPrompt: false });
      if (!hasToken) {
        await customAlert(
          'Google Drive authorization has expired. Please press "Setup Sync" once to refresh authorization.',
          'Authorization Expired'
        );
        return;
      }
    }
    
    console.log('Starting batch load of all ttsu data...');
    
    const fId = localStorage.getItem(TTSU_FOLDER_ID_KEY);
    
    const bookFoldersQuery = encodeURIComponent(`'${fId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`);
    const bookFoldersData = await driveApiCall(`files?q=${bookFoldersQuery}&spaces=drive&fields=files(id,name)&pageSize=100`, googleAccessToken);

    const bookFolders = bookFoldersData.files || [];
    console.log(`Found ${bookFolders.length} book folders`);
    
    if (bookFolders.length === 0) {
      await customAlert('No book folders found in ttsu Google Drive.', 'No Data Found');
      return;
    }
    
    const allData = [];
    let totalImported = 0;
    const bookTitles = new Set();
    
    for (const bookFolder of bookFolders) {
      try {
        console.log(`Processing folder: ${bookFolder.name}`);
        
        const statsQuery = encodeURIComponent(`'${bookFolder.id}' in parents and name contains 'statistics' and mimeType='application/json'`);
        const statsData = await driveApiCall(`files?q=${statsQuery}&spaces=drive&fields=files(id,name,modifiedTime)&orderBy=modifiedTime desc`, googleAccessToken);
        
        const files = statsData.files || [];
        
        if (files.length === 0) {
          console.log(`No statistics file in ${bookFolder.name}`);
          continue;
        }
        
        const file = files[0];
        console.log(`Processing ${file.name}...`);
        
        const fileContent = await driveDownloadFile(file.id, googleAccessToken);
        const ttsuData = JSON.parse(fileContent);
        
        if (!Array.isArray(ttsuData)) continue;
        
        ttsuData.forEach(session => {
          if (!session.dateKey || (session.charactersRead === 0 && session.readingTime === 0)) {
            return;
          }
          
          const date = session.dateKey;
          const minutes = Math.round(session.readingTime / 60);
          const characters = session.charactersRead || 0;
          
          if (minutes === 0 && characters === 0) return;
          
          allData.push({
            date: date,
            minutes: minutes,
            characters: characters,
            title: session.title || bookFolder.name || 'Reading'
          });
          totalImported++;
          bookTitles.add(session.title || bookFolder.name);
        });
        
      } catch (fileError) {
        console.error('Error processing folder:', bookFolder.name, fileError);
      }
    }
    
    if (totalImported === 0) {
      await customAlert('No reading data found in ttsu Google Drive.', 'No Data Found');
      return;
    }
    
    localStorage.setItem('reading_heatmap_data', JSON.stringify(allData));
    
    const updatedBooks = Array.from(bookTitles).slice(0, 10);
    localStorage.setItem('reading_heatmap_books', JSON.stringify(updatedBooks));
    
    localStorage.setItem(TTSU_LAST_SYNC_KEY, new Date().toISOString());
    
    window.data = allData;
    window.recentBooks = updatedBooks;
    
    if (window.aggregateData) window.aggregateData();
    if (window.loadYear) window.loadYear();
    if (window.saveCloudState) await window.saveCloudState();
    
    console.log(`✅ Batch loaded ${totalImported} sessions from ttsu`);
    
    const bookList = Array.from(bookTitles).slice(0, 10).join(', ');
    const moreBooks = bookTitles.size > 10 ? `\n...and ${bookTitles.size - 10} more books` : '';
    
    await customAlert(
      `✅ Batch Load Complete!\n\nImported: ${totalImported} reading sessions\nBooks: ${bookList}${moreBooks}\n\nYour data has been overwritten with ttsu data.`,
      'Success'
    );
    
    if (window.loadTtsuSyncStatus) window.loadTtsuSyncStatus();
    
  } catch (error) {
    console.error('Batch load error:', error);
    await customAlert(
      'Failed to batch load from ttsu:\n\n' + (error.message || error),
      'Error'
    );
  }
}

async function disableTtsuSync() {
  const customConfirm = window.customConfirm || confirm;
  const customAlert = window.customAlert || alert;
  
  const enabled = localStorage.getItem(TTSU_SYNC_ENABLED_KEY) === 'true';
  
  if (!enabled) {
    await customAlert('ttsu sync is already disabled.', 'Already Disabled');
    return;
  }
  
  const confirmed = await customConfirm(
    'Disable automatic ttsu sync from Google Drive?\n\nYou can re-enable it anytime.',
    'Disable Sync'
  );
  
  if (!confirmed) return;
  
  localStorage.removeItem(TTSU_SYNC_ENABLED_KEY);
  localStorage.removeItem(TTSU_FOLDER_ID_KEY);
  localStorage.removeItem(TTSU_ACCESS_TOKEN_KEY);
  localStorage.removeItem(TTSU_TOKEN_EXPIRY_KEY);
  
  if (autoSyncInterval) {
    clearInterval(autoSyncInterval);
    autoSyncInterval = null;
  }
  
  await customAlert('ttsu sync has been disabled.', 'Sync Disabled');
  if (window.loadTtsuSyncStatus) window.loadTtsuSyncStatus();
}

// Export to window
window.initGIS = initGIS;
window.ensureDriveToken = ensureDriveToken;
window.driveApiCall = driveApiCall;
window.driveDownloadFile = driveDownloadFile;
window.findTtsuFolder = findTtsuFolder;
window.syncFromTtsuGDrive = syncFromTtsuGDrive;
window.startAutoSync = startAutoSync;
window.checkTtsuSyncStatus = checkTtsuSyncStatus;
window.setupTtsuSync = setupTtsuSync;
window.manualSyncTtsu = manualSyncTtsu;
window.batchLoadAllTtsu = batchLoadAllTtsu;
window.disableTtsuSync = disableTtsuSync;