// routes/contactRoutes.js
import express from "express";
import mongoose from "mongoose";

const router = express.Router();

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});
const Contact = mongoose.model("Contact", contactSchema);

// POST /api/contact
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;
  try {
    await Contact.create({ name, email, message });
    res.status(201).json({ success: true, message: "Message received!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default router;
