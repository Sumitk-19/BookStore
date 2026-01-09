import { useEffect, useState } from "react";
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
          limit: 6,
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
            <p>{book.author}</p>
            <p>₹{book.price}</p>
            <p>{book.category}</p>

             <button onClick={() => addToCart(book)}>
               Add to Cart
             </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div style={styles.pagination}>
        {[...Array(pages).keys()].map((x) => (
          <button
            key={x + 1}
            onClick={() => fetchBooks(x + 1)}
            style={{
              ...styles.pageBtn,
              background: x + 1 === page ? "#333" : "#fff",
              color: x + 1 === page ? "#fff" : "#000",
            }}
          >
            {x + 1}
          </button>
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
  pagination: {
    marginTop: "20px",
    display: "flex",
    gap: "8px",
    justifyContent: "center",
  },
  pageBtn: {
    padding: "6px 12px",
    cursor: "pointer",
    border: "1px solid #ccc",
  },
};

export default Home;
