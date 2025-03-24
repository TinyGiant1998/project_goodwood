const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },

  userUploaded: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Gallery = mongoose.model("Gallery", gallerySchema);

module.exports = Gallery;
