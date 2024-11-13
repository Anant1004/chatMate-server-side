import express from 'express'
import {
    sendFriendRequest,
    getFriendRequests,
    updateFriendRequestStatus
} from '../controllers/friendscontrollers.js'
const router = express.Router();

router.get('/', getFriendRequests);
router.post('/', sendFriendRequest);
router.put('/:requestId', updateFriendRequestStatus);


export default router