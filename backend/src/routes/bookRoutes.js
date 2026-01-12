const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

// Public
router.get("/", getAllBooks);
router.get("/:id", getBookById);

// Admin
router.post("/", protect, admin, createBook);
router.put("/:id", protect, admin, updateBook);
router.delete("/:id", protect, admin, deleteBook);

module.exports = router;
