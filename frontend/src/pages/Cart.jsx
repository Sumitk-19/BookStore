import React from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Cart() {
  const { cartItems, removeFromCart, increaseQty, decreaseQty } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const checkout = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link to="/" className="text-orange-500 font-semibold hover:underline">
          Browse Books
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* Left: Cart Items */}
      <div className="md:col-span-2 space-y-4">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

        {cartItems.map((item) => (
          <div
            key={item._id}
            className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-500">₹{item.price}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => decreaseQty(item._id)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                −
              </button>

              <span className="font-medium">{item.quantity}</span>

              <button
                onClick={() => increaseQty(item._id)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>

            <button
              onClick={() => removeFromCart(item._id)}
              className="text-red-500 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Right: Order Summary */}
      <div className="bg-white p-6 rounded-lg shadow h-fit">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
        <p className="mb-2">Total Items: {cartItems.length}</p>
        <p className="font-bold text-lg mb-4">Total: ₹{total}</p>

        <button
  onClick={() => navigate("/checkout")}
  className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
>
  Proceed to Checkout
</button>
      </div>
    </div>
  );
}

export default Cart;
