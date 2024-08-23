const mongoose = require('mongoose');

const sponsorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  sponsoringFile: {
    type: String, // This could be a path to the file or another storage method
    default: null
  },
  status:{
    type:String,
    enum:["Active","Desactive"],
    default:'Desactive'
  }

});

module.exports = mongoose.model('Sponsor', sponsorSchema);


