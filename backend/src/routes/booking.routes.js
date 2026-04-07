const express = require("express");
const bookDateModel = require("../model/bookDate.model");
const authMiddleware = require("../middleware/auth.middleware")

const router = express.Router(); 

router.post("/book-car", authMiddleware, async (req, res) => {
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

module.exports = router;