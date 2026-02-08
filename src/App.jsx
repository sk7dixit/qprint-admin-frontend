import React from "react";
import { AuthProvider } from "./auth/AuthContext";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./app/routes";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
