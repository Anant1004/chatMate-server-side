import express from 'express';
import { createGroup, getGroupDetails, sendMessageToGroup, getGroupMessages } from '../controllers/groupController.js';

const router = express.Router();

router.post('/', createGroup);
router.get('/:groupId', getGroupDetails);
router.post('/message', sendMessageToGroup);
router.get('/message/:groupId', getGroupMessages);

export default router;
