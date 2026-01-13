import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { FaShoppingCart, FaRegUser } from "react-icons/fa";

function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  const logoutHandler = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-orange-500">
          BookNest
        </Link>

        <div className="flex items-center gap-6">

          {!isAuthenticated && (
            <>
              <Link to="/login" className="hover:text-orange-500">Login</Link>
              <Link to="/register" className="hover:text-orange-500">Register</Link>
            </>
          )}

          {isAuthenticated && (
            <>
              {/* Cart Icon */}
              <Link to="/cart" className="relative">
                <FaShoppingCart className="text-xl" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link to="/orders" className="hover:text-orange-500">
                My Orders
              </Link>

              {isAdmin && (
                <Link to="/admin" className="hover:text-orange-500 font-semibold">
                  Admin
                </Link>
              )}

              {/* User Name + Logout */}
              <div className="flex items-center gap-2">
                <FaRegUser className="text-xl text-gray-600" />
                <span className="font-medium">{user?.name}</span>

                <button
                  onClick={logoutHandler}
                  className="ml-2 bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600"
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
