import cors from 'cors';
import morganBody from 'morgan-body';
import compression from 'compression';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import httpContext from 'express-http-context';
import { attachReqIdMiddleware } from "./request-trace";
import logger from "./logger";
import db from "./db/db-config";

const isProd = process.env.ENVIRONMENT === 'prod';

export default (app) => {
    app.use(cors());
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        );
        next();
    });

    if (isProd) {
        app.use(compression());
        app.use(helmet());
    }

    app.use(
        bodyParser.json({
            limit: "30mb",
            verify: (req, res, buf) => {
                // @ts-ignore
                req.rawBody = buf;
            },
        }),
    );
    app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
    app.use(httpContext.middleware);
    app.use(attachReqIdMiddleware);
    // app.use(require('./db/trx-support')({sequelize: db}))

    morganBody(app, {
        noColors: true,
        logIP: true,
        logReqDateTime: false,
        maxBodyLength: 5000,
        prettify: false,
        stream: {
            write: message => {
                logger.info(message);
                return true;
            }
        }
    });
};
