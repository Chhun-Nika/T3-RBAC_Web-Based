import { LuShield } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import { useAuth } from "../context/AuthContext";
import { isAuthenticated } from "../utils/auth";

export default function NavBar() {
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        setAuth(null);
        navigate("/");
    };
    return (
        <nav className="sticky top-0 bg-white text-white pl-6 pr-6 pt-4 pb-4 shadow-lg z-10 flex justify-between">
            <div className="flex items-center gap-6">
                <LuShield className="text-3xl text-gray-700" />
                <div>
                    <h2 className="text-xl font-semibold text-gray-700 cursor-pointer">RBAC</h2>
                    <p className="text-sm text-gray-500 font-medium">Role-Based Access Control</p>
                </div>
            </div> 
            {isAuthenticated() ? (
                <div className="flex items-center gap-4 ml-6">
                    <div className="flex flex-col items-end mr-6">
                        <span className="text-sm text-gray-600">
                            Logged in as <strong>{auth.username}</strong>
                        </span>
                        <span className="text-sm text-blue-500 font-semibold">{auth.role}</span>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                        Log out
                    </button>
                </div>
            ) : null}
            
        </nav>
    );
}