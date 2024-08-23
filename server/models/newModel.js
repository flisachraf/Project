const mongoose = require("mongoose");

const subtitleSchema = new mongoose.Schema({
  subtitle: {
    en: { type: String },
    ar: { type: String, required: true },
  },
  paragraph: {
    en: { type: String },
    ar: { type: String },
  },
});
const newSchema = new mongoose.Schema({
  title: {
    en: { type: String },
    ar: { type: String, required: true },
  },
  videoUrl:{type:String},
  mainParagraph: {
    en: { type: String },
    ar: { type: String },
  },
  subtitles: [subtitleSchema],

  image: { type: String}, // Store image URL
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
  isUrgent: { type: Boolean, default: false },
  isNews:{type: Boolean, default: false },
  confirmedAt: { type: Date, default: null },
  category: {type: String,
        enum: ['Politics', 'Economy', 'Security','Borders','Sport','Libyan In Tunisia','Tunisian In Libya',"Infographs","VideoGraphs"],
        required: true},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('New', newSchema);
