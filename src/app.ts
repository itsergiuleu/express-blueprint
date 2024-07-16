require('dotenv').config()

import express from 'express';
import middlewareConfig from './config/middleware';
import errorHandlerConfig from './config/error-handler';
import mainRouter from './routes/MainRouter';

const app = express();
middlewareConfig(app);

mainRouter(app);

errorHandlerConfig(app);

module.exports = app;
