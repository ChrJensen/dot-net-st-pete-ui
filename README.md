# Beer Journal w/ Electron (March 7th, 2017)

## Step-Four

In this step, we will do some house cleaning for our dev process.  This includes using a custom react-scripts, extending our loadUrl to account for production builds and local dev, and adding a process management tool

# How we got here

## Add custom-react-scripts dependency
```
npm uninstall react-scripts --save-dev
npm install custom-react-scripts --save-dev
```

## Add foreman to manage react and electron process @see [node-foreman](https://github.com/strongloop/node-foreman)
```
npm install foreman --save
```

## Update npm scripts in package.json to take advantage of our process manager - we also no longer open the browser
```javascript
    "start": "nf start -p 3000",
    "start-react": "OPEN_BROWSER=false react-scripts start",
    "start-electron": "node config/start-electron",
    "electron": "electron .",
```

## Update homepage attribute to account for relative path @see [building for relative paths](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#building-for-relative-paths)
`"homepage": "./",`

## Add config directory, and start-electron module
Create [`config/start-electron.js`](https://raw.githubusercontent.com/johnrhampton/dot-net-st-pete-ui/step-four/config/start-electron.js?token=ADwMB_fWNDwdlde42HXusWy6LGrF1QOKks5Yx1s7wA%3D%3D)

## Add Profile to tell foreman what to do 
Create [`Procfile`](https://raw.githubusercontent.com/johnrhampton/dot-net-st-pete-ui/step-four/Procfile?token=ADwMBwnVGZTD53k-9HWVjux_Nk4WQiBwks5Yx1wpwA%3D%3D)

Our Procfile file tells foreman to create two processes. Once the react process is finished, we start the electron process.
```javascript
react: npm run start-react
electron: npm run start-electron
```

## Update electron-app module to account for local dev and production builds
```javascript
  // allows for local dev to point to localhost:3000 - set in ./config/start-electron
  // allows production builds to point to electron app bundle
  const loadURL = process.env.WEBPACK_DEV_SERVER || url.format({
      pathname: path.join(__dirname, '/../build/index.html'),
      protocol: 'file:',
      slashes: true
    });

  // load the main view using the file protocol
  // we have access to the file system as we are running on the local OS
  appWindow.loadURL(loadURL);
```

## Let's ensure Electron is up and running
`npm run start`

In the terminal window, we see foreman logging our process name and the corresponding output. Also notice, we no longer see the app open in the browser - just our electron app opens!

[Continue to Step 5](https://github.com/johnrhampton/dot-net-st-pete-ui/tree/step-five)


