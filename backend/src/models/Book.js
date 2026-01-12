const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    image: { type: String, required: true }, // URL only
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
