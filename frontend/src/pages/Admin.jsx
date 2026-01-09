import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Admin() {
  const { token, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Protect route (UX-level)
  useEffect(() => {
    if (!loading && !isAdmin) navigate("/");
  }, [loading, isAdmin, navigate]);

  const fetchBooks = async () => {
    try {
      const { data } = await api.get("/books");
      setBooks(data.books);
    } catch {
      setError("Failed to load books");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const deleteBook = async (id) => {
    if (!window.confirm("Delete this book?")) return;
    try {
      await api.delete(`/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Book deleted");
      fetchBooks();
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed");
    }
  };

  const startEdit = (book) => {
    setEditingBook({ ...book });
    setMessage("");
    setError("");
  };

  const cancelEdit = () => setEditingBook(null);

  const updateBook = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/books/${editingBook._id}`, editingBook, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Book updated");
      setEditingBook(null);
      fetchBooks();
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: 16 }}>
      <h2>Admin – Manage Books</h2>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* EDIT FORM */}
      {editingBook && (
        <form onSubmit={updateBook} style={styles.form}>
          <h3>Edit Book</h3>
          <input
            value={editingBook.title}
            onChange={(e) => setEditingBook({ ...editingBook, title: e.target.value })}
            placeholder="Title"
            required
          />
          <input
            value={editingBook.author}
            onChange={(e) => setEditingBook({ ...editingBook, author: e.target.value })}
            placeholder="Author"
            required
          />
          <input
            value={editingBook.price}
            onChange={(e) => setEditingBook({ ...editingBook, price: e.target.value })}
            placeholder="Price"
            required
          />
          <input
            value={editingBook.category}
            onChange={(e) => setEditingBook({ ...editingBook, category: e.target.value })}
            placeholder="Category"
            required
          />
          <input
            value={editingBook.stock}
            onChange={(e) => setEditingBook({ ...editingBook, stock: e.target.value })}
            placeholder="Stock"
            required
          />
          <input
            value={editingBook.image || ""}
            onChange={(e) => setEditingBook({ ...editingBook, image: e.target.value })}
            placeholder="Image URL"
          />
          <textarea
            value={editingBook.description}
            onChange={(e) => setEditingBook({ ...editingBook, description: e.target.value })}
            placeholder="Description"
            required
          />
          <div style={{ display: "flex", gap: 8 }}>
            <button type="submit">Update</button>
            <button type="button" onClick={cancelEdit}>Cancel</button>
          </div>
        </form>
      )}

      {/* BOOK LIST */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>₹</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b._id}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.price}</td>
              <td>{b.category}</td>
              <td>{b.stock}</td>
              <td>
                <button onClick={() => startEdit(b)}>Edit</button>
                <button onClick={() => deleteBook(b._id)} style={{ marginLeft: 8 }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  form: {
    maxWidth: 420,
    border: "1px solid #ddd",
    padding: 12,
    marginBottom: 16,
    display: "grid",
    gap: 8,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
};

export default Admin;
