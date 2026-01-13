const Order = require("../models/Order");
const Book = require("../models/Book");
const asyncHandler = require("../middleware/asyncHandler");
const sendEmail = require("../utils/sendEmail");

// @desc    Create order
// @route   POST /api/orders
// @access  User
exports.createOrder = asyncHandler(async (req, res) => {
  const { orderItems, totalAmount, shippingAddress } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items provided");
  }

  // Validate stock
  for (const item of orderItems) {
    const book = await Book.findById(item.book);

    if (!book) {
      res.status(404);
      throw new Error("Book not found");
    }

    if (book.stock < item.quantity) {
      res.status(400);
      throw new Error(
        `Insufficient stock for "${book.title}". Available: ${book.stock}`
      );
    }
  }

  // Deduct stock
  for (const item of orderItems) {
    const book = await Book.findById(item.book);
    book.stock -= item.quantity;
    await book.save();
  }

  // Create order
  const order = await Order.create({
    user: req.user._id,
    orderItems,
    totalAmount,
    shippingAddress,
  });

  // Send email safely (won't break order flow if email fails)
  try {
    await sendEmail(
      req.user.email,
      "Your BookNest Order is Confirmed",
      `
        <h2>Order Confirmed 🎉</h2>
        <p>Order ID: ${order._id}</p>
        <p>Total Amount: ₹${order.totalAmount}</p>
        <p>We will notify you when your books are shipped.</p>
        <br/>
        <p>Thank you for shopping with <b>BookNest</b>.</p>
      `
    );
  } catch (err) {
    console.log("Email failed:", err.message);
  }

  res.status(201).json(order);
});

// @desc    Get logged-in user's orders
// @route   GET /api/orders/my-orders
// @access  User
exports.getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({
    createdAt: -1,
  });

  res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Admin
exports.getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({})
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.json(orders);
});

// @desc    Update order status
// @route   PUT /api/orders/:id
// @access  Admin
exports.updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  order.status = req.body.status || order.status;
  const updatedOrder = await order.save();

  res.json(updatedOrder);
});
