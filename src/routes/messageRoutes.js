import express from 'express';
import { sendMessage, getMessagesWithUser, markMessageAsRead } from '../controllers/messageControllers.js';

const router = express.Router();


router.post('/user', sendMessage);
router.get('/user/:userId', getMessagesWithUser);
router.put('/:messageId/read', markMessageAsRead);

export default router;
