import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import UserDetail from "../pages/UserDetail";
import Shops from "../pages/Shops";
import ShopDetail from "../pages/ShopDetail";
import CreateShop from "../pages/CreateShop";
import Payments from "../pages/Payments";
import PaymentDetail from "../pages/PaymentDetail";
import Feedback from "../pages/Feedback";
import FeedbackDetail from "../pages/FeedbackDetail";
import AuditLogs from "../pages/AuditLogs";
import Settings from "../pages/Settings";
import Layout from "../components/Layout";
import { useAuth } from "../auth/AuthContext";

const AdminProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return null;
    if (!user || user.role !== "admin") return <Navigate to="/" replace />;
    return children;
};

const AdminPublicRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return null;
    if (user && user.role === "admin") return <Navigate to="/dashboard" replace />;
    return children;
};

export default function AppRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <AdminPublicRoute>
                        <Login />
                    </AdminPublicRoute>
                }
            />

            {/* Unified Obsidian Layout */}
            <Route
                element={
                    <AdminProtectedRoute>
                        <Layout />
                    </AdminProtectedRoute>
                }
            >
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/:uid" element={<UserDetail />} />
                <Route path="/shops" element={<Shops />} />
                <Route path="/shops/create" element={<CreateShop />} />
                <Route path="/shops/:id" element={<ShopDetail />} />
                <Route path="/payments" element={<Payments />} />
                <Route path="/payments/:id" element={<PaymentDetail />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/feedback/:id" element={<FeedbackDetail />} />
                <Route path="/audit-logs" element={<AuditLogs />} />
                <Route path="/settings" element={<Settings />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
