import { Router } from 'express';
import { getApps, addApp, approveApp } from '../controllers/appsController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, getApps);
router.post('/', authenticate, addApp);
router.post('/:id/approve', authenticate, approveApp);

export default router;
