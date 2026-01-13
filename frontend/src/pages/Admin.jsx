import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import BookModal from "../components/BookModal";

function Admin() {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const { data } = await api.get("/books?limit=1000");
    setBooks(data.books);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this book?")) return;

    const token = localStorage.getItem("token");

    await api.delete(`/books/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchBooks();
  };

  const saveBookHandler = async (formData) => {
    try {
      const token = localStorage.getItem("token");

      if (selectedBook) {
        // Edit
        await api.put(`/books/${selectedBook._id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        // Add
        await api.post("/books", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      setShowModal(false);
      setSelectedBook(null);
      fetchBooks();
    } catch (error) {
      console.error(error);
      alert("Failed to save book");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <Link
        to="/admin/orders"
        className="inline-block mb-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
      >
        Manage All Orders
      </Link>

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        <button
          onClick={() => {
            setSelectedBook(null);
            setShowModal(true);
          }}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          + Add New Book
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Title</th>
              <th className="p-3">Author</th>
              <th className="p-3">Price</th>
              <th className="p-3">Category</th>
              <th className="p-3">Stock</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id} className="border-t">
                <td className="p-3">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="h-14 w-10 object-cover rounded shadow"
                  />
                </td>
                <td className="p-3 font-medium">{book.title}</td>
                <td className="p-3">{book.author}</td>
                <td className="p-3 text-green-600">₹{book.price}</td>
                <td className="p-3">{book.category}</td>
                <td className="p-3">{book.stock}</td>
                <td className="p-3 flex justify-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedBook(book);
                      setShowModal(true);
                    }}
                    className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BookModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedBook(null);
        }}
        onSave={saveBookHandler}
        book={selectedBook}
      />
    </div>
  );
}

export default Admin;
