const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const contactRoutes = require("./routes/contactRoutes");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Body parser middleware
app.use(express.json());

// Serve static frontend files from /public
app.use(express.static(path.join(__dirname, "public")));

// API routes
app.use("/contacts", contactRoutes);

// Serve the UI for the root URL
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found.`,
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
