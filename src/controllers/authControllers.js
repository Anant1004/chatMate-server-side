import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'; 
const JWT_SECRET = process.env.JWT_SECRET


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
            status: newUser.status,
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
        const { email, password } = req.body;
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
            'JWT_SECRET',
            { expiresIn: '5h' }
        );
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 5 * 60 * 60 * 1000
        });
        res.status(200).json({
            message: 'Log-in successful',
            user: {
                _id: user._id,
                fullName: user.fullName,
                userName: user.userName,
                email: user.email,
                avatar: user.avatar,
                status: user.status,
                friends: user.friends
            }
        });
        console.log('User logged in successfully');
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
};

const logoutUser = async (req, res) => {
    try {
        const { userId } = req.body;        
        await User.findByIdAndUpdate(userId, { status: false });        
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
