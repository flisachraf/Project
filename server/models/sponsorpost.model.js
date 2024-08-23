const mongoose = require ('mongoose');

const sponsorSchema = new mongoose.Schema({

    category: {
        type: String,
        required: [true, 'Category must be present.']
    },

    imageSponsor:{
        type: String, // Store the image as a URL
        required: [true, 'Image must be present.']
    },

    title: {
        type: String,
        required: [true, 'Title must be present.'],
        minlength: [3, 'Title must be at least 3 characters.'],
        trim: true
    },
    authorName: {
        type: String,
        required: [true, 'Instructor must be present.']
    },
    details: {
        type: String,
        minlength: [10, 'Details must be at least 10 characters.']
    },
    plan: [{
        date: { type: String, required: true },
        time: { type: String, required: true }
    }],

}, { timestamps: true }); // Close the schema object here


const Sponsor = mongoose.model('Sponsor', sponsorSchema);

module.exports = Sponsor;