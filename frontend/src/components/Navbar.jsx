import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const logoutHandler = () => {
    logout();
    navigate("/login");
  };

  return (
   <nav className="sticky top-0 z-50 bg-white shadow-sm">
  <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

    {/* Logo */}
    <Link to="/" className="text-2xl font-bold text-orange-500 hover:opacity-90">
      BookNest
    </Link>

    {/* Right Section */}
    <div className="flex items-center gap-6 text-sm font-medium">

      {isAuthenticated && (
        <>
          <span className="text-gray-700">Hi, {user?.name || "User"}</span>

          <Link to="/orders" className="hover:text-orange-500 transition">
            My Orders
          </Link>

           {user?.isAdmin && (
          <Link to="/admin" className="hover:text-orange-500 transition font-semibold">
            Admin Panel
          </Link>
          )}

          <Link to="/cart" className="relative hover:text-orange-500 transition">
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            onClick={logoutHandler}
            className="bg-orange-500 text-white px-4 py-1.5 rounded-md hover:bg-orange-600 transition"
          >
            Logout
          </button>
        </>
      )}

      {!isAuthenticated && (
        <Link
          to="/login"
          className="bg-orange-500 text-white px-4 py-1.5 rounded-md hover:bg-orange-600 transition"
        >
          Login
        </Link>
      )}

    </div>
  </div>
</nav>

  );
}

export default Navbar;
