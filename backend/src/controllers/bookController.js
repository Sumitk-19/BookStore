const Book = require("../models/Book");

// GET all books (Public)
// GET all books with search, filter, pagination
exports.getAllBooks = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 6;
  const skip = (page - 1) * limit;

  const keyword = req.query.keyword
    ? {
        $or: [
          { title: { $regex: req.query.keyword, $options: "i" } },
          { author: { $regex: req.query.keyword, $options: "i" } },
        ],
      }
    : {};

  const categoryFilter = req.query.category
    ? { category: req.query.category }
    : {};

  const filter = { ...keyword, ...categoryFilter };

  const totalBooks = await Book.countDocuments(filter);
  const books = await Book.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  res.json({
    page,
    pages: Math.ceil(totalBooks / limit),
    totalBooks,
    books,
  });
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
