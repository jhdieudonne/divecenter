import * as http from 'http';
import * as debug from 'debug';

/**
 *  init global parameters
 */
global.rootDir = require('app-root-path');
global.config = require('konfig')({path: process.env.CONFIG || (global.rootDir + '/config')});



import App from './App';
debug('ts-express:server');

const port_API = normalizePort(process.env.PORT || global.config.app.port);

App.set('port', port_API);
const server = http.createServer(App);
server.listen(port_API);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val: number | string): number | string | boolean {
    const myPort: number = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(myPort)) {
        return val;
    } else if (myPort >= 0) {
        return myPort;
    } else {
        return false;
    }
}

function onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = (typeof port_API === 'string') ? 'Pipe ' + port_API : 'Port ' + port_API;
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening(): void {
    const addr = server.address();
    const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
}
