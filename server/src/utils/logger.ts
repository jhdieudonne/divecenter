const winston = require('winston');
const fs = require('fs-extra');
require('winston-daily-rotate-file');

/**
 * Define and configure the logger
 */
namespace Logger {

    const tsFormat = () => ( new Date() ).toLocaleDateString() + ' - ' + ( new Date() ).toLocaleTimeString();

    // Define transports
    const consoleTransport = new (winston.transports.Console)({
        'timestamp': tsFormat,
        'handleExceptions': false,
        'json': false,
        'colorize': true,
        'level': global.config.app.log.console.logLevel
    });

    const fileTransport = new winston.transports.DailyRotateFile({
        'timestamp': tsFormat,
        'json': false,
        'filename': global.config.app.log.file.path + '/' + global.config.app.log.file.filename,
        'datePattern': 'yyyy-MM-dd.',
        'prepend': true,
        'maxsize': global.config.app.log.file.maxsize,
        'maxFiles': global.config.app.log.file.maxDays,
        'zippedArchive': global.config.app.log.file.zippedArchive,
        'maxDays': global.config.app.log.file.maxDays,
        'level': global.config.app.log.file.logLevel
    });
    // create logs folder if not exist
    fs.ensureDirSync(global.config.app.log.file.path);

      // Define loggers
    const defaultLogger = new (winston.Logger)({
        exitOnError: false,
        level: 'debug',
        'transports': [
            consoleTransport,
            fileTransport
        ]
    });

    const withoutKibanaLogger = new (winston.Logger)({
        exitOnError: false,
        level: 'debug',
        'transports': [
            consoleTransport,
            fileTransport
        ]
    });

    // Handling uncaught exceptions
    winston.handleExceptions(consoleTransport, fileTransport);

    /**
     * Formating output function
     */
    function formatingMessage(message: any, req?: any): any {
        if (req) {
            let myIP;
            if (req.session && req.session.userIp) {
                if (req.session.userIp.substr(0, 7) === '::ffff:') {
                    myIP = req.session.userIp.substr(7)
                } else {
                    myIP = req.session.userIp;
                }
            }
            return {
                timestamp: Date.now(),
                server: process.platform === 'win32' ? process.env.COMPUTERNAME : process.env.HOSTNAME,
                sessionId: req.sessionID,
                requestId: req.id,
                dealerId: ((req.session) && (req.session.dealerId)) ? req.session.dealerId.id : undefined,
                login: ((req.session) && (req.session.user)) ? req.session.user.username : undefined,
                userIp: myIP,
                content: message
            };


        } else {
            return {
                timestamp: Date.now(),
                server: process.platform === 'win32' ? process.env.COMPUTERNAME : process.env.HOSTNAME,
                sessionId: undefined,
                requestId: undefined,
                content: message
            };
        }
    }

    //  Default logger
    export function log(level: string, message: any, req?: any) {
        if (level === 'debug') {
            defaultLogger.debug(formatingMessage(message, req));
        } else if (level === 'info') {
            defaultLogger.info(formatingMessage(message, req));
        } else if (level === 'warn') {
            defaultLogger.warn(formatingMessage(message, req));
        } else if (level === 'error') {
            defaultLogger.error(formatingMessage(message, req));
        }
    }

    export function debug(message: any, req?: any) {
        defaultLogger.debug(formatingMessage(message, req));
    }

    export function info(message: any, req?: any) {
        defaultLogger.info(formatingMessage(message, req));
    }


    export function warn(message: any, req?: any) {
        defaultLogger.warn(formatingMessage(message, req));
    }

    export function error(message: any, req?: any) {
        defaultLogger.error(formatingMessage(message, req));
    }

    // Without Kibana logger
    export function logWithoutKibana(level: string, message: any, req?: any) {
        if (level === 'debug') {
            withoutKibanaLogger.debug(formatingMessage(message, req));
        } else if (level === 'info') {
            withoutKibanaLogger.info(formatingMessage(message, req));
        } else if (level === 'warn') {
            withoutKibanaLogger.warn(formatingMessage(message, req));
        } else if (level === 'error') {
            withoutKibanaLogger.error(formatingMessage(message, req));
        }
    }

    export function debugWithoutKibana(message: any, req?: any) {
        withoutKibanaLogger.debug(formatingMessage(message, req));
    }

    export function infoWithoutKibana(message: any, req?: any) {
        withoutKibanaLogger.info(formatingMessage(message, req));
    }

    export function warnWithoutKibana(message: any, req?: any) {
        withoutKibanaLogger.warn(formatingMessage(message, req));
    }

    export function errorWithoutKibana(message: any, req?: any) {
        withoutKibanaLogger.error(formatingMessage(message, req));
    }
}

export default Logger;
