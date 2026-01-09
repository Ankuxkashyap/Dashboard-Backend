import express from 'express';
import {register, login,logout ,getProfile} from '../controller/User.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', register);
router.get('/profile', authMiddleware, getProfile);
router.post('/login', login);
router.get('/logout', logout);

export default router;
