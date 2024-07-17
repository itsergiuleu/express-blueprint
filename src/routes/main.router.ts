import { Express } from "express";
import homeRouter from '../health/routes/router'

export default (app: Express) => {
    app.use("/", homeRouter);
};
