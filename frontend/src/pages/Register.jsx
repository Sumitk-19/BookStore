import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      navigate("/");
    } catch (err) {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <PageWrapper>
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="backdrop-blur-lg bg-white/70 border border-white/40 
                        p-8 rounded-2xl shadow-xl w-full max-w-md
                        hover:shadow-2xl transition-all duration-300">

          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Create Your BookNest Account
          </h2>

          {error && (
            <p className="bg-red-100/70 text-red-600 text-sm p-2 rounded mb-4 border">
              {error}
            </p>
          )}

          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Name</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white/70"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                type="email"
                className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white/70"
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
                className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white/70"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              Register
            </button>
          </form>

          <p className="text-sm text-center mt-4 text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-orange-500 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}

export default Register;
