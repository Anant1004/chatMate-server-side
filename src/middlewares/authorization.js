import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const authenticate = async (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        console.log('No token found in cookies.');
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded);
        const user = await User.findById(decoded?.userId).select('-password');
        if (!user) {
            console.log('User not found for decoded userId:', decoded?.userId);
            return res.status(404).json({ error: 'User not found or Invalid Token.' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error('Token verification error:', error.message);
        res.status(400).json({ error: 'Invalid token.' });
    }
};

export default authenticate;
