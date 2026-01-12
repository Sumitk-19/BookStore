const Book = require("../models/Book");
const asyncHandler = require("../middleware/asyncHandler");

// @desc    Get all books (search, filter, pagination)
// @route   GET /api/books
// @access  Public
exports.getAllBooks = asyncHandler(async (req, res) => {
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
});

// @desc    Get single book
// @route   GET /api/books/:id
// @access  Public
exports.getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }

  res.json(book);
});

// @desc    Create book
// @route   POST /api/books
// @access  Admin
// Create
exports.createBook = asyncHandler(async (req, res) => {
  const { title, author, price, category, stock, image } = req.body;

  const book = await Book.create({
    title,
    author,
    price,
    category,
    stock,
    image, // URL string
  });

  res.status(201).json(book);
});
exports.createBook = asyncHandler(async (req, res) => {
  const { title, author, price, category, stock, image } = req.body;

  const book = await Book.create({
    title,
    author,
    price,
    category,
    stock,
    image, // URL string
  });

  res.status(201).json(book);
});



// @desc    Update book
// @route   PUT /api/books/:id
// @access  Admin
exports.updateBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }

  book.title = req.body.title;
  book.author = req.body.author;
  book.price = req.body.price;
  book.category = req.body.category;
  book.stock = req.body.stock;
  book.image = req.body.image; // URL

  const updatedBook = await book.save();
  res.json(updatedBook);
});



// @desc    Delete book
// @route   DELETE /api/books/:id
// @access  Admin
exports.deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }

  await book.deleteOne();
  res.json({ message: "Book removed successfully" });
});
