# Beer Journal w/ Electron (March 7th, 2017)

## Step-One

In this step, we will initialize our basic Electron app, display some data, and see how easy it is to debug!

# How we got here

## Update our start script to start Electron
`"start": "electron .",`

## Update app.js to bootstrap Electron
```javascript
/**
 * electron app main entry point
 *
 * submodules
 *  app :: manage application event lifecycle
 *  BrowserWindow :: create and control browser windows
 */
const electron = require('electron');
const { app, BrowserWindow } = electron;
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
  appWindow.loadURL(`file://${__dirname}/beer-journal/beer-journal.html`);

  // manage app window closed event
  appWindow.on('closed', () => {
    console.log('electron app closed');
    appWindow = null;
  });
});
```

## Add a beer journal feature
Create [`src/beer-journal/beer-journal.css`](https://raw.githubusercontent.com/johnrhampton/dot-net-st-pete-ui/step-one/src/beer-journal/beer-journal.css?token=ADwMBz_Flz9PCeEK3kZ7pfcchu1KmdSlks5Yx0w1wA%3D%3D)

Create [`src/beer-journal/beer-journal.html`](https://raw.githubusercontent.com/johnrhampton/dot-net-st-pete-ui/step-one/src/beer-journal/beer-journal.html?token=ADwMB2fQrG362nbLLHJtrhwrRg3-Dg-vks5Yx0xgwA%3D%3D)

Create [`src/beer-journal/index.js`](https://raw.githubusercontent.com/johnrhampton/dot-net-st-pete-ui/step-one/src/beer-journal/index.js?token=ADwMB-kgUJDjDtL8kv20QCYjttV3vy4Eks5Yx0x-wA%3D%3D)

## Let's ensure Electron is up and running
`npm run start`

Notice we don't see our console.log in the terminal - open Dev Tools (CMD + OPT + I) and look at the console!  Our beer-journal feature is a `renderer process`!

[Continue to Step 2](https://github.com/johnrhampton/dot-net-st-pete-ui/tree/step-two)


