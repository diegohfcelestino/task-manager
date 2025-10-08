import { Router } from 'express';
import { taskRoutes } from './tasks.routes.js';
import { userRoutes } from './users.routes.js';
const router = Router();
router.use('/users', userRoutes);
router.use('/tasks', taskRoutes);
export { router };
