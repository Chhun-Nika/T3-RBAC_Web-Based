import { useState, useEffect } from "react";
import API from "../api";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";

export default function UserList() {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    
        useEffect(() => {
            API.get("/users")
                .then((res) => setUsers(res.data))
                .catch(err => console.error("Failed to fetch users", err));
        }, []);
    
        const handleDelete = async (userId) => {
            const confirmDelete = window.confirm("Are you sure you want to delete this user?");
            if (!confirmDelete) return;

            try {
                await API.delete(`/users/${userId}`);
                setUsers(users.filter(user => user.user_id !== userId));
            } catch (err) {
                console.error("Failed to delete user", err);
                alert("Failed to delete user. Please try again.");
            }
        };
                const handleAddUser = async () => {
            navigate("/add-user");
        }
        const handleEdit = async (id) =>{
            navigate(`/edit-user/${id}`);
        }
    return (
        <>
            <Dashboard/>
            {/* Users Table */}
                <div className="p-8 pt-0">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">User List</h1>
                        <button
                            className="bg-[#2d69ff] hover:bg-[#4c83ff] text-white px-4 py-2 rounded-md transition font-semibold"
                            onClick={handleAddUser}
                        >
                            Add User
                        </button>
                    </div>
                    <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
                        <table className="w-full table-auto">
                            <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
                                <tr>
                                    <th className="px-4 py-3">ID</th>
                                    <th className="px-4 py-3">Username</th>
                                    <th className="px-4 py-3">Host</th>
                                    <th className="px-4 py-3">Role</th>
                                    <th className="px-4 py-3">Description</th>
                                    <th className="px-4 py-3">Created At</th>
                                    <th className="px-4 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
                                {users.map(user => (
                                    <tr key={user.user_id} className="hover:bg-gray-50 transition">
                                        <td className="px-4 py-3">{user.user_id}</td>
                                        <td className="px-4 py-3">{user.username}</td>
                                        <td className="px-4 py-3">{user.host}</td>
                                        <td className="px-4 py-3">{user.Role?.name || "No role"}</td>
                                        <td className="px-4 py-3">{user.Role?.description || "No description"}</td>
                                        <td className="px-4 py-3">
                                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                                        </td>
                                        <td className="px-4 py-3 space-x-2">
                                            <button
                                                className="bg-[#4a90ff] hover:bg-[#397ae6] text-white px-3 py-1 rounded-md transition"
                                                onClick={() => handleEdit(user.user_id)}
                                                >
                                                Edit
                                                </button>
                                                <button
                                                className="bg-[#e03b3b] hover:bg-[#c73232] text-white px-3 py-1 rounded-md transition"
                                                onClick={() => handleDelete(user.user_id)}
                                                >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
        </>
    )
}