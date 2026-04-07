const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require("../model/user.model")

const router = express.Router();


/* AUTH ROUTES */

router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email and password are required' })
    }

    const existing = await userModel.findOne({ email })
    if (existing) {
        return res.status(409).json({ message: 'Email already registered' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await userModel.create({ name, email, password: hashedPassword, role: role || 'buyer' })

    const token = jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    )

    return res.status(201).json({
        message: 'User registered successfully',
        token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role }
    })
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' })
    }

    const user = await userModel.findOne({ email })
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    )

    return res.status(200).json({
        message: 'Login successful',
        token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role }
    })
})

module.exports = router;
