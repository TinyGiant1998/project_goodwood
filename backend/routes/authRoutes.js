const express = require("express");
const { signup, login } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup); // ✅ Defines POST route for signup
router.post("/login", login); // ✅ Defines POST route for login

module.exports = router;
