const mongoose = require('mongoose')

const pbSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    budget: {
        type: Number,
        required: true,
        unique: true
    },
    backColor: {
        type: String,
        trim: true,
        required: true
    }
}, { collection: 'myBudget'})

module.exports = mongoose.model('myBudget', pbSchema)