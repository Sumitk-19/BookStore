import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <PageWrapper>
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="backdrop-blur-xl bg-white/70 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/30">

          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Login to <span className="text-orange-500">BookNest</span>
          </h2>

          {error && (
            <p className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4 text-center">
              {error}
            </p>
          )}

          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                type="email"
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Password</label>
              <input
                type="password"
                className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition shadow-md"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-center mt-4 text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-orange-500 font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}

export default Login;
