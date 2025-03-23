const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  organizer: { type: String, required: true },
  image: { type: String, required: true },
  date: { type: Date, required: true },
});

module.exports = mongoose.model("Event", EventSchema);
