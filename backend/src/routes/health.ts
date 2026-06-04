import { Router } from 'express';
import { getHealth } from '../controllers/healthController';

const router = Router();

// Mounted at /health in index.ts, so this handles GET /health.
router.get('/', getHealth);

export default router;
