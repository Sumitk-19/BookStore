import React, { useEffect, useState } from "react";
import api from "../api/axios";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      const { data } = await api.get("/orders/my-orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white rounded-lg shadow p-5 mb-6 border"
        >
          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-semibold">{order._id}</p>
            </div>

            <span
              className={`px-3 py-1 text-sm rounded-full ${
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
            <p><strong>Total:</strong> ₹{order.totalAmount}</p>
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
            <p><strong>Items:</strong> {order.orderItems.length}</p>
          </div>

          <div className="border-t pt-3">
            <p className="font-semibold mb-2">Items</p>
            <ul className="space-y-1 text-sm">
              {order.orderItems.map((item, idx) => (
                <li key={idx} className="flex justify-between">
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
  );
}

export default Orders;
