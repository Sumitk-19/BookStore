import React from "react";
import { useParams, Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

function OrderSuccess() {
  const { id } = useParams();

  return (
    <PageWrapper>
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="backdrop-blur-lg bg-white/70 border border-white/40 
                        p-10 rounded-2xl shadow-xl text-center max-w-md w-full
                        hover:shadow-2xl transition-all duration-300">

          {/* Success Icon */}
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 text-green-600 w-16 h-16 flex items-center justify-center rounded-full text-3xl shadow">
              ✓
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Order Placed Successfully!
          </h2>

          <p className="text-gray-600 mb-4">
            Thank you for shopping with <span className="font-semibold">BookNest</span>.
          </p>

          <div className="bg-white/60 backdrop-blur p-3 rounded-lg mb-5 border">
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
    </PageWrapper>
  );
}

export default OrderSuccess;
