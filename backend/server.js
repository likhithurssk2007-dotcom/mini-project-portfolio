const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Contact = require("./models/contact");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/portfolioDB";

mongoose
  .connect(mongoUri)
  .then(() => {
    const dbName = mongoose.connection?.name || "unknown";
    const dbHost = mongoose.connection?.host || "unknown";
    console.log(`MongoDB connected: ${dbHost}/${dbName}`);
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Contact route
app.post("/contact", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    const saved = await contact.save();
    console.log("Contact saved with id:", saved._id.toString());
    res.json({ message: "Message saved successfully!" });
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).json({ message: "Error saving message" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});