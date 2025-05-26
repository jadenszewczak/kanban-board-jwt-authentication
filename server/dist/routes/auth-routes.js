import { Router } from "express";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const login = async (req, res) => {
    // TODO: If the user exists and the password is correct, return a JWT token
    const { username, password } = req.body;
    try {
        // Find user by username
        const user = await User.findOne({ where: { username } });
        if (!user) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        // Compare password with hashed password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        // Create and sign JWT token
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET_KEY, { expiresIn: "24h" });
        res.json({ token });
    }
    catch (error) {
        res.status(500).json({ message: "Error logging in" });
    }
};
const router = Router();
// POST /login - Login a user
router.post("/login", login);
export default router;
