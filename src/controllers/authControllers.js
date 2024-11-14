import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';


const signupUser = async (req, res) => {
    try {
        const { fullName, userName, email, password, avatar } = req.body;
        if (!fullName || !userName || !email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        const existingUser = await User.findOne({ $or: [{ email }, { userName }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            fullName,
            userName,
            email,
            password: hashedPassword,
            avatar,
            status: false,
            friends: []
        });
        await newUser.save();
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            userName: newUser.userName,
            email: newUser.email,
            avatar: newUser.avatar,
            status: newUser.activeStatus,
            friends: newUser.friends
        });

        console.log('sign-up successfully');
    } catch (error) {
        console.error('Error sign-up:', error);
        res.status(500).json({ message: 'Server error sign-up' });
    }
};

const loginUser = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Wrong credentials' });
        }
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '5h' }
        );
        res.cookie('token', token, {
            httpOnly: true,
            secure: true 
        });
        await User.findByIdAndUpdate(user._id, { activeStatus: true });
        const loggedInUser = await User.findById(user._id).select("-password");
        res.status(200).json({
            message: 'Log-in successful',
            user: loggedInUser
        });
        console.log('User logged in successfully');
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
};


const logoutUser = async (req, res) => {
    try {
        console.log(req.user);
        await User.findByIdAndUpdate(req.user._id, { activeStatus: false });
        res.status(200).json({ message: 'Logout successful' });
        console.log('User logged out successfully');
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ message: 'Server error during logout' });
    }
};

export {
    signupUser,
    loginUser,
    logoutUser
};
