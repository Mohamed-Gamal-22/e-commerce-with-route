import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  return localStorage.getItem("authToken") ? (
    // <Outlet />
    children
  ) : (
    <Navigate to="/login" />
  );
}
