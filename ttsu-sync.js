const TTSU_FOLDER_ID_KEY = 'ttsu_folder_id';
const TTSU_SYNC_ENABLED_KEY = 'ttsu_sync_enabled';
const TTSU_ACCESS_TOKEN_KEY = 'ttsu_access_token';
const TTSU_TOKEN_EXPIRY_KEY = 'ttsu_token_expiry';
const TTSU_LAST_SYNC_KEY = 'ttsu_last_sync';

let googleAccessToken = null;
let tokenClient = null;
let ttsuSyncInterval = null;

// --- Initialize Google Identity Services safely ---
function initGIS() {
  if (tokenClient) return true;

  if (typeof google === 'undefined' || !google.accounts || !google.accounts.oauth2) {
    console.log('Google Identity Services not loaded yet');
    return false;
  }

  try {
    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: '510422773254-e8a8reeuce9jtn7dgjqq8c7kmeopikdr.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/drive.metadata.readonly',
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

// Direct REST API calls
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
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });

  if (!response.ok) {
    throw new Error(`Download error: ${response.status}`);
  }

  return await response.text();
}

// --- Token management ---
async function ensureDriveToken(options = { allowPrompt: false }) {
  if (!tokenClient) {
    const ok = initGIS();
    if (!ok) {
      console.log('GIS not ready, cannot obtain token');
      return false;
    }
  }

  const customAlert = window.customAlert || (msg => { console.log(msg); });

  const storedToken = localStorage.getItem(TTSU_ACCESS_TOKEN_KEY);
  const storedExpiry = localStorage.getItem(TTSU_TOKEN_EXPIRY_KEY);

  if (storedToken && storedExpiry) {
    const expiryTime = parseInt(storedExpiry, 10);
    if (expiryTime > Date.now() + (5 * 60 * 1000)) {
      googleAccessToken = storedToken;
      console.log('Using stored valid token');
      return true;
    }
  }

  if (!tokenClient) {
    console.log('tokenClient missing; cannot request token');
    return false;
  }

  const saveToken = (resp) => {
    googleAccessToken = resp.access_token;
    const expiryTime = Date.now() + ((resp.expires_in || 3600) * 1000);
    localStorage.setItem(TTSU_ACCESS_TOKEN_KEY, resp.access_token);
    localStorage.setItem(TTSU_TOKEN_EXPIRY_KEY, expiryTime.toString());
  };

  // Try silent refresh first
  try {
    await new Promise((resolve, reject) => {
      tokenClient.callback = (resp) => {
        if (resp && !resp.error && resp.access_token) {
          saveToken(resp);
          console.log('Silent token refresh OK');
          resolve();
        } else {
          reject(resp?.error || new Error('silent_token_failed'));
        }
      };
      tokenClient.requestAccessToken({ prompt: '' });
    });
    return true;
  } catch (silentErr) {
    console.log('Silent Drive token refresh failed:', silentErr);

    if (!options.allowPrompt) {
      localStorage.removeItem(TTSU_ACCESS_TOKEN_KEY);
      localStorage.removeItem(TTSU_TOKEN_EXPIRY_KEY);
      return false;
    }

    // Interactive consent (setup path only)
    try {
      await new Promise((resolve, reject) => {
        tokenClient.callback = (resp) => {
          if (resp && !resp.error && resp.access_token) {
            saveToken(resp);
            console.log('Interactive Drive token obtained');
            resolve();
          } else {
            reject(resp?.error || new Error('prompt_token_failed'));
          }
        };
        tokenClient.requestAccessToken({ prompt: 'consent' });
      });
      return true;
    } catch (promptErr) {
      console.log('Interactive Drive token request failed:', promptErr);
      localStorage.removeItem(TTSU_ACCESS_TOKEN_KEY);
      localStorage.removeItem(TTSU_TOKEN_EXPIRY_KEY);
      await customAlert(
        'Google Drive authorization for ttsu sync failed or was cancelled.\n\n' +
        'You can run "Setup ttsu Auto-Sync" again later if needed.',
        'Drive Authorization'
      );
      return false;
    }
  }
}


// --- UNIVERSAL folder finder: searches by name only, no hardcoded patterns ---
async function findTtsuFolder() {
  try {
    console.log('Searching for ttu-reader-data folder...');

    // Search for folder by name across all of Drive (works for any account, including Shared Drives)
    const data = await driveApiCall(
      `files?q=${encodeURIComponent("name='ttu-reader-data' and mimeType='application/vnd.google-apps.folder' and trashed=false")}&fields=files(id,name)&spaces=drive&corpora=allDrives&pageSize=10&supportsAllDrives=true&includeItemsFromAllDrives=true`,
      googleAccessToken
    );

    console.log('Search results:', data);

    if (data.files && data.files.length > 0) {
      console.log('Found folder:', data.files[0].name, 'ID:', data.files[0].id);
      return data.files[0].id;
    }

    console.warn('ttu-reader-data folder not found in Drive.');
    return null;
  } catch (error) {
    console.error('Error finding ttsu folder:', error);
    return null;
  }
}


// --- UNIVERSAL book folder loader: paginates ALL direct children, no hardcoded names ---
async function getBookFolders(folderId) {
  const allFolders = [];
  const seenIds = new Set();

  console.log(`Fetching all book folders from parent: ${folderId}`);

  let pageToken = null;
  let pageNum = 0;

  do {
    pageNum++;
    const query = encodeURIComponent(
      `'${folderId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`
    );
    let url = `files?q=${query}&spaces=drive&corpora=allDrives&fields=nextPageToken,files(id,name,mimeType)&pageSize=1000&supportsAllDrives=true&includeItemsFromAllDrives=true`;
    if (pageToken) url += `&pageToken=${encodeURIComponent(pageToken)}`;

    const data = await driveApiCall(url, googleAccessToken);

    if (data.files) {
      for (const file of data.files) {
        if (!seenIds.has(file.id)) {
          seenIds.add(file.id);
          allFolders.push(file);
        }
      }
      console.log(`  Page ${pageNum}: ${data.files.length} folders (running total: ${allFolders.length})`);
    }

    pageToken = data.nextPageToken || null;
  } while (pageToken);

  console.log(`Total unique book folders found: ${allFolders.length}`);
  allFolders.forEach(f => console.log(`  - ${f.name} (${f.id})`));

  return allFolders;
}


// --- Process a book folder's statistics file into session entries ---
async function extractSessionsFromFolder(bookFolder) {
  const statsQuery = encodeURIComponent(
    `'${bookFolder.id}' in parents and name contains 'statistics_' and trashed=false`
  );
  const statsData = await driveApiCall(
    `files?q=${statsQuery}&spaces=drive&corpora=allDrives&fields=files(id,name,modifiedTime)&orderBy=modifiedTime desc&pageSize=10&supportsAllDrives=true&includeItemsFromAllDrives=true`,
    googleAccessToken
  );

  const files = statsData.files || [];
  if (files.length === 0) {
    console.log(`  ⚠️ No statistics file in "${bookFolder.name}"`);
    return [];
  }

  const file = files[0];
  console.log(`  Using: ${file.name}`);

  const fileContent = await driveDownloadFile(file.id, googleAccessToken);
  const ttsuData = JSON.parse(fileContent);

  if (!Array.isArray(ttsuData)) {
    console.log(`  ⚠️ Statistics file is not an array, skipping`);
    return [];
  }

  const sessions = [];

  for (const session of ttsuData) {
    if (!session.dateKey) continue;
    const minutes = Math.round((session.readingTime || 0) / 60);
    const characters = session.charactersRead || 0;
    if (minutes === 0 && characters === 0) continue;

    sessions.push({
      date: session.dateKey,
      minutes,
      characters,
      title: session.title || bookFolder.name || 'Reading'
    });
  }

  return sessions;
}

async function syncFromTtsuGDrive() {
  try {
    const folderId = localStorage.getItem(TTSU_FOLDER_ID_KEY);
    if (!folderId) throw new Error('ttsu folder not configured. Please run setup first.');
    if (!googleAccessToken) throw new Error('Not authenticated. Please run setup first.');

    if (!Array.isArray(window.data)) {
      try { window.data = JSON.parse(localStorage.getItem('reading_heatmap_data')) || []; }
      catch (e) { window.data = []; }
    }
    if (!Array.isArray(window.recentBooks)) {
      try { window.recentBooks = JSON.parse(localStorage.getItem('reading_heatmap_books')) || []; }
      catch (e) { window.recentBooks = []; }
    }

    console.log('=== STARTING TTSU SYNC ===');

    let allFolders = [];
    try {
      allFolders = await getBookFolders(folderId);
    } catch (folderErr) {
      console.warn('getBookFolders failed (possibly stale folder ID), attempting re-discovery...', folderErr);
      localStorage.removeItem(TTSU_FOLDER_ID_KEY);

      const newFolderId = await findTtsuFolder();
      if (!newFolderId) {
        throw new Error('Could not find "ttu-reader-data" folder in Google Drive. Make sure ttsu has synced data.');
      }
      localStorage.setItem(TTSU_FOLDER_ID_KEY, newFolderId);
      allFolders = await getBookFolders(newFolderId);
    }

    if (allFolders.length === 0) {
      const customAlert = window.customAlert || alert;
      await customAlert(
        'No book folders found in ttsu Google Drive.\n\nMake sure ttsu has synced data to Drive.',
        'No Folders Found'
      );
      return 0;
    }

    const sessionsToAdd = [];
const bookTitles = new Set();

for (const bookFolder of allFolders) {
  try {
    console.log(`\n📚 Processing: ${bookFolder.name}`);
    const sessions = await extractSessionsFromFolder(bookFolder);

    for (const entry of sessions) {
      const existingIndex = window.data.findIndex(
        e => e.date === entry.date && e.title === entry.title
      );

      if (existingIndex === -1) {
        sessionsToAdd.push(entry);
        bookTitles.add(entry.title);
      } else {
        const existing = window.data[existingIndex];
        if (existing.minutes !== entry.minutes || existing.characters !== entry.characters) {
          // Silently overwrite with latest values
          window.data[existingIndex].minutes = entry.minutes;
          window.data[existingIndex].characters = entry.characters;
          bookTitles.add(entry.title);
        }
      }
    }
  } catch (err) {
    console.error(`  ❌ Error processing "${bookFolder.name}":`, err);
  }
}

if (sessionsToAdd.length === 0) {
  localStorage.setItem(TTSU_LAST_SYNC_KEY, new Date().toISOString());
  const customAlert = window.customAlert || alert;
  await customAlert(`✅ Already up to date!\n\nChecked ${allFolders.length} book folder(s).`, 'Already Synced');
  return 0;
}

window.data.push(...sessionsToAdd);
bookTitles.forEach(title => {
  if (title && !window.recentBooks.includes(title)) window.recentBooks.unshift(title);
});
window.recentBooks = window.recentBooks.slice(0, 10);

if (typeof recentBooks !== 'undefined') recentBooks = window.recentBooks;
if (typeof data !== 'undefined') data = window.data;

localStorage.setItem('reading_heatmap_data', JSON.stringify(window.data));
localStorage.setItem('reading_heatmap_books', JSON.stringify(window.recentBooks));
localStorage.setItem(TTSU_LAST_SYNC_KEY, new Date().toISOString());

if (window.aggregateData) window.aggregateData();
if (window.loadYear) window.loadYear();
if (window.renderGoals) window.renderGoals();
if (window.saveCloudState) await window.saveCloudState();

const customAlert = window.customAlert || alert;
const bookList = Array.from(bookTitles).join(', ');
await customAlert(`✅ Sync complete!\n\nAdded: ${sessionsToAdd.length} new session(s)\nBooks: ${bookList}`, 'Sync Successful');
return sessionsToAdd.length;

  } catch (error) {
    console.error('❌ SYNC ERROR:', error);
    throw error;
  }
}

async function syncTtsu() {
  const customAlert = window.customAlert || alert;

  // Ensure GIS is ready
  let attempts = 0;
  while (!initGIS() && attempts < 20) {
    await new Promise(resolve => setTimeout(resolve, 500));
    attempts++;
  }
  if (!tokenClient) {
    await customAlert('Google Identity Services not loaded. Please refresh the page.', 'Error');
    return;
  }

  // Try silent auth first, fall back to interactive login
  let hasToken = await ensureDriveToken({ allowPrompt: false });
  if (!hasToken) {
    hasToken = await ensureDriveToken({ allowPrompt: true });
  }
  if (!hasToken) {
    await customAlert('Google Drive authorization failed. Please try again.', 'Authorization Failed');
    return;
  }

  // Find or reuse folder
  let folderId = localStorage.getItem(TTSU_FOLDER_ID_KEY);
  if (!folderId) {
    folderId = await findTtsuFolder();
    if (!folderId) {
      await customAlert(
        'Could not find the "ttu-reader-data" folder in your Google Drive.\n\nMake sure ttsu has exported data first!',
        'Folder Not Found'
      );
      return;
    }
    localStorage.setItem(TTSU_FOLDER_ID_KEY, folderId);
  }

  localStorage.setItem(TTSU_SYNC_ENABLED_KEY, 'true');

  try {
    await syncFromTtsuGDrive();
    startAutoSync();
    if (window.loadTtsuSyncStatus) window.loadTtsuSyncStatus();
    if (window.closeTtsuSyncModal) window.closeTtsuSyncModal();
  } catch (error) {
    await customAlert('Sync failed:\n\n' + (error.message || error), 'Sync Error');
  }
}

// --- Batch load (overwrites all existing data) ---
async function batchLoadAllTtsu() {
  const customConfirm = window.customConfirm || confirm;
  const customAlert = window.customAlert || alert;

  const firstConfirm = await customConfirm(
    '⚠ BATCH LOAD ALL FROM TTSU ⚠️\n\nThis will:\n1. Load ALL reading data from ttsu Google Drive\n2. OVERWRITE your existing data\n3. This action CANNOT be undone\n\nAre you sure you want to continue?',
    'Batch Load Warning'
  );
  if (!firstConfirm) return;

  const secondConfirm = await customConfirm(
    'FINAL CONFIRMATION\n\nYour current reading data will be PERMANENTLY REPLACED with all data from ttsu.\n\nClick OK to proceed or Cancel to abort.',
    'Final Confirmation'
  );
  if (!secondConfirm) return;

  try {
    let folderId = localStorage.getItem(TTSU_FOLDER_ID_KEY);

    if (!folderId) {
      const hasToken = await ensureDriveToken({ allowPrompt: true });
      if (!hasToken) throw new Error('Authorization failed. Please try again.');

      folderId = await findTtsuFolder();
      if (!folderId) {
        await customAlert('Could not find the "ttu-reader-data" folder in your Google Drive.\n\nMake sure ttsu has exported data first!', 'Folder Not Found');
        return;
      }
      localStorage.setItem(TTSU_FOLDER_ID_KEY, folderId);
    } else {
      const hasToken = await ensureDriveToken({ allowPrompt: false });
      if (!hasToken) {
      await customAlert('Google Drive authorization has expired. Please press "Sync ttsu" to re-authorize.', 'Authorization Expired');        return;
      }
    }

    console.log('=== STARTING BATCH LOAD ===');

    // Clear existing data
    window.data = [];
    if (typeof data !== 'undefined') data = [];

    if (!Array.isArray(window.recentBooks)) {
      try { window.recentBooks = JSON.parse(localStorage.getItem('reading_heatmap_books')) || []; }
      catch (e) { window.recentBooks = []; }
    }

    const allFolders = await getBookFolders(folderId);

    if (allFolders.length === 0) {
      await customAlert('No book folders found in ttsu Google Drive.', 'No Data Found');
      return;
    }

    let totalImported = 0;
    const bookTitles = new Set();

    for (const bookFolder of allFolders) {
      try {
        console.log(`\n📚 Processing: ${bookFolder.name}`);
        const sessions = await extractSessionsFromFolder(bookFolder);
        console.log(`  Found ${sessions.length} sessions`);

        for (const entry of sessions) {
          window.data.push(entry);
          bookTitles.add(entry.title);
          totalImported++;
        }

        console.log(`  ✅ Imported ${sessions.length} sessions from "${bookFolder.name}"`);
      } catch (err) {
        console.error(`  ❌ Error processing "${bookFolder.name}":`, err);
      }
    }

    console.log(`\n=== BATCH LOAD SUMMARY ===`);
    console.log(`Total sessions imported: ${totalImported}`);

    if (totalImported === 0) {
      await customAlert('No reading data found in ttsu Google Drive.', 'No Data Found');
      return;
    }

    bookTitles.forEach(title => {
      if (title && !window.recentBooks.includes(title)) window.recentBooks.unshift(title);
    });
    window.recentBooks = window.recentBooks.slice(0, 10);

    if (typeof recentBooks !== 'undefined') recentBooks = window.recentBooks;
    if (typeof data !== 'undefined') data = window.data;

    localStorage.setItem('reading_heatmap_data', JSON.stringify(window.data));
    localStorage.setItem('reading_heatmap_books', JSON.stringify(window.recentBooks));

    if (window.aggregateData) window.aggregateData();
    if (window.loadYear) window.loadYear();
    if (window.renderGoals) window.renderGoals();
    if (window.saveCloudState) await window.saveCloudState();

    console.log(`✅ Batch loaded ${totalImported} sessions`);

    const bookList = Array.from(bookTitles).slice(0, 10).join(', ');
    const moreBooks = bookTitles.size > 10 ? `\n...and ${bookTitles.size - 10} more books` : '';

    await customAlert(
      `✅ Batch Load Complete!\n\n` +
      `Imported: ${totalImported} reading sessions\n` +
      `Books: ${bookList}${moreBooks}\n\n` +
      `Your data has been overwritten with ttsu data.`,
      'Success'
    );

    if (window.loadTtsuSyncStatus) window.loadTtsuSyncStatus();
    if (window.closeTtsuSyncModal) window.closeTtsuSyncModal();

  } catch (error) {
    console.error('❌ BATCH LOAD ERROR:', error);
    await customAlert('Failed to batch load from ttsu:\n\n' + (error.message || error), 'Error');
  }
}


// --- Auto-sync timer ---
function startAutoSync() {
  if (ttsuSyncInterval) clearInterval(ttsuSyncInterval);

  ttsuSyncInterval = setInterval(async () => {
    try {
      if (localStorage.getItem(TTSU_SYNC_ENABLED_KEY) === 'true') {
        console.log('Auto-syncing from ttsu...');
        await syncFromTtsuGDrive();
      }
    } catch (error) {
      console.error('Auto-sync error:', error);
    }
  }, 5 * 60 * 1000);
}

async function disableTtsuSync() {
  const customConfirm = window.customConfirm || confirm;
  const customAlert = window.customAlert || alert;

  const confirmed = await customConfirm('Disable automatic ttsu sync from Google Drive?\n\nYou can re-enable it anytime.', 'Disable Sync');
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

  await customAlert('ttsu sync has been disabled.', 'Sync Disabled');

  if (window.loadTtsuSyncStatus) window.loadTtsuSyncStatus();
}


// --- Status check ---
function checkTtsuSyncStatus() {
  const enabled = localStorage.getItem(TTSU_SYNC_ENABLED_KEY) === 'true';
  const folderId = localStorage.getItem(TTSU_FOLDER_ID_KEY);
  const lastSync = localStorage.getItem(TTSU_LAST_SYNC_KEY);

  if (!enabled || !folderId) return 'Not configured';
  if (!lastSync) return 'Configured (not synced yet)';

  const diffMinutes = Math.floor((Date.now() - new Date(lastSync)) / 1000 / 60);

  if (diffMinutes < 1) return 'Active (just synced)';
  if (diffMinutes < 60) return `Active (synced ${diffMinutes} min ago)`;
  return `Active (synced ${Math.floor(diffMinutes / 60)}h ago)`;
}


// --- Auto-init on settings page ---
setTimeout(async () => {
  const path = (window.location && window.location.pathname) || '';
  const onSettingsPage =
    path.endsWith('/settings.html') ||
    path.endsWith('settings.html') ||
    path === '/settings';

  if (!onSettingsPage) return;

  initGIS();

  const enabled = localStorage.getItem(TTSU_SYNC_ENABLED_KEY) === 'true';
  const folderId = localStorage.getItem(TTSU_FOLDER_ID_KEY);

  if (enabled && folderId) {
    await ensureDriveToken({ allowPrompt: false });
    startAutoSync();
    if (window.loadTtsuSyncStatus) window.loadTtsuSyncStatus();
    console.log('ttsu auto-sync initialized on settings page');
  }
}, 1000);


// --- Exports ---
window.initGIS = initGIS;
window.ensureDriveToken = ensureDriveToken;
window.driveApiCall = driveApiCall;
window.driveDownloadFile = driveDownloadFile;
window.findTtsuFolder = findTtsuFolder;
window.getBookFolders = getBookFolders;
window.extractSessionsFromFolder = extractSessionsFromFolder;
window.syncFromTtsuGDrive = syncFromTtsuGDrive;
window.syncTtsu = syncTtsu;
window.batchLoadAllTtsu = batchLoadAllTtsu;
window.disableTtsuSync = disableTtsuSync;
window.checkTtsuSyncStatus = checkTtsuSyncStatus;
window.startAutoSync = startAutoSync;

if (!window.loadTtsuSyncStatus) {
  window.loadTtsuSyncStatus = function () {
    try {
      const enabled = localStorage.getItem('ttsu_sync_enabled') === 'true';
      const folderId = localStorage.getItem('ttsu_folder_id');
      const lastSync = localStorage.getItem('ttsu_last_sync');
      const statusText = enabled
        ? (folderId ? (lastSync ? `Synced: ${new Date(lastSync).toLocaleString()}` : 'Configured') : 'Configured')
        : 'Not configured';
      const span = document.getElementById('ttsuSyncStatusText');
      const outer = document.getElementById('ttsuSyncStatus');
      if (span) {
        span.textContent = statusText;
        span.style.color = statusText.toLowerCase().startsWith('active') || statusText.toLowerCase().startsWith('synced')
          ? 'var(--accent-color)' : 'var(--text-secondary)';
      } else if (outer) {
        outer.textContent = statusText;
      }
    } catch (e) { /* ignore */ }
  };
}