const mongoose = require('mongoose');

// Creates a schema for the data
const CatSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    bedsOwned: {
        type: Number,
        min: 0,
        required: true,
    },
    createdDate: {
        type: Date,
        default: Date.now,
    }
});

// Turns the schema into a model
const CatModel = mongoose.model('Cat', CatSchema);

// Exports
module.exports = CatModel;