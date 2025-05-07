// src/context/AuthContext.js
import React, { createContext, useState, useContext } from "react";

// Create the context
const AuthContext = createContext();

// AuthProvider component to provide authentication state globally
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Log the user in (e.g., after successful login)
  const login = (userData) => {
    setUser(userData);
  };

  // Log the user out
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
