const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Sign Up Controller
const signup = async (req, res) => {
  const { firstName, lastName, username, email, password, role } = req.body;

  // Check if email already exists in the database
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User already exists. Please login" });
  }

  // Hash password and create user
  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = new User({
    firstName,
    lastName,
    username,
    email,
    password: hashedPassword,
    role: role || "user",
  });

  // Save the user to the database
  await newUser.save();

  // Create JWT token
  const token = jwt.sign(
    { userId: newUser._id, role: newUser.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  res.status(201).json({ token, role: newUser.role }); // Send the token back to the client
};

// Login Controller
const login = async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Compare entered password with hashed password in DB
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Generate JWT token
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  console.log("Login Response:", {
    token,
    role: user.role,
    username: user.username,
    email: user.email,
  });

  res.json({
    token,
    role: user.role,
    username: user.username,
    email: user.email,
  });
};

module.exports = { signup, login };
