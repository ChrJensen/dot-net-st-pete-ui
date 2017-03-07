# Beer Journal w/ Electron (March 7th, 2017)

## Step-Five

In this step, we will build out our Beer Journal app with React, interact with our api, store an access token, navigate with react-router, and communicate from the main to render process using IPC

# How we got here

## Add react-router and other required dependencies
```
npm install react-router classnames js-snackbar material-design-lite node-fetch --save
```

## Update npm scripts in package.json to use react-scripts
```javascript
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject",
    "electron": "electron ."
```

## Enhance our index.js to handle navigation and import vendor styles
 ```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory, Route } from 'react-router';
import './index.css';

import App from './App';
import BeerJournal from './BeerJournal';

// vendor styles
import 'material-design-lite/dist/material.brown-blue.min.css';
import 'material-design-lite/dist/material';
import 'js-snackbar/dist/snackbar.css';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    <Route path="beerJournal" component={BeerJournal}/>
  </Router>,
  document.getElementById('root')
);
 ```

## Update electron-app.js to store our access token, and interact with IPC. Let's also adjust our window size.
Adjust our window size
```javascript
appWindow = new BrowserWindow({
    height: 800,
    width: 1200,
    resizable: false
  });
```

Add ipcMain to imports
```javascript
const { app, BrowserWindow, Menu, ipcMain } = electron;
```

Import and initialize storage utilities
```javascript
// utility
const StorageUtility = require('./utility/storage.utility');

// init storage utility - future use
const storage = new StorageUtility({ configName: 'user-preferences', defaults: { access_token: null } });
```

Subscribe to events 
```javascript
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
```

## Enhance App/index.js to handle Login. Delete App/app.css and App/logo.svg
Update contents of [`src/App/index.js`](https://raw.githubusercontent.com/johnrhampton/dot-net-st-pete-ui/step-five/src/App/index.js?token=ADwMB1mVG4hXFREo8mcS6mk4S9UKMXM8ks5Yx2MuwA%3D%3D)

## Rename src/beer-journal => src/BeerJournal. Delete beer-journal.html
Update contents of [`src/BeerJournal/beer-journal.css`](https://raw.githubusercontent.com/johnrhampton/dot-net-st-pete-ui/step-five/src/BeerJournal/beer-journal.css?token=ADwMBzi7OYfWsCfdrQ5m7g67C5enrDBlks5Yx2OPwA%3D%3D)

Update contents of [`src/BeerJournal/index.js`](https://raw.githubusercontent.com/johnrhampton/dot-net-st-pete-ui/step-five/src/BeerJournal/index.js?token=ADwMB-YY0dtAxis7UUER3GkPqS5irPYgks5Yx2OvwA%3D%3D)

## Add endpoints and environment constants
Create [`src/constants/endpoints.js`](https://raw.githubusercontent.com/johnrhampton/dot-net-st-pete-ui/step-five/src/constants/endpoints.js?token=ADwMB14VVxP9_6v4RqF9s0L-pLIzDO2xks5Yx2P-wA%3D%3D)

Create [`src/constants/environment.js`](https://raw.githubusercontent.com/johnrhampton/dot-net-st-pete-ui/step-five/src/constants/environment.js?token=ADwMBzTyoBjt112xyT3ecNGtBRQATI6nks5Yx2QowA%3D%3D)

## Add Loading component
Create [`src/Loading/index.js`](https://raw.githubusercontent.com/johnrhampton/dot-net-st-pete-ui/step-five/src/Loading/index.js?token=ADwMB654EmcV8uKzxlX1YgLrbuQaSw6Aks5Yx2RlwA%3D%3D)

Create [`src/Loading/loading.css`](https://raw.githubusercontent.com/johnrhampton/dot-net-st-pete-ui/step-five/src/Loading/loading.css?token=ADwMB5GOslrWIrkEU9p699oNWeT4q_fCks5Yx2R7wA%3D%3D)

## Add Login component
Create and download [`src/Login/background.jpeg`](https://raw.githubusercontent.com/johnrhampton/dot-net-st-pete-ui/step-five/src/Login/background.jpeg?token=ADwMBzjx0_E-Ve5d1Wfqw0oEbpMFICHTks5Yx2TPwA%3D%3D)

Create [`src/Login/index.js`](https://raw.githubusercontent.com/johnrhampton/dot-net-st-pete-ui/step-five/src/Login/index.js?token=ADwMB7Hrl56X8jkLJdDefqtyFFdXafHLks5Yx2StwA%3D%3D)

Create [`src/Login/login.css`](https://raw.githubusercontent.com/johnrhampton/dot-net-st-pete-ui/step-five/src/Login/login.css?token=ADwMB6g2bYy-Ur_bTn-xWLwjnVaMDweJks5Yx2UDwA%3D%3D)

## Add fetch and storage utilties
Create [`src/utility/fetch.utility.js`](https://raw.githubusercontent.com/johnrhampton/dot-net-st-pete-ui/step-five/src/utility/fetch.utility.js?token=ADwMB95d2hU3NLUviNgXkeuFQsG2NUwsks5Yx2YKwA%3D%3D)

Create [`src/utility/storage.utility.js`](https://raw.githubusercontent.com/johnrhampton/dot-net-st-pete-ui/step-five/src/utility/storage.utility.js?token=ADwMB_Rl3u89qkCJCe4fvANs_pJ94Axjks5Yx2YkwA%3D%3D)

## Let's ensure Electron is up and running
`npm run start`

## Fire up .NET core api and mongo db @see [dot-net-st-pete-api](https://github.com/johnrhampton/dot-net-st-pete-api/blob/master/README.md)

## What's Missing?
* Packaging our app for deployment
* Using Electron libraries for http requests - we are using node-fetch
* Compile when changes are made to electron modules outside of our webpack bundle
* Creating our own fork of react-scripts specifically built for Electron
* Testing with mocha, chai, or any other preferred framework
* Redux for state management

