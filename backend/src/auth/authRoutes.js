//import { createUser } from './users.js';
import express from 'express';
import { requireAuth, checkUserIsAdmin } from '../middlewares/auth.js';
import { register, login } from '../auth/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/admin', requireAuth, checkUserIsAdmin, (req, res) => {
  res.status(200).json({ message: 'Admin route' });
});

export default router;
