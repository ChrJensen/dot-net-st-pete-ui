/**
 * electron app main entry point
 *
 * submodules
 *  app :: manage application event lifecycle
 *  BrowserWindow :: create and control browser windows
 *  Menu :: create native application menus and context menus
 */
const electron = require('electron');
const { app, BrowserWindow, Menu, ipcMain } = electron;
// node
const path = require('path');
const url = require('url');
// menu template
const menuTemplate = require('./electron-app-menu');
// electron app window
let appWindow = null;
// utility
const StorageUtility = require('./utility/storage.utility');
// init storage utility - future use
const storage = new StorageUtility({ configName: 'user-preferences', defaults: { access_token: null } });

// electron onReady event
app.on('ready', () => {
  // instantiate browser window
  appWindow = new BrowserWindow({
    height: 800,
    width: 1200,
    resizable: false
  });

  // build application menu
  Menu.setApplicationMenu(
    Menu.buildFromTemplate(menuTemplate)
  );

  // allows for local dev to point to localhost:3000 - set in ./config/start-electron
  // allows production builds to point to electron app bundle
  const loadURL = process.env.WEBPACK_DEV_SERVER || url.format({
      pathname: path.join(__dirname, '/../build/index.html'),
      protocol: 'file:',
      slashes: true
    });

  // load the main view using the file protocol
  // we have access to the file system as we are running on the local OS
  appWindow.loadURL(loadURL);

  // if we are not in production, open the devtools
  if (process.env.NODE_ENV !== 'production') {
    appWindow.webContents.openDevTools();
  }

  // manage app window closed event
  appWindow.on('closed', () => {
    appWindow = null;
  });
});

// handle all windows are closed event
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// handle storing user data
ipcMain.on('login-successful', (event, arg) => {
  storage.set('access_token', arg);
});

// handle logout request
ipcMain.on('request-logout', () => {
  storage.set('access_token', null);
});

// listen for access_token requests
ipcMain.on('request-access-token', (event) => {
  event.returnValue = storage.get('access_token');
});
