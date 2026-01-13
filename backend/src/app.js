const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const orderRoutes = require("./routes/orderRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");

const app = express();

// CORS config
app.use(
  cors({
    origin: [
      "http://localhost:5173",        // local frontend
      "https://book-store-six-ruby.vercel.app/" // production frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// Static for images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("BookNest API is running...");
});

// 404 handler
app.use((req, res, next) => {
  res.status(404);
  throw new Error(`Route not found: ${req.originalUrl}`);
});

// Error middleware
app.use(errorHandler);

module.exports = app;
