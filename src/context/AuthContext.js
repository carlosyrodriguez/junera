"use client";
import React, { createContext, useState, useEffect } from 'react';
import jwt from 'jsonwebtoken'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwt.decode(token);
        if (decoded && decoded.username && decoded.id) { // Check if decoded, username, and id exist
          setUser({ token, username: decoded.username, id: decoded.id }); // Ensure 'id' is included
        }
      } catch (error) {
        console.error("Token decoding failed:", error);
        setUser(null);
      }
    }
    setLoading(false); // Set loading to false after verification
  }, []);

  const login = (token, username, id) => { // Accept id as a parameter
    localStorage.setItem('token', token);
    setUser({ token, username, id }); // Include username and id
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}> {/* Provide loading */}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
