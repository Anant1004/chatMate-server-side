import FriendRequest from '../models/friendsrequestModel.js';

// send a friend request
const sendFriendRequest = async (req, res) => {
    const { receiverId } = req.body;
    console.log(req.user._id)
    const senderId = req.user._id;
    try {
        const friendRequest = await FriendRequest.create({ sender: senderId, receiver: receiverId });
        res.status(201).json(friendRequest);
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