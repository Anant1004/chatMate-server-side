import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'
const JWT_SECRET = process.env.JWT_SECRET

const authenticate = async(req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
    console.log("Token from cookie:", token);
    console.log("JWT_PASS:", process.env.JWT_PASS);
    try {
        const decoded = jwt.verify(token, JWT_SECRET); 
        const user=await User.findById(decoded?.userId);
        console.log(user)
        if (!user) {
            return res.status(404).json({ error: 'User not found or Invalid Token.' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        res.status(400).json({ error: 'Invalid token.' });
    }
};

export default authenticate;
