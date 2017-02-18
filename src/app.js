/**
 * electron app main entry point
 */
const electron = require('electron');
// submodule :: application event lifecycle
const app = electron.app;
// submodule :: create and control browser windows
const BrowserWindow = electron.BrowserWindow;

// electron onReady event
app.on('ready', () => {
  new BrowserWindow({
    height: 500,
    width: 500
  });
});
