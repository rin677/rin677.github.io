const TTSU_FOLDER_ID_KEY = 'ttsu_folder_id';
const TTSU_SYNC_ENABLED_KEY = 'ttsu_sync_enabled';
const TTSU_ACCESS_TOKEN_KEY = 'ttsu_access_token';
const TTSU_TOKEN_EXPIRY_KEY = 'ttsu_token_expiry';
const TTSU_LAST_SYNC_KEY = 'ttsu_last_sync';
const TTSU_REFRESH_TOKEN_KEY = 'ttsu_refresh_token';

// Client ID is fixed for this app
const CLIENT_ID = '510422773254-e8a8reeuce9jtn7dgjqq8c7kmeopikdr.apps.googleusercontent.com';

// Always read CLIENT_SECRET dynamically from localStorage so it survives page reloads
function getClientSecret() {
  return localStorage.getItem('ttsu_client_secret') || '';
}

let googleAccessToken = null;
let tokenClient = null;
let codeClient = null;
let ttsuSyncInterval = null;

function initGIS() {
  if (typeof google === 'undefined' || !google.accounts || !google.accounts.oauth2) {
    console.log('Google Identity Services not loaded yet');
    return false;
  }
  try {
    if (!tokenClient) {
      tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/drive.metadata.readonly',
        callback: () => {}
      });
    }
    if (!codeClient) {
      codeClient = google.accounts.oauth2.initCodeClient({
        client_id: CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/drive.metadata.readonly',
        ux_mode: 'popup',
        callback: () => {}
      });
    }
    console.log('GIS initialized');
    return true;
  } catch (err) {
    console.error('Failed to init GIS:', err);
    tokenClient = null;
    codeClient = null;
    return false;
  }
}

async function exchangeCodeForTokens(code) {
  const secret = getClientSecret();
  if (!secret) throw new Error('No client secret configured. Please enter it in Settings → ttsu Sync.');

  const resp = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: CLIENT_ID,
      client_secret: secret,
      redirect_uri: 'postmessage',
      grant_type: 'authorization_code'
    })
  });
  return resp.json();
}

async function refreshAccessToken() {
  const refreshToken = localStorage.getItem(TTSU_REFRESH_TOKEN_KEY);
  if (!refreshToken) return false;

  const secret = getClientSecret();
  if (!secret) {
    console.warn('No client secret — cannot refresh token silently');
    return false;
  }

  try {
    const resp = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        refresh_token: refreshToken,
        client_id: CLIENT_ID,
        client_secret: secret,
        grant_type: 'refresh_token'
      })
    });
    const data = await resp.json();
    if (data.access_token) {
      googleAccessToken = data.access_token;
      const expiry = Date.now() + ((data.expires_in || 3600) * 1000);
      localStorage.setItem(TTSU_ACCESS_TOKEN_KEY, data.access_token);
      localStorage.setItem(TTSU_TOKEN_EXPIRY_KEY, expiry.toString());
      console.log('Access token silently refreshed');
      return true;
    }
    console.warn('Refresh token rejected:', data.error, data.error_description);
    localStorage.removeItem(TTSU_REFRESH_TOKEN_KEY);
    return false;
  } catch (err) {
    console.error('Token refresh error:', err);
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

async function ensureDriveToken(options = { allowPrompt: false }) {
  const customAlert = window.customAlert || (msg => console.log(msg));

  // 1. Use cached access token if still valid (with 5-min buffer)
  const storedToken = localStorage.getItem(TTSU_ACCESS_TOKEN_KEY);
  const storedExpiry = localStorage.getItem(TTSU_TOKEN_EXPIRY_KEY);
  if (storedToken && storedExpiry && parseInt(storedExpiry) > Date.now() + 5 * 60 * 1000) {
    googleAccessToken = storedToken;
    console.log('Using cached access token');
    return true;
  }

  // 2. Try silent refresh via stored refresh token
  if (localStorage.getItem(TTSU_REFRESH_TOKEN_KEY)) {
    const ok = await refreshAccessToken();
    if (ok) return true;
    // Refresh token is dead, fall through to interactive
  }

  if (!options.allowPrompt) return false;

  // 3. Interactive: get auth code → exchange for tokens (gets refresh token)
  if (!initGIS()) {
    let attempts = 0;
    while (!initGIS() && attempts < 20) {
      await new Promise(r => setTimeout(r, 500));
      attempts++;
    }
  }
  if (!codeClient) return false;

  // Ensure we have a client secret before attempting interactive auth
  if (!getClientSecret()) {
    await customAlert(
      'Please enter your Google OAuth Client Secret in the ttsu Sync settings before connecting.',
      'Client Secret Required'
    );
    return false;
  }

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
      googleAccessToken = tokens.access_token;
      const expiry = Date.now() + ((tokens.expires_in || 3600) * 1000);
      localStorage.setItem(TTSU_ACCESS_TOKEN_KEY, tokens.access_token);
      localStorage.setItem(TTSU_TOKEN_EXPIRY_KEY, expiry.toString());
      if (tokens.refresh_token) {
        localStorage.setItem(TTSU_REFRESH_TOKEN_KEY, tokens.refresh_token);
        console.log('Refresh token saved — future syncs will be fully silent');
      }
      return true;
    }
    console.error('Token exchange failed:', tokens);
    await customAlert('Google authorization failed: ' + (tokens.error_description || tokens.error || 'Unknown error'), 'Auth Error');
    return false;
  } catch (err) {
    console.error('Interactive auth failed:', err);
    await customAlert('Authorization popup was closed or failed. Please try again.', 'Auth Failed');
    return false;
  }
}

// Search for the ttu-reader-data folder by name across all of Drive
async function findTtsuFolder() {
  try {
    console.log('Searching for ttu-reader-data folder...');
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

// Paginate all direct child folders
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
      console.log(`  Page ${pageNum}: ${data.files.length} folders (total: ${allFolders.length})`);
    }

    pageToken = data.nextPageToken || null;
  } while (pageToken);

  console.log(`Total unique book folders found: ${allFolders.length}`);
  return allFolders;
}

// Process a book folder's statistics file into session entries
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
      console.warn('getBookFolders failed, attempting re-discovery...', folderErr);
      localStorage.removeItem(TTSU_FOLDER_ID_KEY);
      const newFolderId = await findTtsuFolder();
      if (!newFolderId) {
        throw new Error('Could not find "ttu-reader-data" folder in Google Drive.');
      }
      localStorage.setItem(TTSU_FOLDER_ID_KEY, newFolderId);
      allFolders = await getBookFolders(newFolderId);
    }

    if (allFolders.length === 0) {
      await (window.customAlert || alert)(
        'No book folders found in ttsu Google Drive.\n\nMake sure ttsu has synced data to Drive.',
        'No Folders Found'
      );
      return 0;
    }

    const sessionsToAdd = [];
    const sessionsToUpdate = [];
    const bookTitles = new Set();

    for (const bookFolder of allFolders) {
      try {
        console.log(`\n📚 Processing: ${bookFolder.name}`);
        const sessions = await extractSessionsFromFolder(bookFolder);
        console.log(`  Found ${sessions.length} sessions`);

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
        console.error(`  ❌ Error processing "${bookFolder.name}":`, err);
      }
    }

    console.log(`\n=== SYNC SUMMARY ===`);
    console.log(`New: ${sessionsToAdd.length}, Updated: ${sessionsToUpdate.length}`);

    if (sessionsToAdd.length === 0 && sessionsToUpdate.length === 0) {
      localStorage.setItem(TTSU_LAST_SYNC_KEY, new Date().toISOString());
      await (window.customAlert || alert)(
        `✅ Already up to date!\n\nChecked ${allFolders.length} book folder(s) — no new or changed data.`,
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

    const totalChanged = sessionsToAdd.length + sessionsToUpdate.length;
    await (window.customAlert || alert)(
      `✅ Sync complete!\n\nNew: ${sessionsToAdd.length}  Updated: ${sessionsToUpdate.length}\nBooks: ${bookList}`,
      'Sync Successful'
    );

    return totalChanged;
  } catch (error) {
    console.error('❌ SYNC ERROR:', error);
    throw error;
  }
}

async function setupTtsuSync() {
  const customAlert = window.customAlert || alert;

  // Read and save client secret from the settings input (if on settings page)
  const secretInput = document.getElementById('ttsuClientSecretInput');
  if (secretInput && secretInput.value.trim()) {
    localStorage.setItem('ttsu_client_secret', secretInput.value.trim());
  }

  // Validate we have a client secret
  if (!getClientSecret()) {
    await customAlert(
      'Please enter your Google OAuth Client Secret before setting up sync.\n\nGet it from console.cloud.google.com → APIs & Services → Credentials.',
      'Client Secret Required'
    );
    return;
  }

  // Clear stale tokens to force fresh auth
  localStorage.removeItem(TTSU_ACCESS_TOKEN_KEY);
  localStorage.removeItem(TTSU_TOKEN_EXPIRY_KEY);
  localStorage.removeItem(TTSU_REFRESH_TOKEN_KEY);
  googleAccessToken = null;
  tokenClient = null;
  codeClient = null;

  let attempts = 0;
  while (!initGIS() && attempts < 20) {
    await new Promise(resolve => setTimeout(resolve, 500));
    attempts++;
  }
  if (!codeClient) {
    await customAlert('Google Identity Services not loaded. Please refresh the page.', 'Error');
    return;
  }

  const ok = await ensureDriveToken({ allowPrompt: true });
  if (!ok) {
    await customAlert('Authorization failed. Please try again.', 'Auth Failed');
    return;
  }

  const folderId = await findTtsuFolder();
  if (!folderId) {
    await customAlert(
      'Could not find the "ttu-reader-data" folder in your Google Drive.\n\nMake sure ttsu has exported data first!',
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
  await customAlert(
    '✅ ttsu sync enabled!\n\nYour refresh token has been saved — future syncs will be fully silent and automatic.',
    'Sync Enabled'
  );
  if (window.closeTtsuSyncModal) window.closeTtsuSyncModal();
}

async function manualSyncTtsu() {
  const enabled = localStorage.getItem(TTSU_SYNC_ENABLED_KEY) === 'true';
  const folderId = localStorage.getItem(TTSU_FOLDER_ID_KEY);

  if (!enabled || !folderId) {
    await (window.customAlert || alert)(
      'ttsu sync is not enabled.\n\nPlease click "Setup Sync" and enter your Client Secret first.',
      'Sync Not Enabled'
    );
    return;
  }

  // Try silent refresh first, then interactive fallback
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

// Batch load — overwrites all existing data
async function batchLoadAllTtsu() {
  const customConfirm = window.customConfirm || confirm;
  const customAlert = window.customAlert || alert;

  const firstConfirm = await customConfirm(
    '⚠ BATCH LOAD ALL FROM TTSU ⚠️\n\nThis will:\n1. Load ALL reading data from ttsu Google Drive\n2. OVERWRITE your existing data\n3. This action CANNOT be undone\n\nAre you sure?',
    'Batch Load Warning'
  );
  if (!firstConfirm) return;

  const secondConfirm = await customConfirm(
    'FINAL CONFIRMATION\n\nYour current data will be PERMANENTLY REPLACED.\n\nClick OK to proceed.',
    'Final Confirmation'
  );
  if (!secondConfirm) return;

  try {
    let folderId = localStorage.getItem(TTSU_FOLDER_ID_KEY);

    if (!folderId) {
      const hasToken = await ensureDriveToken({ allowPrompt: true });
      if (!hasToken) throw new Error('Authorization failed.');
      folderId = await findTtsuFolder();
      if (!folderId) {
        await customAlert('Could not find "ttu-reader-data" folder in Google Drive.', 'Folder Not Found');
        return;
      }
      localStorage.setItem(TTSU_FOLDER_ID_KEY, folderId);
    } else {
      const hasToken = await ensureDriveToken({ allowPrompt: false });
      if (!hasToken) {
        await customAlert(
          'Authorization expired. Please click "Setup Sync" again to reconnect.',
          'Authorization Expired'
        );
        return;
      }
    }

    console.log('=== STARTING BATCH LOAD ===');
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
        for (const entry of sessions) {
          window.data.push(entry);
          bookTitles.add(entry.title);
          totalImported++;
        }
        console.log(`  ✅ Imported ${sessions.length} sessions`);
      } catch (err) {
        console.error(`  ❌ Error processing "${bookFolder.name}":`, err);
      }
    }

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

    const bookList = Array.from(bookTitles).slice(0, 10).join(', ');
    const moreBooks = bookTitles.size > 10 ? `\n...and ${bookTitles.size - 10} more books` : '';

    await customAlert(
      `✅ Batch Load Complete!\n\nImported: ${totalImported} sessions\nBooks: ${bookList}${moreBooks}`,
      'Success'
    );

    if (window.loadTtsuSyncStatus) window.loadTtsuSyncStatus();
    if (window.closeTtsuSyncModal) window.closeTtsuSyncModal();

  } catch (error) {
    console.error('❌ BATCH LOAD ERROR:', error);
    await customAlert('Failed to batch load:\n\n' + (error.message || error), 'Error');
  }
}

// Auto-sync timer (every 5 minutes)
function startAutoSync() {
  if (ttsuSyncInterval) clearInterval(ttsuSyncInterval);

  ttsuSyncInterval = setInterval(async () => {
    try {
      if (localStorage.getItem(TTSU_SYNC_ENABLED_KEY) === 'true') {
        console.log('Auto-syncing from ttsu...');
        // Only do silent syncs automatically (no prompts)
        const hasToken = await ensureDriveToken({ allowPrompt: false });
        if (hasToken) await syncFromTtsuGDrive();
      }
    } catch (error) {
      console.error('Auto-sync error:', error);
    }
  }, 5 * 60 * 1000);
}

async function disableTtsuSync() {
  const customConfirm = window.customConfirm || confirm;
  const customAlert = window.customAlert || alert;

  const confirmed = await customConfirm(
    'Disable automatic ttsu sync from Google Drive?\n\nYou can re-enable it anytime.',
    'Disable Sync'
  );
  if (!confirmed) return;

  if (ttsuSyncInterval) {
    clearInterval(ttsuSyncInterval);
    ttsuSyncInterval = null;
  }

  localStorage.removeItem(TTSU_SYNC_ENABLED_KEY);
  localStorage.removeItem(TTSU_FOLDER_ID_KEY);
  localStorage.removeItem(TTSU_ACCESS_TOKEN_KEY);
  localStorage.removeItem(TTSU_TOKEN_EXPIRY_KEY);
  localStorage.removeItem(TTSU_REFRESH_TOKEN_KEY);
  googleAccessToken = null;

  await customAlert('ttsu sync has been disabled.', 'Sync Disabled');
  if (window.loadTtsuSyncStatus) window.loadTtsuSyncStatus();
}

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

// Auto-init on page load
setTimeout(async () => {
  const path = (window.location && window.location.pathname) || '';
  const onSettingsPage =
    path.endsWith('/settings.html') ||
    path.endsWith('settings.html') ||
    path === '/settings';

  initGIS();

  const enabled = localStorage.getItem(TTSU_SYNC_ENABLED_KEY) === 'true';
  const folderId = localStorage.getItem(TTSU_FOLDER_ID_KEY);

  if (enabled && folderId) {
    // Pre-fill settings inputs if on settings page
    if (onSettingsPage) {
      const savedSecret = localStorage.getItem('ttsu_client_secret');
      if (savedSecret) {
        const secretInput = document.getElementById('ttsuClientSecretInput');
        if (secretInput) secretInput.value = savedSecret;
      }
    }

    // Try silent token refresh
    await ensureDriveToken({ allowPrompt: false });
    startAutoSync();
    if (window.loadTtsuSyncStatus) window.loadTtsuSyncStatus();
    console.log('ttsu auto-sync initialized');
  } else if (onSettingsPage) {
    // Pre-fill saved secret into input even if sync not yet enabled
    const savedSecret = localStorage.getItem('ttsu_client_secret');
    if (savedSecret) {
      const secretInput = document.getElementById('ttsuClientSecretInput');
      if (secretInput) secretInput.value = savedSecret;
    }
  }
}, 1000);

// Exports
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
      const status = checkTtsuSyncStatus();
      const span = document.getElementById('ttsuSyncStatusText');
      const outer = document.getElementById('ttsuSyncStatus');
      const isActive = status.toLowerCase().startsWith('active');
      if (span) {
        span.textContent = status;
        span.style.color = isActive ? 'var(--accent-color)' : 'var(--text-secondary)';
      } else if (outer) {
        outer.textContent = status;
      }
    } catch (e) { /* ignore */ }
  };
}