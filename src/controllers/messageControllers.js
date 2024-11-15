import Message from '../models/messageModel.js';

// Send Message to User
const sendMessage = async (req, res) => {
    const { targetId, text } = req.body;
    try {
        const message = await Message.create({
            sender: req.user._id,
            text,
            target: targetId,
            targetModel: 'User',
        });
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Messages with User
const getMessagesWithUser = async (req, res) => {
    try {
        const messages = await Message.find({
            $or: [
                { sender: req.user._id, target: req.params.userId },
                { sender: req.params.userId, target: req.user._id },
            ],
            targetModel: 'User',
        });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mark Message as Read
const markMessageAsRead = async (req, res) => {
    try {
        const message = await Message.findByIdAndUpdate(
            req.params.messageId,
            { $addToSet: { readBy: req.user._id } },
            { new: true }
        );
        res.json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export {
    sendMessage,
    getMessagesWithUser,
    markMessageAsRead
}