import {Request, Response, Router} from 'express';

const router: Router = Router();

router.get('/health-check', (req: Request, res: Response) => {
    res.end(`Up and running environment!`);
});

export default router;

