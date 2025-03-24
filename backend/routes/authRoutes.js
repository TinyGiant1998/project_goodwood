const express = require("express");
const { signup, login } = require("../controllers/authController");
const {
  authenticateUser,
  authorizeAdmin,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", signup); // ✅ Defines POST route for signup
router.post("/login", login); // ✅ Defines POST route for login

router.get("/admin", authenticateUser, authorizeAdmin, (req, res) => {
  res.status(200).json({ message: "Admin Access Granted" });
});

module.exports = router;
