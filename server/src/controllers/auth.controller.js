import db from "../models/index.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await db.User.findOne({ 
            where: { username },
            include: { model: db.Role }
        });
        if(!user) return res.status(404).json({ error: "Invalid username or password!" });
        // if(password !== user.password) {
        //     return res.status(401).json({ error: "Invalid username or password!" });
        // }
        const match = await bcrypt.compare(password, user.password);
        if(!match) return res.status(401).json({ error: 'Invalid credentials' });
        
        if (user.Role.name !== 'admin') {
            return res.status(401).json({ error: "Access denied: Admins only" });
        }

        const token = jwt.sign({ id: user.user_id, username: user.username, role: user.Role.name }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        })
        console.log(token);
        console.log(user.Role.name)
        
        res.json({ token, user: { id: user.user_id, username: user.username, role: user.Role.name} });
    } catch (err) {
        res.status(500).json({ error: "Login error", details: err.message })
    }
}