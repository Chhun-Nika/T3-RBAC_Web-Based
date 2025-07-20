import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    console.log("Authorization Header:", req.headers['authorization']);
    console.log("Headers received:", req.headers);

    if (!token) {
        console.log("Token is missing after split")
        return res.status(401).json({ error: 'Token missing' });
    } 

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch {
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
};
