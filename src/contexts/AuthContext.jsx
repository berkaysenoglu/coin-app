import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const login = (userData) => {
    setUser(userData);
    sessionStorage.setItem("user", JSON.stringify(userData));
  };
  const register = (userData) => {
    setUser(userData);
    sessionStorage.setItem("user", JSON.stringify(userData));
  };
  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
  };
  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
