import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

function Cart() {
  const { cartItems, increaseQty, decreaseQty, removeFromCart, totalAmount } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <PageWrapper>
        <p className="text-center mt-20 text-gray-300 text-lg">Your cart is empty.</p>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="grid md:grid-cols-3 gap-6">

        {/* Cart Items */}
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-3xl font-bold mb-4 text-white">Shopping Cart</h2>

          {cartItems.map((item) => (
            <div
              key={item._id}
              className="backdrop-blur-xl bg-white/70 rounded-xl shadow-lg p-4 flex gap-4 items-center hover:shadow-2xl transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-28 object-contain rounded"
              />

              <div className="flex-1">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-500">₹{item.price}</p>

                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => decreaseQty(item._id)}
                    className="px-3 py-1 border rounded hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span className="font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => increaseQty(item._id)}
                    className="px-3 py-1 border rounded hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item._id)}
                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="backdrop-blur-xl bg-white/70 p-6 rounded-xl shadow-lg h-fit">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>

          <p className="flex justify-between mb-2">
            <span>Total Items</span>
            <span>{cartItems.reduce((sum, i) => sum + i.quantity, 0)}</span>
          </p>

          <p className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span className="text-green-600">₹{totalAmount}</span>
          </p>

          <button
            onClick={() => navigate("/checkout")}
            className="mt-5 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Proceed to Checkout
          </button>
        </div>

      </div>
    </PageWrapper>
  );
}

export default Cart;
