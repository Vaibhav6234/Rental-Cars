const express = require('express')
const multer = require('multer')
const userModel = require('../model/user.model')
const carPostModel = require('../model/carPost.model')
const bookDateModel = require('../model/bookDate.model')
const uploadFile = require('../services/storage.service')
const authMiddleware = require('../middleware/auth.middleware')

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

router.get('/profile', authMiddleware, async (req, res) => {
    const user = await userModel.findById(req.user.userId).select('-password')

    let extra = {}
    if (user.role === 'seller') {
        extra.cars = await carPostModel.find({ postedBy: user._id })
    } else {
        extra.bookings = await bookDateModel.find({ user: user._id }).populate('car')
    }

    res.json({ user, ...extra })
})

router.put('/profile', authMiddleware, async (req, res) => {
    const user = await userModel.findByIdAndUpdate(
        req.user.userId,
        req.body,
        { new: true }
    ).select('-password')

    res.json({ user })
})

router.put('/profile/avatar', authMiddleware, upload.single('avatar'), async (req, res) => {
    const result = await uploadFile(req.file.buffer)

    const user = await userModel.findByIdAndUpdate(
        req.user.userId,
        { avatar: result.url },
        { new: true }
    ).select('-password')

    res.json({ user })
})

module.exports = router