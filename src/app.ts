require('dotenv').config()

import express, { Express } from 'express';
import middlewareConfig from './config/middleware';
import { errorHandler } from "./middleware/generic-error-handler.middleware";
import mainRouter from './routes/main.router';

const app: Express = express();
middlewareConfig(app);

mainRouter(app);

app.use(errorHandler);

export default app;
