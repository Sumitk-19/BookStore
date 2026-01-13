import React, { useEffect, useState } from "react";
import api from "../api/axios";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await api.get("/orders/my-orders");
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">My Orders</h1>

        {orders.length === 0 && (
          <p className="text-gray-500 text-center">No orders placed yet.</p>
        )}

        {orders.map((order) => (
          <div
            key={order._id}
            className="backdrop-blur-lg bg-white/70 border border-white/40 
                       rounded-2xl p-6 mb-6 shadow-lg 
                       hover:shadow-2xl hover:-translate-y-1 
                       transition-all duration-300"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-xs text-gray-500">Order ID</p>
                <p className="font-mono text-sm font-semibold break-all">
                  {order._id}
                </p>
              </div>

              <span
                className={`px-3 py-1 text-xs rounded-full font-semibold animate-pulse ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : order.status === "Shipped"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* Meta Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
              <p>
                <strong>Total:</strong> ₹{order.totalAmount}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p>
                <strong>Items:</strong> {order.orderItems.length}
              </p>
            </div>

            {/* Items */}
            <div className="border-t pt-3">
              <p className="font-semibold mb-2 text-gray-700">Items</p>
              <ul className="space-y-1 text-sm">
                {order.orderItems.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between text-gray-700"
                  >
                    <span>
                      {item.title} × {item.quantity}
                    </span>
                    <span>
                      ₹{Number(item.price || 0) * Number(item.quantity || 0)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
