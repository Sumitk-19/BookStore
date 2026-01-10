import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useCart } from "../context/CartContext";

function Home() {
  const [books, setBooks] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  const fetchBooks = async (pageNumber = 1) => {
    try {
      setLoading(true);
      setError("");

      const { data } = await api.get("/books", {
        params: {
          keyword: keyword || undefined,
          category: category || undefined,
          page: pageNumber,
          limit: 8,
        },
      });

      setBooks(data.books);
      setPage(data.page);
      setPages(data.pages);
    } catch (err) {
      setError("Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(1);
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    fetchBooks(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">

      {/* Header
      <h1 className="text-3xl font-bold mb-1">BookNest</h1>
      <p className="text-gray-600 mb-6">Browse our collection</p> */}

      {/* Search & Filter */}
      <form
        onSubmit={submitHandler}
        className="bg-white shadow rounded-lg p-4 flex flex-col md:flex-row gap-3 mb-6"
      >
        <input
          type="text"
          placeholder="Search by title or author"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="flex-1 border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="">All Categories</option>
          <option value="Self Help">Self Help</option>
          <option value="Fiction">Fiction</option>
          <option value="Technology">Technology</option>
        </select>

        <button
          type="submit"
          className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition"
        >
          Search
        </button>
      </form>

      {/* Loading / Error */}
      {loading && <p className="text-center">Loading books...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition flex flex-col"
          >
            <div className="flex-1">
              <h3 className="text-lg font-bold">{book.title}</h3>
              <p className="text-sm text-gray-600">{book.author}</p>
              <p className="text-green-600 font-semibold mt-1">₹{book.price}</p>
              <span className="inline-block text-xs bg-gray-100 px-2 py-1 rounded mt-1">
                {book.category}
              </span>
            </div>

            <button
              onClick={() => addToCart(book)}
              className="mt-4 bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-2">
        {[...Array(pages).keys()].map((x) => (
          <button
            key={x + 1}
            onClick={() => fetchBooks(x + 1)}
            className={`px-3 py-1 rounded border ${
              x + 1 === page
                ? "bg-orange-500 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {x + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Home;
