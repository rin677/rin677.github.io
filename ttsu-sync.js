const TTSU_FOLDER_ID_KEY = 'ttsu_folder_id';
const TTSU_SYNC_ENABLED_KEY = 'ttsu_sync_enabled';
const TTSU_ACCESS_TOKEN_KEY = 'ttsu_access_token';
const TTSU_TOKEN_EXPIRY_KEY = 'ttsu_token_expiry';
const TTSU_REFRESH_TOKEN_KEY = 'ttsu_refresh_token';
const TTSU_LAST_SYNC_KEY = 'ttsu_last_sync';

const CLIENT_ID = '510422773254-e8a8reeuce9jtn7dgjqq8c7kmeopikdr.apps.googleusercontent.com';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET_HERE'; // paste from Google Cloud Console
const SCOPES = 'https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/drive.metadata.readonly';

let googleAccessToken = null;
let codeClient = null;
let ttsuSyncInterval = null;

// --- Initialize GIS code client ---
function initGIS() {
  if (codeClient) return true;
  if (typeof google === 'undefined' || !google.accounts || !google.accounts.oauth2) {
    console.log('GIS not loaded yet');
    return false;
  }
  try {
    codeClient = google.accounts.oauth2.initCodeClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      ux_mode: 'popup',
      callback: () => {} // set per-request
    });
    console.log('GIS code client initialized');
    return true;
  } catch (err) {
    console.error('Failed to init GIS:', err);
    codeClient = null;
    return false;
  }
}

// --- Exchange auth code for access + refresh tokens ---
async function exchangeCodeForTokens(code) {
  const resp = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: 'postmessage',
      grant_type: 'authorization_code'
    })
  });
  return resp.json();
}

// --- Use stored refresh token to silently get a new access token ---
async function refreshAccessToken() {
  const refreshToken = localStorage.getItem(TTSU_REFRESH_TOKEN_KEY);
  if (!refreshToken) return false;

  try {
    const resp = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        refresh_token: refreshToken,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'refresh_token'
      })
    });

    const data = await resp.json();
    if (data.access_token) {
      googleAccessToken = data.access_token;
      const expiry = Date.now() + ((data.expires_in || 3600) * 1000);
      localStorage.setItem(TTSU_ACCESS_TOKEN_KEY, data.access_token);
      localStorage.setItem(TTSU_TOKEN_EXPIRY_KEY, expiry.toString());
      console.log('Access token refreshed silently');
      return true;
    }

    // Refresh token invalid/revoked — clear it
    console.warn('Refresh token rejected, clearing:', data.error);
    localStorage.removeItem(TTSU_REFRESH_TOKEN_KEY);
    localStorage.removeItem(TTSU_ACCESS_TOKEN_KEY);
    localStorage.removeItem(TTSU_TOKEN_EXPIRY_KEY);
    return false;
  } catch (err) {
    console.error('Token refresh error:', err);
    return false;
  }
}

// --- Save tokens from an exchange response ---
function saveTokens(data) {
  googleAccessToken = data.access_token;
  const expiry = Date.now() + ((data.expires_in || 3600) * 1000);
  localStorage.setItem(TTSU_ACCESS_TOKEN_KEY, data.access_token);
  localStorage.setItem(TTSU_TOKEN_EXPIRY_KEY, expiry.toString());
  if (data.refresh_token) {
    localStorage.setItem(TTSU_REFRESH_TOKEN_KEY, data.refresh_token);
    console.log('Refresh token saved — future syncs will be silent');
  }
}

// --- Main token gate: silent if possible, prompt only if needed ---
async function ensureDriveToken(options = { allowPrompt: false }) {
  // 1. Use cached access token if still valid
  const storedToken = localStorage.getItem(TTSU_ACCESS_TOKEN_KEY);
  const storedExpiry = localStorage.getItem(TTSU_TOKEN_EXPIRY_KEY);
  if (storedToken && storedExpiry) {
    if (parseInt(storedExpiry) > Date.now() + 5 * 60 * 1000) {
      googleAccessToken = storedToken;
      console.log('Using cached access token');
      return true;
    }
  }

  // 2. Try silent refresh via stored refresh token
  const hasRefreshToken = !!localStorage.getItem(TTSU_REFRESH_TOKEN_KEY);
  if (hasRefreshToken) {
    const ok = await refreshAccessToken();
    if (ok) return true;
    // Refresh token dead — fall through to interactive if allowed
  }

  if (!options.allowPrompt) return false;

  // 3. Interactive: show Google popup to get auth code → exchange for tokens
  if (!initGIS()) {
    let attempts = 0;
    while (!initGIS() && attempts < 20) {
      await new Promise(r => setTimeout(r, 500));
      attempts++;
    }
  }
  if (!codeClient) return false;

  try {
    const code = await new Promise((resolve, reject) => {
      codeClient.callback = (resp) => {
        if (resp.code) resolve(resp.code);
        else reject(resp.error || 'no_code');
      };
      codeClient.requestCode();
    });

    const tokens = await exchangeCodeForTokens(code);
    if (tokens.access_token) {
      saveTokens(tokens);
      return true;
    }

    console.error('Token exchange failed:', tokens);
    return false;
  } catch (err) {
    console.error('Interactive auth failed:', err);
    return false;
  }
}

// --- Drive API helpers ---
async function driveApiCall(endpoint, accessToken) {
  const response = await fetch(`https://www.googleapis.com/drive/v3/${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json'
    }
  });
  if (!response.ok) throw new Error(`Drive API error: ${response.status} ${response.statusText}`);
  return response.json();
}

async function driveDownloadFile(fileId, accessToken) {
  const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
  if (!response.ok) throw new Error(`Download error: ${response.status}`);
  return response.text();
}

// --- Folder/book discovery ---
async function findTtsuFolder() {
  try {
    const data = await driveApiCall(
      `files?q=${encodeURIComponent("name='ttu-reader-data' and mimeType='application/vnd.google-apps.folder' and trashed=false")}&fields=files(id,name)&spaces=drive&corpora=allDrives&pageSize=10&supportsAllDrives=true&includeItemsFromAllDrives=true`,
      googleAccessToken
    );
    if (data.files && data.files.length > 0) return data.files[0].id;
    return null;
  } catch (error) {
    console.error('Error finding ttsu folder:', error);
    return null;
  }
}

async function getBookFolders(folderId) {
  const allFolders = [];
  const seenIds = new Set();
  let pageToken = null;

  do {
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
    }
    pageToken = data.nextPageToken || null;
  } while (pageToken);

  return allFolders;
}

async function extractSessionsFromFolder(bookFolder) {
  const statsQuery = encodeURIComponent(
    `'${bookFolder.id}' in parents and name contains 'statistics_' and trashed=false`
  );
  const statsData = await driveApiCall(
    `files?q=${statsQuery}&spaces=drive&corpora=allDrives&fields=files(id,name,modifiedTime)&orderBy=modifiedTime desc&pageSize=10&supportsAllDrives=true&includeItemsFromAllDrives=true`,
    googleAccessToken
  );

  const files = statsData.files || [];
  if (files.length === 0) return [];

  const fileContent = await driveDownloadFile(files[0].id, googleAccessToken);
  const ttsuData = JSON.parse(fileContent);
  if (!Array.isArray(ttsuData)) return [];

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

// --- Main sync (adds new, updates changed) ---
async function syncFromTtsuGDrive() {
  try {
    const folderId = localStorage.getItem(TTSU_FOLDER_ID_KEY);
    if (!folderId) throw new Error('ttsu folder not configured. Please run setup first.');
    if (!googleAccessToken) throw new Error('Not authenticated.');

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
      console.warn('getBookFolders failed, attempting re-discovery...', folderErr);
      localStorage.removeItem(TTSU_FOLDER_ID_KEY);
      const newFolderId = await findTtsuFolder();
      if (!newFolderId) throw new Error('Could not find "ttu-reader-data" folder in Google Drive.');
      localStorage.setItem(TTSU_FOLDER_ID_KEY, newFolderId);
      allFolders = await getBookFolders(newFolderId);
    }

    if (allFolders.length === 0) {
      await (window.customAlert || alert)('No book folders found in ttsu Google Drive.', 'No Folders Found');
      return 0;
    }

    const sessionsToAdd = [];
    const sessionsToUpdate = [];
    const bookTitles = new Set();

    for (const bookFolder of allFolders) {
      try {
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
              sessionsToUpdate.push({ index: existingIndex, entry });
              bookTitles.add(entry.title);
            }
          }
        }
      } catch (err) {
        console.error(`Error processing "${bookFolder.name}":`, err);
      }
    }

    if (sessionsToAdd.length === 0 && sessionsToUpdate.length === 0) {
      localStorage.setItem(TTSU_LAST_SYNC_KEY, new Date().toISOString());
      await (window.customAlert || alert)(
        `✅ Already up to date!\n\nChecked ${allFolders.length} book folder(s).`,
        'Already Synced'
      );
      return 0;
    }

    const bookList = Array.from(bookTitles).join(', ');
    const summaryParts = [];
    if (sessionsToAdd.length > 0) summaryParts.push(`${sessionsToAdd.length} new session(s)`);
    if (sessionsToUpdate.length > 0) summaryParts.push(`${sessionsToUpdate.length} updated session(s)`);

    const confirmed = await (window.customConfirm || confirm)(
      `Found ${summaryParts.join(' and ')} from ttsu:\n\nBooks: ${bookList}\n\nApply these changes?`,
      'Import ttsu Data'
    );
    if (!confirmed) return 0;

    for (const { index, entry } of sessionsToUpdate) {
      window.data[index].minutes = entry.minutes;
      window.data[index].characters = entry.characters;
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

    const total = sessionsToAdd.length + sessionsToUpdate.length;
    await (window.customAlert || alert)(
      `✅ Sync complete!\n\nNew: ${sessionsToAdd.length}  Updated: ${sessionsToUpdate.length}\nBooks: ${bookList}`,
      'Sync Successful'
    );
    return total;

  } catch (error) {
    console.error('❌ SYNC ERROR:', error);
    throw error;
  }
}

// --- Setup (only needed once ever) ---
async function setupTtsuSync() {
  const ok = await ensureDriveToken({ allowPrompt: true });
  if (!ok) {
    await (window.customAlert || alert)('Authorization failed. Please try again.', 'Auth Failed');
    return;
  }

  const folderId = await findTtsuFolder();
  if (!folderId) {
    await (window.customAlert || alert)(
      'Could not find "ttu-reader-data" folder in your Google Drive.\n\nMake sure ttsu has exported data first!',
      'Folder Not Found'
    );
    return;
  }

  localStorage.setItem(TTSU_FOLDER_ID_KEY, folderId);
  localStorage.setItem(TTSU_SYNC_ENABLED_KEY, 'true');

  await syncFromTtsuGDrive();
  localStorage.setItem(TTSU_LAST_SYNC_KEY, new Date().toISOString());
  startAutoSync();

  if (window.loadTtsuSyncStatus) window.loadTtsuSyncStatus();
  await (window.customAlert || alert)('✅ ttsu sync enabled! Future syncs will be fully automatic.', 'Sync Enabled');
  if (window.closeTtsuSyncModal) window.closeTtsuSyncModal();
}

// --- Manual sync (fully silent if refresh token exists) ---
async function manualSyncTtsu() {
  const enabled = localStorage.getItem(TTSU_SYNC_ENABLED_KEY) === 'true';
  const folderId = localStorage.getItem(TTSU_FOLDER_ID_KEY);

  if (!enabled || !folderId) {
    await (window.customAlert || alert)('ttsu sync is not enabled.\n\nPlease run "Setup ttsu Auto-Sync" once to configure.', 'Sync Not Enabled');
    return;
  }

  // Try silent first (uses refresh token), then interactive if needed
  let hasToken = await ensureDriveToken({ allowPrompt: false });
  if (!hasToken) hasToken = await ensureDriveToken({ allowPrompt: true });
  if (!hasToken) {
    await (window.customAlert || alert)('Authorization failed. Please try again.', 'Auth Failed');
    return;
  }

  try {
    await syncFromTtsuGDrive();
    if (window.loadTtsuSyncStatus) window.loadTtsuSyncStatus();
  } catch (error) {
    await (window.customAlert || alert)('Sync failed:\n\n' + (error.message || error), 'Sync Error');
  }
}

// --- Batch load ---
async function batchLoadAllTtsu() {
  const customConfirm = window.customConfirm || confirm;
  const customAlert = window.customAlert || alert;

  if (!await customConfirm('⚠ BATCH LOAD ALL FROM TTSU ⚠️\n\nThis will OVERWRITE your existing data.\n\nAre you sure?', 'Batch Load Warning')) return;
  if (!await customConfirm('FINAL CONFIRMATION\n\nAll current data will be permanently replaced.', 'Final Confirmation')) return;

  let folderId = localStorage.getItem(TTSU_FOLDER_ID_KEY);
  let hasToken = await ensureDriveToken({ allowPrompt: false });
  if (!hasToken) hasToken = await ensureDriveToken({ allowPrompt: true });
  if (!hasToken) { await customAlert('Authorization failed.', 'Auth Failed'); return; }

  if (!folderId) {
    folderId = await findTtsuFolder();
    if (!folderId) { await customAlert('Could not find "ttu-reader-data" folder.', 'Folder Not Found'); return; }
    localStorage.setItem(TTSU_FOLDER_ID_KEY, folderId);
  }

  window.data = [];
  if (typeof data !== 'undefined') data = [];

  const allFolders = await getBookFolders(folderId);
  if (allFolders.length === 0) { await customAlert('No book folders found.', 'No Data Found'); return; }

  let totalImported = 0;
  const bookTitles = new Set();

  for (const bookFolder of allFolders) {
    try {
      const sessions = await extractSessionsFromFolder(bookFolder);
      for (const entry of sessions) {
        window.data.push(entry);
        bookTitles.add(entry.title);
        totalImported++;
      }
    } catch (err) {
      console.error(`Error processing "${bookFolder.name}":`, err);
    }
  }

  if (totalImported === 0) { await customAlert('No reading data found.', 'No Data Found'); return; }

  if (!Array.isArray(window.recentBooks)) window.recentBooks = [];
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

  const bookList = Array.from(bookTitles).slice(0, 10).join(', ');
  await customAlert(`✅ Batch Load Complete!\n\nImported: ${totalImported} sessions\nBooks: ${bookList}`, 'Success');
  if (window.loadTtsuSyncStatus) window.loadTtsuSyncStatus();
  if (window.closeTtsuSyncModal) window.closeTtsuSyncModal();
}

// --- Auto-sync ---
function startAutoSync() {
  if (ttsuSyncInterval) clearInterval(ttsuSyncInterval);
  ttsuSyncInterval = setInterval(async () => {
    if (localStorage.getItem(TTSU_SYNC_ENABLED_KEY) !== 'true') return;
    try {
      const hasToken = await ensureDriveToken({ allowPrompt: false });
      if (hasToken) await syncFromTtsuGDrive();
    } catch (error) {
      console.error('Auto-sync error:', error);
    }
  }, 5 * 60 * 1000);
}

// --- Disable ---
async function disableTtsuSync() {
  const confirmed = await (window.customConfirm || confirm)(
    'Disable automatic ttsu sync?\n\nYou can re-enable it anytime.',
    'Disable Sync'
  );
  if (!confirmed) return;

  if (ttsuSyncInterval) { clearInterval(ttsuSyncInterval); ttsuSyncInterval = null; }

  localStorage.removeItem(TTSU_SYNC_ENABLED_KEY);
  localStorage.removeItem(TTSU_FOLDER_ID_KEY);
  localStorage.removeItem(TTSU_ACCESS_TOKEN_KEY);
  localStorage.removeItem(TTSU_TOKEN_EXPIRY_KEY);
  localStorage.removeItem(TTSU_REFRESH_TOKEN_KEY);
  googleAccessToken = null;

  await (window.customAlert || alert)('ttsu sync has been disabled.', 'Sync Disabled');
  if (window.loadTtsuSyncStatus) window.loadTtsuSyncStatus();
}

// --- Status ---
function checkTtsuSyncStatus() {
  const enabled = localStorage.getItem(TTSU_SYNC_ENABLED_KEY) === 'true';
  const folderId = localStorage.getItem(TTSU_FOLDER_ID_KEY);
  const lastSync = localStorage.getItem(TTSU_LAST_SYNC_KEY);
  const hasRefresh = !!localStorage.getItem(TTSU_REFRESH_TOKEN_KEY);

  if (!enabled || !folderId) return 'Not configured';
  if (!lastSync) return hasRefresh ? 'Configured (auto-auth ready)' : 'Configured (not synced yet)';

  const diffMinutes = Math.floor((Date.now() - new Date(lastSync)) / 1000 / 60);
  const authStatus = hasRefresh ? '' : ' ⚠️ needs re-auth';
  if (diffMinutes < 1) return `Active (just synced)${authStatus}`;
  if (diffMinutes < 60) return `Active (synced ${diffMinutes} min ago)${authStatus}`;
  return `Active (synced ${Math.floor(diffMinutes / 60)}h ago)${authStatus}`;
}

// --- Auto-init ---
setTimeout(async () => {
  initGIS();
  const enabled = localStorage.getItem(TTSU_SYNC_ENABLED_KEY) === 'true';
  const folderId = localStorage.getItem(TTSU_FOLDER_ID_KEY);
  if (enabled && folderId) {
    const hasToken = await ensureDriveToken({ allowPrompt: false });
    if (hasToken) startAutoSync();
    if (window.loadTtsuSyncStatus) window.loadTtsuSyncStatus();
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
window.setupTtsuSync = setupTtsuSync;
window.manualSyncTtsu = manualSyncTtsu;
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
      const hasRefresh = !!localStorage.getItem(TTSU_REFRESH_TOKEN_KEY);
      const statusText = enabled
        ? (folderId ? (lastSync ? `Synced: ${new Date(lastSync).toLocaleString()}` : 'Configured') : 'Configured')
        : 'Not configured';
      const span = document.getElementById('ttsuSyncStatusText');
      const outer = document.getElementById('ttsuSyncStatus');
      if (span) {
        span.textContent = statusText + (enabled && !hasRefresh && lastSync ? ' ⚠️' : '');
        span.style.color = statusText.toLowerCase().startsWith('synced')
          ? 'var(--accent-color)' : 'var(--text-secondary)';
      } else if (outer) {
        outer.textContent = statusText;
      }
    } catch (e) { /* ignore */ }
  };
}