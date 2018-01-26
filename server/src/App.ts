import * as express from 'express';
import {NextFunction, Request, Response} from 'express';
import Logger from './utils/logger';

import api from './routes/api';

const addRequestId = require('express-request-id')();
const winston = require('winston');
const cors = require('cors');
const helmet = require('helmet');
const router = express.Router();
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
// import {RequestLogger} from './middlewares/requestLogger';
// import {Security} from './middlewares/security';

/**
 * Creates and configures an ExpressJS web server.
 */
class App {

    // ref to Express instance
    public express: express.Application;

    /**
     * Run configuration methods on the Express instance.
     */
    constructor() {
        this.express = express();

        this.middleware();

        this.routes();
    }

    /**
     * Configure Express middleware.
     */
    private middleware(): void {

        // security middleware
        this.express.use(helmet());
        // TODO : review session security params
        const sessionOptions = {
            secret: global.config.app.secret,
            name: 'sessionId',
            resave: false,
            saveUninitialized: true,
            cookie: {
                httpOnly: true            }
        };
        this.express.use(session(sessionOptions));

        // configure CORS
        // TODO : review cors security params
        const optionsCors = {
            'credentials': true,
            'origin': global.config.app.cors.origin,
            'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
            'preflightContinue': false,
            'optionsSuccessStatus': 204
        };
        this.express.use(cors(optionsCors));

        // Configure bodyParser middleware
        this.express.use(bodyParser.json({limit: '2mb'}));
        this.express.use(bodyParser.urlencoded({limit: '2mb', extended: true}));

        // Add a requestId (for logging purpose)
        this.express.use(addRequestId);

        // // Configure logger middleware
        // this.express.use(new RequestLogger().middleware());

        // // validate session / right access
        // this.express.use(new Security().middleware());
    }

    /**
     * Configure API endpoints.
     */
    private routes(): void {

        this.express.use('/api', api);

        /** GET /health-check - Check service health */
        this.express.get('/health-check', (req, res) =>
            res.send('OK')
        );

        this.express.use('/', express.static(global.rootDir + '/dist/client/'));


        // Handling error 500
        this.express.use(function (err: any, req: Request, res: Response, next: NextFunction) {
                res.status(500).json({acknowledge: {status: 'KO', message: err.stack}});
            }
        );

        // Handling error 404
        this.express.use(function (req: Request, res: Response, next: NextFunction) {
                res.status(404).json({acknowledge: {status: 'KO', message: 'Page does not exist'}});
            }
        );
    }
}

export default new App().express;
