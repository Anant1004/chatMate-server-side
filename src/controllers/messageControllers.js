import Group from '../models/groupModel.js';
import Message from '../models/messageModel.js';
import User from '../models/userModel.js';

// Send Message to User
const sendMessage = async (req, res) => {
    try {
        const { targetUser, targetGroupId, text } = req.body; // either targetUser or targetGroup should be sent from frontend
        if (targetUser && targetGroupId) {
            return res.status(400).json({ message: 'Both targetUser and targetGroup cannot be sent at the same time.' });
        }
        if (!targetUser && !targetGroupId) {
            return res.status(400).json({ message: 'Either targetUser or targetGroup is required.' });
        }
        if (targetUser) {
            const user = req.user;
            const receiver = await User.findOne({ _id : targetUser });
            if (!receiver) {
                return res.status(400).json({ message: `${receiver} does not exist.` });
            }
            if (!user.friends?.includes(receiver._id)) {
                return res.status(400).json({ message: `${targetUser} is not a friend of ${user.userName}.` });
            }
            const chat = user.chats.find(chat => chat.chatWith === targetUser);
            await Message.findByIdAndUpdate(chat.messages, {
                $push: { text: { content: text, sender: user._id, readBy: [] } }
            });
        } else {

        }
        return res.status(201).json({ message: 'message sent successfully. ' });
    } catch (error) {
        console.log('error while sending message', error)
        res.status(500).json({ error: error.message });
    }
};

// Get Messages with User
const getMessagesWithUser = async (req, res) => {
    try {
        const user = req.user;
        const chat = user.chats.find(chat => chat.chatWith === req.params.userId);
        console.log("this is the chat", chat)
        if (!chat) {
            return res.status(400).json({ message: 'No chat found.' });
        }
        const messages = await Message.findById(chat.messages);
        res.status(200).json(messages.text);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Messages in a Group
const getGroupMessages = async (req, res) => {
    try {
        const group = await Group.findById(req.params.groupId);
        if (!group) {
            return res.status(400).json({ message: 'Group does not exist.' });
        }
        if (!group.members.includes(req.user._id)) {
            return res.status(400).json({ message: 'User is not a member of this group.' });
        }
        const messages = await Message.find(group.messages);
        res.status(200).json(messages.text);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Mark Message as Read
const setReadBy = async (req, res) => {
    try {
        await Message.findByIdAndUpdate(req.body.messageId, {
            $set: { "text.$[].isSeen": true }
        },);
        res.status(201).json({ message: 'Message read successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export {
    sendMessage,
    getMessagesWithUser,
    getGroupMessages,
    setReadBy,
}