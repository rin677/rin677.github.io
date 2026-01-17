const TTSU_FOLDER_ID_KEY = 'ttsu_folder_id';
const TTSU_SYNC_ENABLED_KEY = 'ttsu_sync_enabled';
const TTSU_ACCESS_TOKEN_KEY = 'ttsu_access_token';
const TTSU_TOKEN_EXPIRY_KEY = 'ttsu_token_expiry';
const TTSU_LAST_SYNC_KEY = 'ttsu_last_sync';

let googleAccessToken = null;
let tokenClient = null;
let ttsuSyncInterval = null;

// --- FIXED: Initialize Google Identity Services safely ---
function initGIS() {
  // Already initialized
  if (tokenClient) {
    return true;
  }

  // GIS script not ready yet
  if (typeof google === 'undefined' || !google.accounts || !google.accounts.oauth2) {
    console.log('Google Identity Services not loaded yet');
    return false;
  }

  try {
    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: '510422773254-e8a8reeuce9jtn7dgjqq8c7kmeopikdr.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/drive.metadata.readonly',
      // IMPORTANT: callback is set per request in ensureDriveToken()
      callback: () => {}
    });
    console.log('GIS initialized');
    return true;
  } catch (err) {
    console.error('Failed to init GIS:', err);
    tokenClient = null;
    return false;
  }
}

// Direct REST API calls (no gapi.client needed)
async function driveApiCall(endpoint, accessToken) {
  const response = await fetch(`https://www.googleapis.com/drive/v3/${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error(`Drive API error: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

async function driveDownloadFile(fileId, accessToken) {
  const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    throw new Error(`Download error: ${response.status}`);
  }

  return await response.text();
}

// --- FIXED: ensureDriveToken never pops UI unless explicitly allowed (setup only) ---
async function ensureDriveToken(options = { allowPrompt: false }) {
  // Make sure GIS is ready before touching tokenClient
  if (!tokenClient) {
    const ok = initGIS();
    if (!ok) {
      console.log('GIS not ready, cannot obtain token');
      return false;
    }
  }

  const customAlert = window.customAlert || (msg => { console.log(msg); });

  // Check if we have a stored valid token
  const storedToken = localStorage.getItem(TTSU_ACCESS_TOKEN_KEY);
  const storedExpiry = localStorage.getItem(TTSU_TOKEN_EXPIRY_KEY);

  if (storedToken && storedExpiry) {
    const expiryTime = parseInt(storedExpiry, 10);
    const now = Date.now();

    // If token is still valid (5 min buffer), reuse it
    if (expiryTime > now + (5 * 60 * 1000)) {
      googleAccessToken = storedToken;
      console.log('Using stored valid token for ttsu sync');
      return true;
    }
  }

  // Token expired or missing: try SILENT refresh first
  if (!tokenClient) {
    console.log('tokenClient missing; cannot request token');
    return false;
  }

  try {
    await new Promise((resolve, reject) => {
      tokenClient.callback = (resp) => {
        if (resp && !resp.error && resp.access_token) {
          googleAccessToken = resp.access_token;

          const expiresIn = resp.expires_in || 3600;
          const expiryTime = Date.now() + (expiresIn * 1000);

          localStorage.setItem(TTSU_ACCESS_TOKEN_KEY, resp.access_token);
          localStorage.setItem(TTSU_TOKEN_EXPIRY_KEY, expiryTime.toString());

          console.log('Silent token refresh OK');
          resolve();
        } else {
          reject(resp?.error || new Error('silent_token_failed'));
        }
      };
      // SILENT: prompt: '' never shows UI
      tokenClient.requestAccessToken({ prompt: '' });
    });
    return true;
  } catch (silentErr) {
    console.log('Silent Drive token refresh failed:', silentErr);

    // No UI allowed → just fail gracefully
    if (!options.allowPrompt) {
      localStorage.removeItem(TTSU_ACCESS_TOKEN_KEY);
      localStorage.removeItem(TTSU_TOKEN_EXPIRY_KEY);
      return false;
    }

    // Setup path: one-time interactive consent
    try {
      await new Promise((resolve, reject) => {
        tokenClient.callback = (resp) => {
          if (resp && !resp.error && resp.access_token) {
            googleAccessToken = resp.access_token;

            const expiresIn = resp.expires_in || 3600;
            const expiryTime = Date.now() + (expiresIn * 1000);

            localStorage.setItem(TTSU_ACCESS_TOKEN_KEY, resp.access_token);
            localStorage.setItem(TTSU_TOKEN_EXPIRY_KEY, expiryTime.toString());

            console.log('Interactive Drive token obtained');
            resolve();
          } else {
            reject(resp?.error || new Error('prompt_token_failed'));
          }
        };
        // INTERACTIVE: prompt: 'consent' → ONLY used in setup
        tokenClient.requestAccessToken({ prompt: 'consent' });
      });
      return true;
    } catch (promptErr) {
      console.log('Interactive Drive token request failed:', promptErr);
      localStorage.removeItem(TTSU_ACCESS_TOKEN_KEY);
      localStorage.removeItem(TTSU_TOKEN_EXPIRY_KEY);

      // Optional: in-page warning instead of popup
      await customAlert(
        'Google Drive authorization for ttsu sync failed or was cancelled.\n\n' +
        'You can run "Setup ttsu Auto-Sync" again later if needed.',
        'Drive Authorization'
      );

      return false;
    }
  }
}


async function findTtsuFolder() {
  try {
    console.log('Searching for ttu-reader-data folder...');
    
    // Simple search without complex query
    const data = await driveApiCall(`files?q=name='ttu-reader-data'&fields=files(id,name)&spaces=drive`, googleAccessToken);
    
    console.log('Search results:', data);
    
    if (data.files && data.files.length > 0) {
      console.log('Found folder:', data.files[0].name, 'ID:', data.files[0].id);
      return data.files[0].id;
    }
    
    // If not found, list all folders to debug
    console.log('Not found. Listing all folders...');
    const allFolders = await driveApiCall(`files?q=mimeType='application/vnd.google-apps.folder'&fields=files(id,name)&spaces=drive&pageSize=100`, googleAccessToken);
    
    console.log('All folders:', allFolders.files);
    
    return null;
  } catch (error) {
    console.error('Error finding ttsu folder:', error);
    return null;
  }
}

async function syncFromTtsuGDrive() {
  try {
    const folderId = localStorage.getItem(TTSU_FOLDER_ID_KEY);
    if (!folderId) {
      throw new Error('ttsu folder not configured. Please run setup first.');
    }
    
    if (!googleAccessToken) {
      throw new Error('Not authenticated. Please run setup first.');
    }
    
    console.log('Fetching book folders from ttu-reader-data...');
    
    // First, get all book folders inside ttu-reader-data
    const bookFoldersQuery = encodeURIComponent(`'${folderId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`);
    const bookFoldersData = await driveApiCall(`files?q=${bookFoldersQuery}&spaces=drive&fields=files(id,name)&pageSize=100`, googleAccessToken);

    const bookFolders = bookFoldersData.files || [];
    console.log(`Found ${bookFolders.length} book folders`);
    
    if (bookFolders.length === 0) {
      console.log('No book folders found');
      return 0;
    }
    
    let totalImported = 0;
    const bookTitles = new Set();
    
// For each book folder, get the statistics file from its "statistics" subfolder
for (const bookFolder of bookFolders) {
  try {
    console.log(`Checking folder: ${bookFolder.name}`);
    
    // 1) Find the "statistics" subfolder inside this book folder
    const statsFolderQuery = encodeURIComponent(
      `'${bookFolder.id}' in parents and mimeType='application/vnd.google-apps.folder' and name='statistics' and trashed=false`
    );
    const statsFolderData = await driveApiCall(
      `files?q=${statsFolderQuery}&spaces=drive&fields=files(id,name)&pageSize=10`,
      googleAccessToken
    );
    
    const statsFolders = statsFolderData.files || [];
    if (statsFolders.length === 0) {
      console.log(`No "statistics" subfolder in ${bookFolder.name}`);
      continue;
    }
    
    // If multiple, just take the first
    const statsFolder = statsFolders[0];
    console.log(`Found statistics subfolder for ${bookFolder.name}: ${statsFolder.id}`);
    
    // 2) Find statistics JSON file inside the "statistics" subfolder
    const statsQuery = encodeURIComponent(
      `'${statsFolder.id}' in parents and mimeType='application/json' and trashed=false`
    );
    const statsData = await driveApiCall(
      `files?q=${statsQuery}&spaces=drive&fields=files(id,name,modifiedTime)&orderBy=modifiedTime desc`,
      googleAccessToken
    );
    
    const files = statsData.files || [];
    
    if (files.length === 0) {
      console.log(`No statistics JSON file in statistics subfolder of ${bookFolder.name}`);
      continue;
    }
    
    // Latest statistics JSON
    const file = files[0];
    console.log(`Processing ${file.name} for ${bookFolder.name}...`);
    
    // Download file content
    const fileContent = await driveDownloadFile(file.id, googleAccessToken);
    const ttsuData = JSON.parse(fileContent);
    
    if (!Array.isArray(ttsuData)) {
      console.log(`Statistics file for ${bookFolder.name} is not an array, skipping`);
      continue;
    }
    
    // Transform and import data
    ttsuData.forEach(session => {
      if (!session.dateKey || (session.charactersRead === 0 && session.readingTime === 0)) {
        return;
      }
      
      const date = session.dateKey;
      const minutes = Math.round(session.readingTime / 60);
      const characters = session.charactersRead || 0;
      
      if (minutes === 0 && characters === 0) return;
      
      // Check if exists
      const exists = window.data.some(entry => 
        entry.date === date && 
        entry.title === session.title &&
        Math.abs(entry.minutes - minutes) < 2 &&
        Math.abs(entry.characters - characters) < 100
      );
      
      if (!exists) {
        window.data.push({
          date: date,
          minutes: minutes,
          characters: characters,
          title: session.title || bookFolder.name || 'Reading'
        });
        totalImported++;
        bookTitles.add(session.title || bookFolder.name);
      }
    });
    
  } catch (fileError) {
    console.error('Error processing folder:', bookFolder.name, fileError);
  }
}

    
    if (totalImported > 0) {
      // Ask user before importing
      const bookList = Array.from(bookTitles).join(', ');
      
      const customConfirm = window.customConfirm || confirm;
      const confirmed = await customConfirm(
        `Found ${totalImported} new reading session(s) from ttsu.\n\n` +
        `Books: ${bookList}\n\n` +
        `Import these sessions?`,
        'Import ttsu Data'
      );
      
      if (!confirmed) {
        console.log('User cancelled ttsu import');
        return 0;
      }
      
// Update recent books
if (!window.recentBooks) {
  window.recentBooks = [];
}
bookTitles.forEach(title => {
  if (title && !window.recentBooks.includes(title)) {
    window.recentBooks.unshift(title);
  }
});
      window.recentBooks = window.recentBooks.slice(0, 10);
      
      if (typeof recentBooks !== 'undefined') {
        recentBooks = window.recentBooks;
      }
      
      if (typeof data !== 'undefined') {
        data = window.data;
      }
      
      // Save to localStorage
      localStorage.setItem('reading_heatmap_data', JSON.stringify(window.data));
      localStorage.setItem('reading_heatmap_books', JSON.stringify(window.recentBooks));
      
      if (window.aggregateData) window.aggregateData();
      if (window.loadYear) window.loadYear();
      if (window.renderGoals) window.renderGoals();
      
      if (window.saveCloudState) {
        await window.saveCloudState();
      }
      
    console.log(`✅ Synced ${totalImported} new sessions from ttsu`);
  }
  
  // Do NOT touch TTSU_LAST_SYNC_KEY here; only setupTtsuSync should update it
  return totalImported;
  
} catch (error) {
  console.error('Sync error:', error);
  throw error;
}


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

    // Explicit consent only during setup
    const ok = await ensureDriveToken({ allowPrompt: true });
    if (!ok) {
      throw new Error('Authorization failed. Please try again.');
    }

    const folderId = await findTtsuFolder();
    if (!folderId) {
      const customAlert = window.customAlert || alert;
      await customAlert('Could not find ttsu data folder in Google Drive.\n\nMake sure ttsu has exported data first!', 'Folder Not Found');
      return;
    }

localStorage.setItem(TTSU_FOLDER_ID_KEY, folderId);
localStorage.setItem(TTSU_SYNC_ENABLED_KEY, 'true');

// Run an initial sync right after setup
await syncFromTtsuGDrive();

// Only here: record the "last sync" time used for the 1‑hour cap
localStorage.setItem(TTSU_LAST_SYNC_KEY, new Date().toISOString());

startAutoSync();

if (window.loadTtsuSyncStatus) {
  window.loadTtsuSyncStatus();
}


    const customAlert = window.customAlert || alert;
    await customAlert('✅ ttsu sync enabled! It will auto-sync every 5 minutes.', 'Sync Enabled');
    
    if (window.closeTtsuSyncModal) {
      window.closeTtsuSyncModal();
    }
  } catch (error) {
    console.error('Setup error:', error);
    const customAlert = window.customAlert || alert;
    await customAlert('Failed to setup ttsu sync:\n\n' + (error.message || JSON.stringify(error)), 'Setup Error');
  }
}

async function manualSyncTtsu() {
  const enabled = localStorage.getItem(TTSU_SYNC_ENABLED_KEY) === 'true';
  const folderId = localStorage.getItem(TTSU_FOLDER_ID_KEY);

  if (!enabled || !folderId) {
    const customAlert = window.customAlert || alert;
    await customAlert('ttsu sync is not enabled.\n\nPlease run "Setup ttsu Auto-Sync" once to configure.', 'Sync Not Enabled');
    return;
  }

  // Never prompt here; try silent token only
  const hasToken = await ensureDriveToken({ allowPrompt: false });
  if (!hasToken) {
    const customAlert = window.customAlert || alert;
    await customAlert('Google Drive authorization has expired. Please press "Setup ttsu Auto-Sync" once to refresh authorization.', 'Authorization Expired');
    return;
  }

  try {
    const count = await syncFromTtsuGDrive();
    const lastSync = localStorage.getItem(TTSU_LAST_SYNC_KEY);
    const lastSyncStr = lastSync ? new Date(lastSync).toLocaleString() : 'Never';

    const customAlert = window.customAlert || alert;
    await customAlert(`✅ Sync complete!\n\nNew sessions imported: ${count || 0}\nLast sync: ${lastSyncStr}`, 'Sync Complete');

    if (window.loadTtsuSyncStatus) {
      window.loadTtsuSyncStatus();
    }
  } catch (error) {
    const customAlert = window.customAlert || alert;
    await customAlert('Sync failed:\n\n' + (error.message || error), 'Sync Error');
  }
}

async function batchLoadAllTtsu() {
  const customConfirm = window.customConfirm || confirm;
  const customAlert = window.customAlert || alert;
  
  // First confirmation
  const firstConfirm = await customConfirm(
    '⚠️ BATCH LOAD ALL FROM TTSU ⚠️\n\nThis will:\n1. Load ALL reading data from ttsu Google Drive\n2. OVERWRITE your existing data\n3. This action CANNOT be undone\n\nAre you sure you want to continue?',
    'Batch Load Warning'
  );
  
  if (!firstConfirm) return;
  
  // Second confirmation
  const secondConfirm = await customConfirm(
    'FINAL CONFIRMATION\n\nYour current reading data will be PERMANENTLY REPLACED with all data from ttsu.\n\nClick OK to proceed or Cancel to abort.',
    'Final Confirmation'
  );
  
  if (!secondConfirm) return;
  
  try {
    const folderId = localStorage.getItem(TTSU_FOLDER_ID_KEY);
    
    if (!folderId) {
      // Try to find folder if not configured
      const hasToken = await ensureDriveToken({ allowPrompt: true });
      if (!hasToken) {
        throw new Error('Authorization failed. Please try again.');
      }
      
      const foundFolderId = await findTtsuFolder();
      if (!foundFolderId) {
        await customAlert('Could not find ttsu data folder in Google Drive.\n\nMake sure ttsu has exported data first!', 'Folder Not Found');
        return;
      }
      
      localStorage.setItem(TTSU_FOLDER_ID_KEY, foundFolderId);
    } else {
      // Ensure we have a valid token
      const hasToken = await ensureDriveToken({ allowPrompt: false });
      if (!hasToken) {
        await customAlert('Google Drive authorization has expired. Please press "Setup ttsu Auto-Sync" once to refresh authorization.', 'Authorization Expired');
        return;
      }
    }
    
    console.log('Starting batch load of all ttsu data...');
    
    const fId = localStorage.getItem(TTSU_FOLDER_ID_KEY);
    
    // Get all book folders inside ttu-reader-data
    const bookFoldersQuery = encodeURIComponent(`'${fId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`);
    const bookFoldersData = await driveApiCall(`files?q=${bookFoldersQuery}&spaces=drive&fields=files(id,name)&pageSize=100`, googleAccessToken);

    const bookFolders = bookFoldersData.files || [];
    console.log(`Found ${bookFolders.length} book folders`);
    
    if (bookFolders.length === 0) {
      await customAlert('No book folders found in ttsu Google Drive.', 'No Data Found');
      return;
    }
    
    // Clear existing data
    window.data = [];
    if (typeof data !== 'undefined') {
      data = [];
    }
    
    let totalImported = 0;
    const bookTitles = new Set();
    
// For each book folder, get the statistics file from its "statistics" subfolder
for (const bookFolder of bookFolders) {
  try {
    console.log(`Processing folder: ${bookFolder.name}`);
    
    // 1) Find the "statistics" subfolder inside this book folder
    const statsFolderQuery = encodeURIComponent(
      `'${bookFolder.id}' in parents and mimeType='application/vnd.google-apps.folder' and name='statistics' and trashed=false`
    );
    const statsFolderData = await driveApiCall(
      `files?q=${statsFolderQuery}&spaces=drive&fields=files(id,name)&pageSize=10`,
      googleAccessToken
    );
    
    const statsFolders = statsFolderData.files || [];
    if (statsFolders.length === 0) {
      console.log(`No "statistics" subfolder in ${bookFolder.name}`);
      continue;
    }
    
    const statsFolder = statsFolders[0];
    console.log(`Found statistics subfolder for ${bookFolder.name}: ${statsFolder.id}`);
    
    // 2) Find statistics JSON file inside the "statistics" subfolder
    const statsQuery = encodeURIComponent(
      `'${statsFolder.id}' in parents and mimeType='application/json' and trashed=false`
    );
    const statsData = await driveApiCall(
      `files?q=${statsQuery}&spaces=drive&fields=files(id,name,modifiedTime)&orderBy=modifiedTime desc`,
      googleAccessToken
    );
    
    const files = statsData.files || [];
    
    if (files.length === 0) {
      console.log(`No statistics JSON file in statistics subfolder of ${bookFolder.name}`);
      continue;
    }
    
    const file = files[0];
    console.log(`Processing ${file.name} for ${bookFolder.name}...`);
    
    // Download file content
    const fileContent = await driveDownloadFile(file.id, googleAccessToken);
    const ttsuData = JSON.parse(fileContent);
    
    if (!Array.isArray(ttsuData)) {
      console.log(`Statistics file for ${bookFolder.name} is not an array, skipping`);
      continue;
    }
    
    // Transform and import ALL data (no duplicate checking since we're overwriting)
    ttsuData.forEach(session => {
      if (!session.dateKey || (session.charactersRead === 0 && session.readingTime === 0)) {
        return;
      }
      
      const date = session.dateKey;
      const minutes = Math.round(session.readingTime / 60);
      const characters = session.charactersRead || 0;
      
      if (minutes === 0 && characters === 0) return;
      
      window.data.push({
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
    
  // Update recent books
if (!window.recentBooks) {
  window.recentBooks = [];
}
bookTitles.forEach(title => {
  if (title && !window.recentBooks.includes(title)) {
    window.recentBooks.unshift(title);
  }
});
window.recentBooks = window.recentBooks.slice(0, 10);
    
    if (typeof recentBooks !== 'undefined') {
      recentBooks = window.recentBooks;
    }
    
    if (typeof data !== 'undefined') {
      data = window.data;
    }
    
    // Save to localStorage
    localStorage.setItem('reading_heatmap_data', JSON.stringify(window.data));
    localStorage.setItem('reading_heatmap_books', JSON.stringify(window.recentBooks));
    
    if (window.aggregateData) window.aggregateData();
    if (window.loadYear) window.loadYear();
    if (window.renderGoals) window.renderGoals();
    
    if (window.saveCloudState) {
      await window.saveCloudState();
    }
    
    console.log(`✅ Batch loaded ${totalImported} sessions from ttsu`);
    
    const bookList = Array.from(bookTitles).slice(0, 10).join(', ');
    const moreBooks = bookTitles.size > 10 ? `\n...and ${bookTitles.size - 10} more books` : '';
    
    await customAlert(
      `✅ Batch Load Complete!\n\n` +
      `Imported: ${totalImported} reading sessions\n` +
      `Books: ${bookList}${moreBooks}\n\n` +
      `Your data has been overwritten with ttsu data.`,
      'Success'
    );
    
    if (window.loadTtsuSyncStatus) {
      window.loadTtsuSyncStatus();
    }
    
    if (window.closeTtsuSyncModal) {
      window.closeTtsuSyncModal();
    }
    
  } catch (error) {
    console.error('Batch load error:', error);
    await customAlert('Failed to batch load from ttsu:\n\n' + (error.message || error), 'Error');
  }
}

function startAutoSync() {
  if (ttsuSyncInterval) {
    clearInterval(ttsuSyncInterval);
  }
  
  ttsuSyncInterval = setInterval(async () => {
    try {
      const enabled = localStorage.getItem(TTSU_SYNC_ENABLED_KEY) === 'true';
      if (enabled) {
        console.log('Auto-syncing from ttsu...');
        await syncFromTtsuGDrive();
      }
    } catch (error) {
      console.error('Auto-sync error:', error);
    }
  }, 5 * 60 * 1000); // 5 minutes
}

function disableTtsuSync() {
  const customConfirm = window.customConfirm || confirm;
  const customAlert = window.customAlert || alert;
  
  const confirmed = customConfirm('Disable automatic ttsu sync from Google Drive?\n\nYou can re-enable it anytime.', 'Disable Sync');
  
  if (!confirmed) return;
  
  if (ttsuSyncInterval) {
    clearInterval(ttsuSyncInterval);
    ttsuSyncInterval = null;
  }
  
  localStorage.removeItem(TTSU_SYNC_ENABLED_KEY);
  localStorage.removeItem(TTSU_FOLDER_ID_KEY);
  localStorage.removeItem(TTSU_ACCESS_TOKEN_KEY);
  localStorage.removeItem(TTSU_TOKEN_EXPIRY_KEY);
  googleAccessToken = null;
  
  customAlert('ttsu sync has been disabled.', 'Sync Disabled');
  
  if (window.loadTtsuSyncStatus) {
    window.loadTtsuSyncStatus();
  }
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

setTimeout(async () => {
  // Only initialize auto-sync logic on the settings page
  const path = (window.location && window.location.pathname) || '';
  const onSettingsPage =
    path.endsWith('/settings.html') ||
    path.endsWith('settings.html') ||
    path === '/settings';

  if (!onSettingsPage) {
    return; // do nothing on index.html or any other page
  }

  initGIS();

  const enabled = localStorage.getItem(TTSU_SYNC_ENABLED_KEY) === 'true';
  const folderId = localStorage.getItem(TTSU_FOLDER_ID_KEY);

  if (enabled && folderId) {
    // Silent only: this will NEVER show a popup
    await ensureDriveToken({ allowPrompt: false });
    startAutoSync();

    if (window.loadTtsuSyncStatus) {
      window.loadTtsuSyncStatus();
    }

    console.log('ttsu auto-sync initialized on settings page');
  }
}, 1000);


// Export functions to window
window.initGIS = initGIS;
window.ensureDriveToken = ensureDriveToken;
window.driveApiCall = driveApiCall;
window.driveDownloadFile = driveDownloadFile;
window.findTtsuFolder = findTtsuFolder;
window.syncFromTtsuGDrive = syncFromTtsuGDrive;
window.setupTtsuSync = setupTtsuSync;
window.manualSyncTtsu = manualSyncTtsu;
window.batchLoadAllTtsu = batchLoadAllTtsu;
window.disableTtsuSync = disableTtsuSync;
window.checkTtsuSyncStatus = checkTtsuSyncStatus;
window.startAutoSync = startAutoSync;