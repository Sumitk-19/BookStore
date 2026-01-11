import React, { useEffect, useState } from "react";

function BookModal({ show, onClose, onSave, book }) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    price: "",
    category: "",
    stock: "",
    image: "",
  });

  useEffect(() => {
    if (book) setForm(book);
  }, [book]);

  if (!show) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg relative">
        <button onClick={onClose} className="absolute right-3 top-2 text-xl">✕</button>
        <h2 className="text-xl font-bold mb-4">{book ? "Edit Book" : "Add New Book"}</h2>

        <form onSubmit={submitHandler} className="space-y-3">
          <input name="title" placeholder="Title" value={form.title} onChange={handleChange} className="input" />
          <input name="author" placeholder="Author" value={form.author} onChange={handleChange} className="input" />
          <input name="price" placeholder="Price" value={form.price} onChange={handleChange} className="input" />
          <input name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} className="input" />

          <select name="category" value={form.category} onChange={handleChange} className="input">
            <option value="">Select Category</option>
            <option>Self Help</option>
            <option>Fiction</option>
            <option>Technology</option>
          </select>

          <input type="file" accept="image/*" onChange={handleImage} />

          {form.image && (
            <img src={form.image} alt="Preview" className="h-40 mx-auto rounded shadow" />
          )}

          <button className="w-full bg-orange-500 text-white py-2 rounded">
            {book ? "Update Book" : "Add Book"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookModal;
