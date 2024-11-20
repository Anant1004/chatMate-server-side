import express from 'express';
import { sendMessage, getMessagesWithUser, setReadBy } from '../controllers/messageControllers.js';

const router = express.Router();


router.post('/sendMessage', sendMessage);
router.get('/getMessages/:userId', getMessagesWithUser);
router.post('/setReadBy', setReadBy);

export default router;
