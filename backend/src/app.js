const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const orderRoutes = require("./routes/orderRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

app.use("/api/orders", orderRoutes);

app.use((req, res, next) => {
  res.status(404);
  throw new Error(`Route not found: ${req.originalUrl}`);
});


app.get("/", (req, res) => {
  res.send("BookNest API is running...");
});

app.use(errorHandler);

module.exports = app;
