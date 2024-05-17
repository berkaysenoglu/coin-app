import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import PublicRoute from "./utils/PublicRoute.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
