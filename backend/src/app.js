const express = require('express');
const cors = require('cors')

const authRoutes = require("./routes/auth.routes")
const carRoutes = require("./routes/car.routes")
const bookingRoutes = require("./routes/booking.routes")
const profileRoutes = require("./routes/profile.routes")

const app = express()

/* Middlewares */
app.use(cors());
app.use(express.json());


// ROUTES 
app.use("/api/auth", authRoutes);
app.use("/api/car", carRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/user", profileRoutes);

module.exports = app
