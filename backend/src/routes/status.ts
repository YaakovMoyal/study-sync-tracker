import { Router } from 'express';
import { getAppStatus } from '../controllers/statusController';

const router = Router();

// Mounted at /status in index.ts, so this handles GET /status/app.
router.get('/app', getAppStatus);

export default router;
