const express = require("express");
const multer = require("multer");
const Event = require("../models/Event");

const router = express.Router();

// Multer Storage for Image Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// Create Event
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, description, price, organizer, date } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const newEvent = new Event({
      name,
      description,
      price,
      organizer,
      date,
      image,
    });
    await newEvent.save();

    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: "Error creating event" });
  }
});

// Get All Events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Error fetching events" });
  }
});

// Get Single Event
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.json(event);
  } catch (error) {
    res.status(404).json({ error: "Event not found" });
  }
});

// Update Event
// Update an event (PUT request)
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      organizer: req.body.organizer,
    };

    if (req.file) {
      updateData.image = "/uploads/" + req.file.filename;
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: "Failed to update event" });
  }
});

// Delete Event
router.delete("/:id", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting event" });
  }
});

module.exports = router;
