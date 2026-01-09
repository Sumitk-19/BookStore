import { useEffect, useState } from "react";
import api from "../api/axios";

function Home() {
  const [books, setBooks] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await api.get("/books", {
        params: {
          keyword: keyword || undefined,
          category: category || undefined,
        },
      });

      setBooks(data.books);
    } catch (err) {
      setError("Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    fetchBooks();
  };

  return (
    <div>
      <h1>BookNest</h1>
      <p>Browse our collection</p>

      {/* Search + Filter */}
      <form onSubmit={submitHandler} style={styles.filter}>
        <input
          type="text"
          placeholder="Search by title or author"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Self Help">Self Help</option>
          <option value="Fiction">Fiction</option>
          <option value="Technology">Technology</option>
        </select>

        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading books...</p>}
      {error && <p>{error}</p>}

      <div style={styles.grid}>
        {books.map((book) => (
          <div key={book._id} style={styles.card}>
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>₹{book.price}</p>
            <p>{book.category}</p>
            <p>Stock: {book.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  filter: {
    display: "flex",
    gap: "10px",
    margin: "20px 0",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "16px",
  },
  card: {
    border: "1px solid #ddd",
    padding: "12px",
    borderRadius: "6px",
  },
};

export default Home;
