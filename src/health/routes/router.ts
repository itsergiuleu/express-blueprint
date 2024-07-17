import { Router } from 'express';
import expressAsyncHandler from "express-async-handler";
import {HealthController} from "../controllers/health.controller";

const router: Router = Router();

router.get('/health-check', expressAsyncHandler(HealthController.getInstance().getHealthCheck));

export default router;

