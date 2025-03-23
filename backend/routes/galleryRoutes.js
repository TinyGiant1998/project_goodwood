const express = require("express");
const router = express.Router();
const Event = require("../models/Event"); // Import the Event model to get event images

// Route to get all event images (gallery)
router.get("/gallery", async (req, res) => {
  try {
    // Fetch all event images
    const events = await Event.find();
    const eventImages = events.map((event) => ({
      imageUrl: event.image, // Assuming the Event model has image field
      eventName: event.name, // Assuming the Event model has name field
    }));

    // console.log(eventImages);
    res.json(eventImages); // Send all event images as a response
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
