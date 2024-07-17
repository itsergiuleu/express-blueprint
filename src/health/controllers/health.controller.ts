import {Request, Response} from "express";

export class HealthController {
    private static readonly _instance: HealthController = new HealthController();

    static getInstance(): HealthController {
        return HealthController._instance;
    }

    async getHealthCheck(req: Request, res: Response) {
        res.end("Application is up and running");
    }
}
