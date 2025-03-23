// server.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const eventRoutes = require("./routes/eventRoutes");
const galleryRoutes = require("./routes/galleryRoutes"); // Make sure this is included

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON data
app.use("/uploads", express.static("uploads")); // Serve uploaded images
app.use("/api", galleryRoutes); // Mount gallery routes under /api

// Routes
app.use("/api/events", eventRoutes); // Event Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes); // Authentication Routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes); // User Routes

// Root Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Connect to MongoDB
connectDB();

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
