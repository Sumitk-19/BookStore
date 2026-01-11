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
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-orange-50 to-white rounded-2xl mb-12">
        <div className="px-6 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-700">
              Discover Books That Shape Your Future
            </span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Explore curated collections across Technology, Fiction, and Self-Help.
            Find your next great read in seconds.
          </p>

          <form
            onSubmit={submitHandler}
            className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-3 flex flex-col md:flex-row gap-3"
          >
            <input
              type="text"
              placeholder="Search by title or author…"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border focus:ring-2 focus:ring-orange-400 outline-none"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-3 rounded-xl border focus:ring-2 focus:ring-orange-400 outline-none"
            >
              <option value="">All Categories</option>
              <option value="Self Help">Self Help</option>
              <option value="Fiction">Fiction</option>
              <option value="Technology">Technology</option>
            </select>

            <button className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-600 transition">
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Loading / Error */}
      {loading && <p className="text-center">Loading books...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            className="group bg-white rounded-xl p-4 shadow-md 
                       hover:shadow-2xl hover:-translate-y-2
                       transition-all duration-300 border border-transparent 
                       hover:border-orange-200"
          >

            <img
              src={book.image}
              alt={book.title}
              className="w-full h-48 object-contain mb-3 transition-transform duration-300 group-hover:scale-105"
            />


            <h3 className="text-lg font-bold group-hover:text-orange-500 transition">
              {book.title}
            </h3>

            <p className="text-sm text-gray-600">{book.author}</p>

            <p className="text-green-600 font-semibold mt-1">₹{book.price}</p>

            <span className="inline-block mt-1 text-xs bg-gray-100 px-2 py-1 rounded">
              {book.category}
            </span>

            <button
              onClick={() => addToCart(book)}
              className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg 
                         font-semibold hover:bg-orange-600
                         transition transform group-hover:scale-105"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 gap-2">
        {[...Array(pages).keys()].map((x) => (
          <button
            key={x + 1}
            onClick={() => fetchBooks(x + 1)}
            className={`px-3 py-1 rounded-lg border ${
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
