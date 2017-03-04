/**
 * waits for webpack-dev-server to fire up and then starts up electron
 */
const net = require('net');
// foreman starts each job as its own process and offsets the port by 100
// subtract 100 from the PORT to ensure that we stay in sync
// https://github.com/strongloop/node-foreman#advanced-usage
const port = process.env.PORT ? (process.env.PORT - 100) : 3000;
// we use this during the dev process to connect to webpack-dev-server
process.env.WEBPACK_DEV_SERVER = `http://localhost:${port}`;
// create new socket
const socket = new net.Socket();
let startedElectron = false;

/**
 * connect to webpack-dev-server
 */
const connectWebpackDevServer = () => {
  socket.connect({ port: port }, () => {
      socket.end();

      if (!startedElectron) {
        // successful connection
        console.log('Starting Electron');
        startedElectron = true;
        // run electron script
        const exec = require('child_process').exec;
        exec('npm run electron');
      }
    }
  );
};

// attempt to connect to webpack-dev-server
connectWebpackDevServer();

/**
 * handle error when connecting to client
 *  if error occurs, wait and try again
 */
socket.on('error', (error) => {
  setTimeout(connectWebpackDevServer, 300);
});
