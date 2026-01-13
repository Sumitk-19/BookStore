import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cartItems, increaseQty, decreaseQty, removeFromCart, totalAmount } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return <p className="text-center mt-10 text-gray-500">Your cart is empty.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 grid md:grid-cols-3 gap-6">

      {/* Cart Items */}
      <div className="md:col-span-2 space-y-4">
        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>

        {cartItems.map((item) => (
          <div key={item._id} className="bg-white rounded-lg shadow p-4 flex gap-4 items-center">
            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-28 object-contain"
            />

            <div className="flex-1">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-500">₹{item.price}</p>

              <div className="flex items-center gap-3 mt-2">
                <button onClick={() => decreaseQty(item._id)} className="px-2 border">−</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQty(item._id)} className="px-2 border">+</button>
              </div>
            </div>

            <button
              onClick={() => removeFromCart(item._id)}
              className="rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-white p-6 rounded-lg shadow h-fit">
        <h3 className="text-xl font-bold mb-4">Order Summary</h3>

        <p className="flex justify-between mb-2">
          <span>Total Items</span>
          <span>{cartItems.length}</span>
        </p>

        <p className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>₹{totalAmount}</span>
        </p>

        <button
          onClick={() => navigate("/checkout")}
          className="mt-5 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
