import FriendRequest from '../models/friendsrequestModel.js';
import User from '../models/userModel.js';

// send a friend request
const sendFriendRequest = async (req, res) => {
    try {
        const { ReceiverUserName } = req.body;
        const receiver=await User.findOne({username: ReceiverUserName});
        if(!receiver){
            res.status(400).json({ message: `userName with ${ReceiverUserName} does not exist.` });
        }
        if(receiver._id===req.user._id){
            res.status(400).json({ message: 'cannot send a friend request to yourself.' });
        }
        const senderId = req.user._id;
        const newFriendRequest = await FriendRequest.create({ sender: senderId, receiver: receiver._id });
        await receiver.updateOne({$push:{friendRequests:newFriendRequest}});
        res.status(201).json(newFriendRequest);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// get friend requests
const getFriendRequests = async (req, res) => {
    try {
        const friendRequests = await FriendRequest.find({ receiver: req.user._id, status: 'pending' });
        res.json(friendRequests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// update friend request status
const updateFriendRequestStatus = async (req, res) => {
    const { status } = req.body;
    try {
        const updatedRequest = await FriendRequest.findByIdAndUpdate(
            req.params.requestId,
            { status },
            { new: true }
        );
        res.json(updatedRequest);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export  {
    sendFriendRequest,
    getFriendRequests,
    updateFriendRequestStatus
}