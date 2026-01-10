import React from "react";
import { useParams, Link } from "react-router-dom";

function OrderSuccess() {
  const { id } = useParams();

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-xl shadow-lg text-center max-w-md w-full">
        
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 text-green-600 w-16 h-16 flex items-center justify-center rounded-full text-3xl">
            ✓
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Order Placed Successfully!
        </h2>

        <p className="text-gray-600 mb-4">
          Thank you for shopping with <span className="font-semibold">BookNest</span>.
        </p>

        <div className="bg-gray-100 p-3 rounded mb-5">
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="font-mono text-sm break-all">{id}</p>
        </div>

        <Link to="/orders">
          <button className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition">
            View My Orders
          </button>
        </Link>

        <Link to="/" className="block mt-3 text-sm text-orange-500 hover:underline">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;
