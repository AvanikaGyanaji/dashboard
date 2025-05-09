import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized: No token" });
        }

        const decoded = jwt.verify(token, "secretkeyforvanikaapp123@#"); // Change your secret

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ success: false, message: "No user found" });
        }

        req.user = user; // attach user to request
        next(); // move forward
    } catch (error) {
        console.error("Auth error:", error.message);
        return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
    }
};

export default authMiddleware;
