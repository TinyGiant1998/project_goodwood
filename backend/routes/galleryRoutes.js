const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const Event = require("../models/Event");
const Gallery = require("../models/Gallery");

// Set up multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/gallery";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Route to get all images
router.get("/gallery", async (req, res) => {
  try {
    const events = await Event.find();
    const eventImages = events.map((event) => ({
      _id: event._id,
      imageUrl: event.image,
      eventName: event.name,
      deletable: false,
    }));

    const galleryImages = await Gallery.find();
    const uploadedImages = galleryImages.map((image) => ({
      _id: image._id,
      imageUrl: "/uploads/gallery/" + image.imageUrl,
      eventName: image.eventName,
      deletable: image.userUploaded,
    }));

    res.json([...eventImages, ...uploadedImages]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to upload a new image
router.post("/gallery", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const { eventName } = req.body;
    const newImage = new Gallery({
      eventName,
      imageUrl: req.file.filename,
      userUploaded: true,
    });
    await newImage.save();

    res.status(201).json(newImage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to delete an uploaded image
router.delete("/gallery/:id", async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) return res.status(404).json({ message: "Image not found" });

    const filePath = path.join(__dirname, "../uploads/gallery", image.imageUrl);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: "Image deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
