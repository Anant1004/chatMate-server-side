import Group from '../models/groupModel.js';
import Message from '../models/messageModel.js';

// Create Group
const createGroup = async (req, res) => {
    const { name, members } = req.body;
    try {
        const group = await Group.create({ name, members, createdBy: req.user._id });
        res.status(201).json(group);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Group Details
const getGroupDetails = async (req, res) => {
    try {
        const group = await Group.findById(req.params.groupId).populate('members', 'userName');
        res.json(group);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Send Message to Group
const sendMessageToGroup = async (req, res) => {
    const { targetId, text } = req.body;
    try {
        const message = await Message.create({ sender: req.user._id, text, target: targetId, targetModel: 'Group' });
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Group Messages
const getGroupMessages = async (req, res) => {
    try {
        const messages = await Message.find({ target: req.params.groupId, targetModel: 'Group' });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export {
    createGroup,
    getGroupDetails,
    sendMessageToGroup,
    getGroupMessages
}