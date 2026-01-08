const Book = require("../models/Book");

// GET all books (Public)
exports.getAllBooks = async (req, res) => {
  const books = await Book.find({});
  res.json(books);
};

// GET single book (Public)
exports.getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json(book);
};

// CREATE book (Admin)
exports.createBook = async (req, res) => {
  const book = new Book(req.body);
  const createdBook = await book.save();
  res.status(201).json(createdBook);
};

// UPDATE book (Admin)
exports.updateBook = async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  Object.assign(book, req.body);
  const updatedBook = await book.save();
  res.json(updatedBook);
};

// DELETE book (Admin)
exports.deleteBook = async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  await book.deleteOne();
  res.json({ message: "Book removed" });
};
