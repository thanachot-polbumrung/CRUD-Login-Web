const mongoose = require("mongoose")
const BlogSchema = new mongoose.Schema({
    postContent:String,
    category:String,
    userId:String,
    imageUrl: {
        type: String,
      },
      title: {
        type: String,
      },
      uploadDate: {
        type: Date,
        default: Date.now
      }
})

const BlogModel = mongoose.model("blogs",BlogSchema)
module.exports = BlogModel