import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../api/axios";

function Admin() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const { data } = await api.get("/books");
    setBooks(data.books || data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this book?")) return;
    await api.delete(`/books/${id}`);
    fetchBooks();
  };

  const handleEdit = async (book) => {
    const title = prompt("Title", book.title);
    const price = prompt("Price", book.price);
    const stock = prompt("Stock", book.stock);

    if (!title || !price || !stock) return;

    await api.put(`/books/${book._id}`, {
      title,
      price,
      stock,
    });

    fetchBooks();
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <Link
       to="/admin/orders"
       className="inline-block mb-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
    >
        Manage All Orders
      </Link>

      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
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
                <td className="p-3 font-medium">{book.title}</td>
                <td className="p-3">{book.author}</td>
                <td className="p-3 text-green-600">₹{book.price}</td>
                <td className="p-3">{book.category}</td>
                <td className="p-3">{book.stock}</td>
                <td className="p-3 flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(book)}
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
    </div>
  );
}

export default Admin;
