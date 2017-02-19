/**
 * electron app main entry point
 *
 * submodules
 *  app :: manage application event lifecycle
 *  BrowserWindow :: create and control browser windows
 *  Menu :: create native application menus and context menus
 */
const electron = require('electron');
const { app, BrowserWindow, Menu } = electron;
// menu template
const menuTemplate = require('./app-menu');
// electron app window
let appWindow = null;

// electron onReady event
app.on('ready', () => {
  // instantiate browser window
  appWindow = new BrowserWindow({
    height: 500,
    width: 500
  });

  // build application menu
  Menu.setApplicationMenu(
    Menu.buildFromTemplate(menuTemplate)
  );

  // load the main view using the file protocol
  // we have access to the file system as we are running on the local OS
  appWindow.loadURL(`file://${__dirname}/beer-journal/beer-journal.html`);

  // manage app window closed event
  appWindow.on('closed', () => {
    console.log('electron app closed');
    appWindow = null;
  });
});
