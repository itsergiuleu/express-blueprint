require('dotenv').config()

import express, { Express } from 'express';
import middlewareConfig from './config/middleware';
import errorHandlerConfig from './config/error-handler';
import mainRouter from './routes/MainRouter';

const app: Express = express();
middlewareConfig(app);

mainRouter(app);

errorHandlerConfig(app);

export default app;
