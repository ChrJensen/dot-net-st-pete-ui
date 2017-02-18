const electron = require('electron');
// import electron package submodule 'app'
const app = electron.app;

// electron onReady event
app.on('ready', () => {
  console.log('electron ready');
});
