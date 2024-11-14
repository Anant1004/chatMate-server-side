import jwt from 'jsonwebtoken';


const authenticate = (req, res, next) => {
    console.log("JWT_PASS:", process.env.JWT_PASS);
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
    console.log("Token from cookie:", token);
    console.log("JWT_PASS:", process.env.JWT_PASS);
    try {
        const decoded = jwt.verify(token, process.env.JWT_PASS);
        console.log("Decoded token:", decoded);
        req.user = decoded;
        // console.log(req.user);
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        res.status(400).json({ error: 'Invalid token.' });
    }
};

export default authenticate;
