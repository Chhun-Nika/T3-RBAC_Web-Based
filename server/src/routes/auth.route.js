import express from 'express';
import { login } from '../controllers/auth.controller.js'
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);



export default router;