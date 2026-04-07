const mongoose = require('mongoose')

const bookDateSchema = new mongoose.Schema({
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CarPost",        
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    from: {
        type: Date,
        required: true
    },
    to: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "cancelled"],
        default: "pending"
    },
    totalPrice: {
        type: Number           
    }
}, { timestamps: true })   
    

const bookDateModel = mongoose.model("booking",bookDateSchema)

module.exports = bookDateModel