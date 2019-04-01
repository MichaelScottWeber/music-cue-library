const mongoose = require("mongoose");

// Schema Setup
const songSchema = new mongoose.Schema(
  {
    title: String,
    image: String,
    description: String,
    tags: String,
    audio: String,
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
      }
    ]
  });

// Makes a model from the Schema
module.exports = mongoose.model("Song", songSchema);
