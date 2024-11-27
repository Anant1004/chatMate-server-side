import Message from '../models/messageModel.js';
import User from '../models/userModel.js';

// send a friend request
const sendFriendRequest = async (req, res) => {
    try {
        const { ReceiverUserId } = req.body;
        console.log("backend recived", ReceiverUserId);
        if (!ReceiverUserId) {
            return res.status(400).json({ message: 'Receiver username is required.' });
        }
        const sender = req.user;
        if (ReceiverUserId === sender.userName) {
            return res.status(400).json({ message: 'Cannot send a friend request to yourself.' });
        }
        const receiver = await User.findOne({ _id: ReceiverUserId }).select('-password');
        console.log("this is the reciver", receiver)
        if (!receiver) {
            return res.status(400).json({ message: `User with username ${ReceiverUserId} does not exist.` });
        }
        if (receiver.friends.includes(sender._id)) {
            return res.status(400).json({ message: 'User is already a friend.' });
        }
        if (receiver.friendRequests.includes(sender._id)) {
            return res.status(400).json({ message: 'Friend request already sent to this user.' });
        }
        await User.findByIdAndUpdate(receiver._id, { $push: { friendRequests: sender._id } });
        res.status(201).json({ message: 'Friend request sent successfully.', sender: sender, receiver: receiver });
    } catch (error) {
        console.log('Error while sending friend request : ', error);
        res.status(500).json({ error: error.message });
    }
};

// get friend requests
const getFriendRequests = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        res.json(user);
    } catch (error) {
        console.log('Error while fetching friend requests', error);
        res.status(500).json({ error: error.message });
    }
};

// Accept friend request

const acceptFriendRequest = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ message: 'Username is required.' });
        }
        const sender = await User.findOne({ _id: userId }).select('-password');
        if (!sender) {
            return res.status(400).json({ message: `User with username ${userId} does not exist.` });
        }
        const user = req.user;
        if (user.friends.includes(sender._id)) {
            return res.status(400).json({ message: 'User is already a friend.' });
        }
        if (!user.friendRequests.includes(sender._id)) {
            return res.status(400).json({ message: 'Friend request not found.' });
        }
        const requests = user.friendRequests.filter(id => id.toString() !== sender._id.toString());
        const newChat = new Message({
            text: []
        });
        newChat.save();
        await User.findByIdAndUpdate(user._id, {
            $push: {
                friends: sender._id,
                chats: { chatWith: sender.userName, messages: newChat._id }
            },
            $set: { friendRequests: requests },
        });
        await User.findByIdAndUpdate(sender._id, {
            $push: {
                friends: user._id,
                chats: { chatWith: user.userName, messages: newChat._id }
            },
        });
        res.status(200).json({ message: 'Friend request accepted.' });
    } catch (error) {
        console.log('Error while accepting friend request : ', error);
        res.status(500).json({ error: error.message });
    }
}

// Decline friend request

const declineFriendRequest = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ message: 'userId is required.' });
        }
        const sender = await User.findOne({ _id: userId }).select('-password');
        if (!sender) {
            return res.status(400).json({ message: `User with username ${userId} does not exist.` });
        }
        const user = req.user;
        if (!user.friendRequests.includes(sender._id)) {
            return res.status(400).json({ message: 'Friend request not found.' });
        }
        const requests = user.friendRequests.filter(id => id.toString() !== sender._id.toString());
        await User.findByIdAndUpdate(user._id, {
            $set: { friendRequests: requests },
        });
        res.status(200).json({ message: 'Friend request declined.' });
    } catch (error) {
        console.log('Error while declining friend request : ', error);
        res.status(500).json({ error: error.message });
    }
}

// Get all friends list

const getFriendList = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        res.status(200).json(user.friends);
    } catch (error) {
        console.log('Error while fetching friends', error);
        res.status(500).json({ error: error.message });
    }
}

export {
    sendFriendRequest,
    getFriendRequests,
    acceptFriendRequest,
    declineFriendRequest,
    getFriendList
}