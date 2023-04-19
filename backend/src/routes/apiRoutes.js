import express from 'express';
const router = express.Router();
import { requireAdmin, requireAuth, loginRoute } from '../middlewares/auth.js';
import catchErrors from '../middlewares/catchError.js';

import * as userController from '../middlewares/users.js';

function indexRoute(req, res) {
  return res.json({
    users: {
      users: '/users',
      user: '/users/{id}',
      register: '/users/register',
      login: '/users/login',
      me: '/users/me',
    },
  });
}

router.get('/', indexRoute);

router.get('/users', requireAdmin, catchErrors(userController.listUsers));
router.get('/users/me', requireAuth, catchErrors(userController.currentUser));
router.patch('/users/me', requireAuth, catchErrors(userController.updateCurrentUser));
router.get('/users/:id', requireAdmin, catchErrors(userController.listUser));
router.patch('/users/:id', requireAdmin, catchErrors(userController.updateUserRoute));
router.post('/auth/login', catchErrors(loginRoute));

export default router;
