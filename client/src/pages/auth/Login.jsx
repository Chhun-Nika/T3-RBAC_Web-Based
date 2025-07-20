import React from "react";
import { LuShield } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import API from "../../api";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { setToken } from "../../utils/auth";

export default function Login() {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/auth/login", { username, password });
            const token = res.data.token;
            setToken(token);
            setAuth(jwtDecode(token));
            // setAuth(token); 
            setError("");
            alert("Login Successfully!");
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data.error || "Login Failed!")
        }

    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-sm space-y-4"
            >
                <div className="block space-y-5">
                    <div className="flex items-center justify-center h-10">
                        <LuShield className="text-3xl text-gray" />
                    </div>
                    <h2 className="text-3xl font-semibold text-center text-gray-800">
                        Welcome to RBAC
                    </h2>
                    <p className="text-sm text-center text-gray-600 mt-2 mb-6">
                        Role-Based Acess Control for managing users, roles, and secure access.
                    </p>
                </div>

                {/* add error start */}
                {error && (
                    <p className="text-red-500 text-sm text-center transition-all">
                        {error}
                    </p>
                )}

                {/* ask for username */}
                <input 
                    type="text" 
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />

                {/* input password */}
                <input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />

                {/* login btn */}
                <button
                    type="submit"
                    className="w-full bg-[#2d69ff] hover:bg-[#4c83ff] text-white py-2 rounded-lg font-medium transition"
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}