import Group from '../models/groupModel.js';
import Message from '../models/messageModel.js';
import User from '../models/userModel.js';

// Create Group
const createGroup = async (req, res) => {
    try {
        const { name, members, description } = req.body;
        if (!name || !members) {
            return res.status(400).json({ message: 'Name and members are required.' });
        }
        if (!Array.isArray(members)) {
            return res.status(400).json({ message: 'Members should be an array of users.' });
        }
        const newChat = await Message.create({ text: [] });
        if (!members.includes(req.user._id)) {
            members.push(req.user._id);
        }
        const group = await Group.create({ name, members, description, createdBy: req.user._id, messages: newChat._id });
        res.status(201).json(group);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Group Details
const getGroupDetails = async (req, res) => {
    try {
        const group = await Group.findById(req.params.groupId)
        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add members

const addSingleMemberToGroup = async (req, res) => {
    try {
        const { memberId, groupId } = req.body;
        if (!memberId) {
            return res.status(400).json({ message: 'Member ID is required.' });
        }
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(400).json({ message: `Group with ID ${groupId} does not exist.` });
        }
        const member = await User.findById(memberId);
        if (!member) {
            return res.status(400).json({ message: `User with ID ${memberId} does not exist.` });
        }
        if (group.members.includes(member._id)) {
            return res.status(400).json({ message: 'User is already a member of the group.' });
        }
        group.members.push(member._id);
        await group.save();
        res.status(201).json({ message: 'member has been added.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Remove member

const removeSingleMemberFromGroup = async (req, res) => {
    try {
        const { memberId, groupId } = req.body;
        if (!memberId) {
            return res.status(400).json({ message: 'Member ID is required.' });
        }
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(400).json({ message: `Group does not exist.` });
        }
        const member = await User.findById(memberId);
        if (!member) {
            return res.status(400).json({ message: `User does not exist.` });
        }
        if (!group.members.includes(memberId)) {
            return res.status(400).json({ message: 'User is not a member of the group.' });
        }
        group.members = group.members.filter(id => id.toString() !== memberId.toString());
        await group.save();
        res.status(200).json({ message: 'member removed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update group

const updateGroup = async (req, res) => {
    try {
        const { groupId, newName } = req.body;
        if (!newName) {
            return res.status(400).json({ message: 'New group name is required.' });
        }
        const group = await Group.findByIdAndUpdate(groupId, { name: newName }, { new: true });
        if (!group) {
            return res.status(400).json({ message: `Group does not exist.` });
        }
        res.status(200).json(group);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete group

const deleteGroup = async (req, res) => {
    try {
        const { groupId } = req.body;
        if (!groupId) {
            return res.status(400).json({ message: 'Group ID is required.' });
        }
        const group = await Group.findByIdAndDelete(groupId);
        if (!group) {
            return res.status(400).json({ message: `Group does not exist.` });
        }
        await Message.findByIdAndDelete(group.messages);
        res.status(200).json({ message: 'Group deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getAllGroups = async (req, res) => {
    try {
        const groups = await Group.find();
        console.log(groups);
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserGroups=async(req,res)=>{
    try {
        const groups = await Group.find({$or:[{members:{$in:[req.user._id]}}]});
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getGroupCreatedByUser = async (req, res) => {
    try {
        const groups = await Group.find({$or:[{createdBy:req.user._id}]});
        res.status(200).json(groups);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export {
    createGroup,
    getGroupDetails,
    addSingleMemberToGroup,
    removeSingleMemberFromGroup,
    updateGroup,
    deleteGroup,
    getAllGroups,
    getUserGroups,
    getGroupCreatedByUser,
 };