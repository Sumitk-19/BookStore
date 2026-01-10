import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load from localStorage on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }

    setLoading(false);
  }, []);

  // Login (API based)
  const login = async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });

    setUser(data);
    setToken(data.token);

    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("token", data.token);
  };

  // Register
  const register = async (name, email, password) => {
    const { data } = await api.post("/auth/register", { name, email, password });

    setUser(data);
    setToken(data.token);

    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("token", data.token);
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        loading,
        isAuthenticated: !!token,
        isAdmin: user?.isAdmin || false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
