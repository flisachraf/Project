const mongoose = require("mongoose");

const subtitleSchema = new mongoose.Schema({
  subtitle: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },
  paragraph: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },
});

const infographySchema = new mongoose.Schema({
  title: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },
  mainParagraph: {
    en: { type: String, required: true },
    ar: { type: String, required: true },
  },
  subtitles: [subtitleSchema],

  image: { type: String, required: true }, // Store image URL
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required:true
  },
  publisher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: { type: String, enum: ['Pending', 'Confirmed'],default:'Pending' },
  confirmedAt: { type: Date, default: null },
  category: {type: String,
        enum: ['Politics', 'Economic', 'Security','Health','Torist','Limits'],
        required: true},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Infography', infographySchema);
