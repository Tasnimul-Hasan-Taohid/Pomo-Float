const { app, BrowserWindow, ipcMain, Tray, Menu, nativeImage } = require('electron');
const path = require('path');

let mainWindow;
let tray;
let isAlwaysOnTop = true;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 280,
    height: 340,
    minWidth: 240,
    minHeight: 300,
    maxWidth: 360,
    maxHeight: 420,
    frame: false,              // No OS title bar
    transparent: true,         // Transparent background
    alwaysOnTop: true,         // Float over everything
    resizable: true,
    skipTaskbar: false,
    hasShadow: true,
    vibrancy: 'under-window',  // macOS frosted glass
    visualEffectState: 'active',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Start at top-right corner of primary display
  const { screen } = require('electron');
  const display = screen.getPrimaryDisplay();
  const { width } = display.workAreaSize;
  mainWindow.setPosition(width - 300, 30);

  // Dev tools in dev mode
  if (process.argv.includes('--dev')) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }

  mainWindow.on('closed', () => { mainWindow = null; });
}

function createTray() {
  // Simple tray icon (16x16 circle)
  const icon = nativeImage.createFromDataURL(
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAAhklEQVQ4jWNgGAWkAkYGBob/DAwM/6mhgYmBgeE/FWxgYmD4z8DAsJ8aGpgZGP7/p4INzAwM/6lhAxMDw39q2MDEwPCfGjYwMTD8p4YNTF8YGP5TwwYmBoZfZNrAxMDwi0wbmBgYfpFpAxMDwy8ybWBiYPhFpg1MDAwMZNrAxAAALFkSvYMh1REAAAAASUVORK5CYII='
  );
  tray = new Tray(icon);
  const menu = Menu.buildFromTemplate([
    { label: 'Show / Hide', click: () => {
        if (mainWindow.isVisible()) mainWindow.hide();
        else mainWindow.show();
    }},
    { label: 'Always on Top', type: 'checkbox', checked: true,
      click: (item) => {
        isAlwaysOnTop = item.checked;
        mainWindow.setAlwaysOnTop(isAlwaysOnTop);
    }},
    { type: 'separator' },
    { label: 'Quit Pomo Float', click: () => app.quit() },
  ]);
  tray.setToolTip('Pomo Float');
  tray.setContextMenu(menu);
  tray.on('click', () => {
    if (mainWindow.isVisible()) mainWindow.focus();
    else mainWindow.show();
  });
}

// ── IPC handlers ─────────────────────────────────────────────────
ipcMain.on('window-drag', (_, { deltaX, deltaY }) => {
  if (!mainWindow) return;
  const [x, y] = mainWindow.getPosition();
  mainWindow.setPosition(x + deltaX, y + deltaY);
});

ipcMain.on('window-close',  () => app.quit());
ipcMain.on('window-hide',   () => mainWindow?.hide());
ipcMain.on('toggle-top',    (_, val) => mainWindow?.setAlwaysOnTop(val));
ipcMain.on('set-size',      (_, { w, h }) => mainWindow?.setSize(w, h));

// ── App lifecycle ────────────────────────────────────────────────
app.whenReady().then(() => {
  createWindow();
  createTray();
  app.on('activate', () => { if (!mainWindow) createWindow(); });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
