import express from 'express'
import {
    sendFriendRequest,
    getFriendRequests,
    acceptFriendRequest,
    declineFriendRequest
} from '../controllers/friendscontrollers.js'
const router = express.Router();

router.get('/', getFriendRequests);
router.post('/', sendFriendRequest);
router.put('/acceptReqest', acceptFriendRequest);
router.patch('/declineReqest', declineFriendRequest);


export default router