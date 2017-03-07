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

## Add public directory
Create [`public/index.html`](https://raw.githubusercontent.com/johnrhampton/dot-net-st-pete-ui/step-three/public/index.html?token=ADwMB3tc1n_g6preCBr6DQkoptroSNhwks5Yx1YuwA%3D%3D)

## Add React app entry point
Create [`src/index.js`](https://raw.githubusercontent.com/johnrhampton/dot-net-st-pete-ui/step-three/src/index.js?token=ADwMBzfdKbwXxfHpWkvT4uBB6CM9lsLJks5Yx1aQwA%3D%3D)

Create [`src/index.css`](https://raw.githubusercontent.com/johnrhampton/dot-net-st-pete-ui/step-three/src/index.css?token=ADwMB8ERYWIomwvf-JNqpNagMc9zctcRks5Yx1a6wA%3D%3D)

## Add App component
Create [`src/App/app.css`](https://raw.githubusercontent.com/johnrhampton/dot-net-st-pete-ui/step-three/src/App/app.css?token=ADwMBzX3YoGGFvBzAS4x4X3egUWK0pb6ks5Yx1cEwA%3D%3D)

Create [`src/App/index.js`](https://raw.githubusercontent.com/johnrhampton/dot-net-st-pete-ui/step-three/src/App/index.js?token=ADwMBxrxghGoraah0t9o1RdqXZsN_ff7ks5Yx1cYwA%3D%3D)

Create [`src/App/logo.svg`](https://raw.githubusercontent.com/johnrhampton/dot-net-st-pete-ui/step-three/src/App/logo.svg?token=ADwMB8uIsI3L5UIp4dUr5a3PoVdeLUygks5Yx1cmwA%3D%3D)

## Let's ensure Electron is up and running
`npm run start`

Wait - Do What! Our app opened in a browser!  This is react-scripts doing it's thing and firing up webpack-dev-server / opening the browser.  

Let's open a new terminal window and run `npm run electron`

We should now see our new React app open up within Electron, and our Dev Tools are back!

If we make a change to our app - we will see Electron refresh as expected

Pretty cool - we can now use React and react-scripts within our Electron app!

[Continue to Step 4](https://github.com/johnrhampton/dot-net-st-pete-ui/tree/step-four)


