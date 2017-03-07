# Beer Journal w/ Electron (March 7th, 2017)

## Step-Three

In this step, we will add demonstrate how to add react-scripts and present a basic React application

# How we got here

## Add react and react-scripts dependencies
```
npm install react react-dom --save
npm install react-scripts --save-dev
```

## Update npm scripts in package.json to use react-scripts
```javascript
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject",
    "electron": "electron ."
```

## Rename app.js, app-menu.js, and update main attribute in package.json
 ```
 "main": "src/electron-app.js",
 ```
 Rename `app.js` => `electron-app.js`
 
 Rename `app-menu.js` => `electron-app-menu.js`

## Update app.js 
load localhost:3000 - this is where webpack-dev-server is hosting our app
```javascript
appWindow.loadURL('http://localhost:3000');
```

open dev tools if not in production mode
```javascript
  // if we are not in production, open the devtools
  if (process.env.NODE_ENV !== 'production') {
    appWindow.webContents.openDevTools();
  }
```

handle all windows closed event
```javascript
// handle all windows are closed event
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
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


