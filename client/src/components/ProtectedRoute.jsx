import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NotFound from "../pages/NotFound";

export default function ProtectedRoute ({ children }) {
    const { auth, loading } = useAuth();
    if (loading) return <div>Loading...</div>;

    if(!auth) {
        // replace: don’t allow user to go back to the protected page after redirect.
        <Navigate to="/" replace/>
        return <NotFound/>
    }
    return children;
}