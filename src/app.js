/**
 * electron app main entry point
 */
const electron = require('electron');
// submodule :: application event lifecycle
const app = electron.app;
// submodule :: create and control browser windows
const BrowserWindow = electron.BrowserWindow;
// electron app window
let appWindow = null;

// electron onReady event
app.on('ready', () => {
  appWindow = new BrowserWindow({
    height: 500,
    width: 500
  });

  // manage app window closed event
  appWindow.on('closed', () => {
    console.log('electron app closed');
    appWindow = null;
  });
});
