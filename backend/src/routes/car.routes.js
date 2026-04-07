const express = require('express');
const multer = require('multer');
const carPostModel = require('../model/carPost.model')
const uploadFile = require('../services/storage.service');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() });

router.post("/post-car", authMiddleware, upload.single("image"), async (req, res) => {
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

router.get("/get-car", async (req, res) => {
    const carPosts = await carPostModel.find();

    return res.status(200).json({
        message: "Car posts retrieved successfully",
        carPosts
    })
})

module.exports = router;