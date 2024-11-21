import express from 'express';
import { sendMessage, getMessagesWithUser, setReadBy,getGroupMessages } from '../controllers/messageControllers.js';

const router = express.Router();


router.post('/sendMessage', sendMessage);
router.get('/getUserMessages/:userId', getMessagesWithUser);
router.get('/getGroupMessages/:groupId', getGroupMessages);
router.post('/setReadBy', setReadBy);

export default router;
