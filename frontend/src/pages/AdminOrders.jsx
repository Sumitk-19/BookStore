import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) navigate("/");
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get("/orders");
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/orders/${id}`, { status });
      fetchOrders();
    } catch {
      alert("Failed to update order status");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Order Management</h1>

      {loading ? (
        <p className="text-center">Loading orders...</p>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Total</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
                <th className="p-3">Shipping</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-t">
                  <td className="p-3 font-mono text-xs">{order._id}</td>
                  <td className="p-3">{order.user?.name}</td>
                  <td className="p-3 text-green-600 font-semibold">₹{order.totalAmount}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3">{new Date(order.createdAt).toLocaleDateString()}</td>

                  <td className="p-3 text-xs">
                    <p className="font-semibold">{order.shippingAddress?.name}</p>
                    <p>{order.shippingAddress?.phone}</p>
                    <p>
                      {order.shippingAddress?.address}, {order.shippingAddress?.city},
                      {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
                    </p>
                  </td>

                  <td className="p-3 text-center space-x-2">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="px-3 py-1 bg-gray-700 text-white rounded text-xs"
                    >
                      View
                    </button>

                    <button
                      disabled={order.status === "Delivered"}
                      onClick={() => updateStatus(order._id, "Shipped")}
                      className={`px-3 py-1 rounded text-xs text-white ${
                        order.status === "Delivered"
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-blue-500 hover:bg-blue-600"
                      }`}
                    >
                      Ship
                    </button>

                    <button
                      disabled={order.status === "Delivered"}
                      onClick={() => updateStatus(order._id, "Delivered")}
                      className={`px-3 py-1 rounded text-xs text-white ${
                        order.status === "Delivered"
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      Deliver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL */}
      {selectedOrder && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    <div className="bg-white w-full max-w-md rounded-xl shadow-2xl p-6 relative">

      {/* Close */}
      <button
        onClick={() => setSelectedOrder(null)}
        className="absolute top-3 right-3 text-gray-400 hover:text-black text-xl"
      >
        ✕
      </button>

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Order Details</h2>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            selectedOrder.status === "Delivered"
              ? "bg-green-100 text-green-700"
              : selectedOrder.status === "Shipped"
              ? "bg-blue-100 text-blue-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {selectedOrder.status}
        </span>
      </div>

      {/* Items */}
      <div className="space-y-2 text-sm mb-4">
        {selectedOrder.orderItems.map((item, i) => (
         <div key={i} className="flex justify-between border-b pb-1">
          <span>{item.title} × {item.quantity}</span>
          <span className="font-medium">
              ₹{item.price * item.quantity}
          </span>
         </div>
    ))}

      </div>

      {/* Total */}
      <div className="flex justify-between font-bold text-lg border-t pt-3 mb-4">
        <span>Total</span>
        <span className="text-green-600">₹{selectedOrder.totalAmount}</span>
      </div>

      {/* Shipping */}
      <div className="text-sm">
        <p className="font-semibold mb-1">Shipping Address</p>
        <p>{selectedOrder.shippingAddress?.name}</p>
        <p>{selectedOrder.shippingAddress?.phone}</p>
        <p className="text-gray-600">
          {selectedOrder.shippingAddress?.address},{" "}
          {selectedOrder.shippingAddress?.city},{" "}
          {selectedOrder.shippingAddress?.state} -{" "}
          {selectedOrder.shippingAddress?.pincode}
        </p>
      </div>

      <div className="mt-5 flex justify-end">
        <button
          onClick={() => setSelectedOrder(null)}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}


    </div>
  );
}

export default AdminOrders;
