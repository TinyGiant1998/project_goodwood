const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON data

// Connect to MongoDB
connectDB();

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes); // Use auth routes at /api/auth

// Import Routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
