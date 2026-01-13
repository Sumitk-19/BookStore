import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

function Checkout() {
  const { cartItems, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  // Guard routes
  useEffect(() => {
    if (!isAuthenticated) navigate("/login", { replace: true });
    if (cartItems.length === 0) navigate("/cart", { replace: true });
  }, [isAuthenticated, cartItems, navigate]);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const placeOrderHandler = async () => {
    if (Object.values(address).some((v) => v.trim() === "")) {
      alert("Please fill all delivery details");
      return;
    }

    const orderPayload = {
      orderItems: cartItems.map((item) => ({
        book: item._id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      })),
      totalAmount: total,
      shippingAddress: address,
    };

    try {
      const { data } = await api.post("/orders", orderPayload);

      clearCart();

      // Small delay to avoid PrivateRoute race condition
      setTimeout(() => {
        navigate(`/order-success/${data._id}`, { replace: true });
      }, 100);
    } catch (error) {
      console.error("Order error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Order failed. Please try again.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* Address Form */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Delivery Details</h2>
        <div className="space-y-3">
          <input className="input" name="name" placeholder="Full Name" onChange={handleChange} />
          <input className="input" name="phone" placeholder="Mobile Number" onChange={handleChange} />
          <textarea className="input" name="address" placeholder="Full Address" onChange={handleChange} />
          <input className="input" name="city" placeholder="City" onChange={handleChange} />
          <input className="input" name="state" placeholder="State" onChange={handleChange} />
          <input className="input" name="pincode" placeholder="Pincode" onChange={handleChange} />
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        {cartItems.map((item) => (
          <div key={item._id} className="flex justify-between border-b py-2 text-sm">
            <span>{item.title} × {item.quantity}</span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}

        <div className="flex justify-between font-bold text-lg mt-4">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        <button
          onClick={placeOrderHandler}
          className="mt-6 w-full bg-orange-500 text-white py-3 rounded-lg text-lg hover:bg-orange-600 transition"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Checkout;
