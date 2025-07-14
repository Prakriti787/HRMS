import express from 'express';
import {
  registerUser,
  loginUser,
  changePassword,
  getLoggedInUser
} from '../controllers/authController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', protect, authorizeRoles('admin'), registerUser);
router.post('/login', loginUser);
router.post('/change-password', protect, changePassword);
router.get('/users/me', protect, getLoggedInUser);

export default router;
