const electron = require('electron');
// submodule :: application event lifecycle
const app = electron.app;

// retrieve product name from package.json
// OS X convention to use this as main menu item
// not viewable in dev mode - will always say Electron
const productName = electron.app.getName();

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
