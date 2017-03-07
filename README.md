# Beer Journal w/ Electron (March 7th, 2017)

## Step-Two

In this step, we will add a Menu with About (macOS only) and Quit options

# How we got here

## Create a module to export our Menu - `src/app-menu.js`
```javascript
const electron = require('electron');
// submodule :: application event lifecycle
const { app } = electron;

// retrieve product name from package.json
// OS X convention to use this as main menu item
// not viewable in dev mode - will always say Electron
const productName = app.getName();

// export menu template
module.exports = [
  {
    label: productName,
    submenu: [
      {
        label: `About ${productName}`,
        // add logic based on role :: http://electron.atom.io/docs/api/menu-item/
        // when role is specified on macOS, all other options are ignored
        // about is macOS only
        role: 'about'
      },
      // add a horizontal separator
      {
        type: 'separator'
      },
      // add a quit button w/ keyboard shorcut
      {
        label: `Quit ${productName}`,
        click: () => app.quit(),
        accelerator: 'Cmd+Q'
      }
    ]
  }
];
```

## Add a productName attribute to package.json
`"productName": "Beer Journal",`

This allows `app.getName()` to return the name of our app

## Update app.js to display our Menu
```javascript
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
```

## Let's ensure Electron is up and running
`npm run start`

Notice we don't see our same set of development Menu options we did in step-one, so we can't open our Dev Tools.  Have no fear, Electron has us covered!  We will add that ability back in a later step.

[Continue to Step 3](https://github.com/johnrhampton/dot-net-st-pete-ui/tree/step-three)


