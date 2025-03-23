const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Optionally add createdAt and updatedAt
  }
);

const Gallery = mongoose.model("Gallery", gallerySchema);

module.exports = Gallery;
