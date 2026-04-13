const mongoose = require("mongoose")

const carSchema = new mongoose.Schema({

    image: {
        type: String,
        required: true
    },
    carName: {
        type: String,
        required: true
    },
    pricePerDay: {
        type: Number,
        required: true
    },

    model: String,
    fuelType: String,
    
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const carPostModel = mongoose.model("CarPost",carSchema)

module.exports = carPostModel