const electron = require('electron');

// retrieve product name from package.json
// OS X convention to use this as main menu item
// not viewable in dev mode - will always say Electron
const productName = electron.app.getName();

// export menu template
module.exports = [
  {
    label: productName,
    submenu: [
      { label: `About ${productName}` }
    ]
  }
];
