import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { isAuthenticated, isAdmin, logout } = useAuth();
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
        <Link to="/" className="text-2xl font-bold text-orange-500">
          BookNest
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-5 text-sm font-medium">
          {!isAuthenticated && (
            <>
              <Link to="/login" className="hover:text-orange-500">Login</Link>
              <Link to="/register" className="hover:text-orange-500">Register</Link>
            </>
          )}

          {isAuthenticated && (
            <>
              <Link to="/cart" className="hover:text-orange-500">
                Cart ({cartCount})
              </Link>

              <Link to="/orders" className="hover:text-orange-500">
                My Orders
              </Link>

              {isAdmin && (
                <Link to="/admin" className="hover:text-orange-500">
                  Admin
                </Link>
              )}

              <button
                onClick={logoutHandler}
                className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
