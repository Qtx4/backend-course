import express from "express";
import User from "../models/User.js";
const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Simple user save (no real auth logic)
  try {
    const user = new User({ email, password });
    await user.save();
    res.status(201).json({ success: true, message: "Login data saved" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
