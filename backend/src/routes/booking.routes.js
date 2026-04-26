const express = require("express");
const bookDateModel = require("../model/bookDate.model");
const carPostModel = require("../model/carPost.model");
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

router.get("/inbox", authMiddleware, async (req, res) => {
    const userId = req.user.userId
    const role = req.user.role

    if (role === "seller") {
        const sellerCars = await carPostModel.find({ postedBy: userId }).select("_id")
        const carIds = sellerCars.map((car) => car._id)

        const bookings = await bookDateModel
            .find({ car: { $in: carIds } })
            .populate("car")
            .populate("user", "name email")
            .sort({ createdAt: -1 })

        const inbox = bookings.map((booking) => {
            const base = {
                bookingId: booking._id,
                status: booking.status,
                from: booking.from,
                to: booking.to,
                totalPrice: booking.totalPrice,
                car: booking.car,
                buyer: booking.user,
                canRespond: booking.status === "pending"
            }

            if (booking.status === "pending") {
                return {
                    ...base,
                    message: `${booking.user?.name || "A user"} requested booking for ${booking.car?.carName || "your car"}. Confirm or decline this request.`
                }
            }

            if (booking.status === "confirmed") {
                return {
                    ...base,
                    message: `You confirmed booking for ${booking.car?.carName || "your car"}.`
                }
            }

            return {
                ...base,
                message: `You declined booking for ${booking.car?.carName || "your car"}.`
            }
        })

        return res.status(200).json({ inbox })
    }

    const bookings = await bookDateModel
        .find({ user: userId })
        .populate("car")
        .sort({ createdAt: -1 })

    const inbox = bookings.map((booking) => {
        let message = "Your booking request is pending seller approval."
        if (booking.status === "confirmed") message = "Booking confirmed."
        if (booking.status === "cancelled") message = "Booking cancelled."

        return {
            bookingId: booking._id,
            status: booking.status,
            from: booking.from,
            to: booking.to,
            totalPrice: booking.totalPrice,
            car: booking.car,
            canRespond: false,
            message
        }
    })

    return res.status(200).json({ inbox })
})

router.patch("/:bookingId/status", authMiddleware, async (req, res) => {
    if (req.user.role !== "seller") {
        return res.status(403).json({ message: "Only seller can update booking status" })
    }

    const { bookingId } = req.params
    const { status } = req.body

    if (!["confirmed", "cancelled"].includes(status)) {
        return res.status(400).json({ message: "Status must be confirmed or cancelled" })
    }

    const booking = await bookDateModel.findById(bookingId).populate("car")
    if (!booking) {
        return res.status(404).json({ message: "Booking not found" })
    }

    if (!booking.car || String(booking.car.postedBy) !== String(req.user.userId)) {
        return res.status(403).json({ message: "You can only manage bookings for your own cars" })
    }

    if (booking.status !== "pending") {
        return res.status(400).json({ message: "This booking is already processed" })
    }

    booking.status = status
    await booking.save()

    return res.status(200).json({
        message: status === "confirmed" ? "Booking confirmed" : "Booking cancelled",
        booking
    })
})

router.delete("/:bookingId", authMiddleware, async (req, res) => {
    const { bookingId } = req.params

    const booking = await bookDateModel.findById(bookingId).populate("car")
    if (!booking) {
        return res.status(404).json({ message: "Booking not found" })
    }

    const isBuyer = String(booking.user) === String(req.user.userId)
    const isSeller =
        req.user.role === "seller" &&
        booking.car &&
        String(booking.car.postedBy) === String(req.user.userId)

    if (!isBuyer && !isSeller) {
        return res.status(403).json({ message: "You are not allowed to delete this item" })
    }

    if (booking.status === "pending") {
        return res.status(400).json({ message: "You can delete only processed bookings" })
    }

    await booking.deleteOne()
    return res.status(200).json({ message: "Inbox item deleted" })
})

module.exports = router;