const express = require('express');
const cors = require('cors')
const multer = require('multer')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const carPostModel = require('./model/carPost.model');
const bookDateModel = require('./model/bookDate.model')
const userModel = require('./model/user.model')
const uploadFile = require('./services/storage.service');
const authMiddleware = require('./middleware/auth.middleware')
const app = express()

/* Middlewares */
app.use(cors());
app.use(express.json());
const upload = multer({ storage: multer.memoryStorage() });


/* AUTH ROUTES */

app.post('/register', async (req, res) => {
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

app.post('/login', async (req, res) => {
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


/* PROTECTED ROUTES */

app.post("/post-car", authMiddleware, upload.single("image"), async (req, res) => {
    if (req.user.role !== 'seller') {
        return res.status(403).json({ message: 'Only sellers can post cars' })
    }

    const result = await uploadFile(req.file.buffer)
    const carPost = await carPostModel.create({
        image: result.url,
        carName: req.body.carName,
        pricePerDay: req.body.pricePerDay,
        model: req.body.model,
        fuelType: req.body.fuelType,
        postedBy: req.user.userId
    })

    return res.status(201).json({
        message: "car post created succesfully",
        carPost
    })
})

app.post("/book-car", authMiddleware, async (req, res) => {
    const { carId, from, to, totalPrice } = req.body;

    const booking = await bookDateModel.create({
        car: carId,
        user: req.user.userId,
        from: new Date(from),
        to: new Date(to),
        totalPrice,
    });

    return res.status(201).json({
        message: "Car booked successfully",
        booking
    });
});

app.get("/get-car", async (req, res) => {
    const carPosts = await carPostModel.find();

    return res.status(200).json({
        message: "Car posts retrieved successfully",
        carPosts
    })
})

/* PROFILE ROUTES */

app.get('/profile', authMiddleware, async (req, res) => {
    const user = await userModel.findById(req.user.userId).select('-password')
    if (!user) return res.status(404).json({ message: 'User not found' })

    let extra = {}
    if (user.role === 'seller') {
        extra.cars = await carPostModel.find({ postedBy: req.user.userId })
    } else {
        extra.bookings = await bookDateModel.find({ user: req.user.userId }).populate('car')
    }

    return res.status(200).json({ user, ...extra })
})

app.put('/profile', authMiddleware, async (req, res) => {
    const { name, phone } = req.body
    const user = await userModel.findByIdAndUpdate(
        req.user.userId,
        { name, phone },
        { new: true }
    ).select('-password')

    return res.status(200).json({ message: 'Profile updated', user })
})

app.put('/profile/avatar', authMiddleware, upload.single('avatar'), async (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'No image provided' })

    const result = await uploadFile(req.file.buffer)
    const user = await userModel.findByIdAndUpdate(
        req.user.userId,
        { avatar: result.url },
        { new: true }
    ).select('-password')

    return res.status(200).json({ message: 'Avatar updated', user })
})

module.exports = app
