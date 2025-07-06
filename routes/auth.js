// routes/auth.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// ✅ Register Route
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.status(201).json({
      success: true,
      message: "✅ User registered successfully",
    });
  } catch (err) {
    console.error("Register Error:", err.message);
    res.status(500).json({
      success: false,
      message: "❌ Server error",
    });
  }
});

// ✅ Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({
        success: false,
        message: "User not found",
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "secret123", {
      expiresIn: "1h",
    });

    res.status(200).json({
      success: true,
      message: "✅ Login successful",
      token,
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({
      success: false,
      message: "❌ Server error",
    });
  }
});

export default router;
