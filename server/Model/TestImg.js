const mongoose = require('mongoose');

const PhotoSchema =  new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: false
      },
      uploadDate: {
        type: Date,
        default: Date.now
      }
})


const PhotoModel = mongoose.model("photo",PhotoSchema)
module.exports = PhotoModel