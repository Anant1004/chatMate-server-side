import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';


const signupUser = async (req, res) => {
    try {
        const { fullName, userName, email, password, avatar } = req.body;
        if (!fullName || !userName || !email || !password) {
            return res.status(400).json({ code: 'MISSING_FIELDS', message: 'All fields are required.' });
        }
        const existingUser = await User.findOne({ $or: [{ email }, { userName }] });
        if (existingUser) {
            return res.status(409).json({ code: 'USER_ALREADY_EXISTS', message: 'User already exists.' });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            fullName,
            userName,
            email,
            password: hashedPassword,
            avatar,
            friends: []
        });
        await newUser.save();
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            userName: newUser.userName,
            email: newUser.email,
            avatar: newUser.avatar,
            friends: newUser.friends
        });

    } catch (error) {
        console.error('Error sign-up:', error);
        res.status(500).json({ code: 'SERVER_ERROR', message: 'Server error sign-up' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ code: 'MISSING_FIELDS', message: 'All fields are required.' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ code: 'USER_NOT_FOUND', message: 'Invalid email or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ code: 'INVALID_PASSWORD', message: 'Invalid email or password' });
        }
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '48h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
            code: 'LOGIN_SUCCESS',
            message: 'Log-in successful',
            user:user,
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ code: 'SERVER_ERROR', message: 'Server error during login' });
    }
};



const logoutUser = async (req, res) => {
    const token = req.cookies?.token;
        if (!token) {
            return res.status(204).json({ code:'NOT_TOKEN', message: 'Already logeed out' });
        }
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        res.status(200).json({ code:'SUCESS_LOGOUT', message: 'Logout successful' });
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ code: 'SERVER_ERROR', message: 'Server error during logout' });
    }
};

const getAllUsersExceptLoggedIn = async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: req.user._id } }).select("-password");
        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.status(200).json(users);
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ message: 'Server error getting users' });
    }
};

const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching current user:', error);
        res.status(500).json({ message: 'Server error fetching current user' });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select("-password");
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ message: 'Server error fetching user by ID' });
    }
};

const updateAvatar = async (req, res) => {
    try {
        if (!req?.file.path) {
            return res.status(422).send({ code: 'AVATAR_MISSING', message: "Avatar is missing." });
        }
        const result = await uploadOnCloudinary(req.file.path);
        if (!result.url) {
            return res.status(502).json({code: 'UPLOAD_FAILED', message: 'Error uploading to cloudinary' });
        }
        await User.findByIdAndUpdate(req.user._id, { avatar: result.url });
        res.status(200).send({ code: 'UPLOAD_SUCCESS', message: "File uploaded successfully", url: result.url });
    } catch (error) {
        res.status(500).send({ code: 'SERVER_ERROR', message: "Error uploading file", error: error.message });
    }
};


export {
    signupUser,
    loginUser,
    logoutUser,
    getAllUsersExceptLoggedIn,
    getCurrentUser,
    getUserById,
    updateAvatar,

};
