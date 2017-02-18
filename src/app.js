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
  // instantiate browser window
  appWindow = new BrowserWindow({
    height: 500,
    width: 500
  });

  // load the main view using the file protocol
  // we have access to the file system as we are running on the local OS
  appWindow.loadURL(`file://${__dirname}/beer-journal/index.html`);

  // manage app window closed event
  appWindow.on('closed', () => {
    console.log('electron app closed');
    appWindow = null;
  });
});
