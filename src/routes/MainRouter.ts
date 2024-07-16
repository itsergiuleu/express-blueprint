import homeRouter from "./HealthCheckRouter";
import { Express } from "express";

export default (app: Express) => {
    app.use("/", homeRouter);
};
