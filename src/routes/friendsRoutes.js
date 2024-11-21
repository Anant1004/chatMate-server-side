import express from 'express'
import {
    sendFriendRequest,
    getFriendRequests,
    acceptFriendRequest,
    declineFriendRequest,
    getFriendList
} from '../controllers/friendscontrollers.js'
const router = express.Router();

router.get('/getFriendRequests', getFriendRequests);
router.get('/getFriends',getFriendList);
router.post('/sendFriendRequest', sendFriendRequest);
router.put('/acceptReqest', acceptFriendRequest);
router.patch('/declineReqest', declineFriendRequest);


export default router