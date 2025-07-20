import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function AddUserForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role_id: "",
    host: "",
  });

  const [roles, setRoles] = useState([]);
  const [loadingRoles, setLoadingRoles] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  useEffect(() => {
    API.get("/roles")
      .then((res) => {
        setRoles(res.data);
        setLoadingRoles(false);
      })
      .catch(() => {
        setError("Failed to load roles.");
        setLoadingRoles(false);
      });
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!formData.username || !formData.password || !formData.role_id || !formData.host) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const res = await API.post("/users", formData);
      setSuccessMsg(res.data.message || "User created successfully!");
      setFormData({ username: "", password: "", role_id: "", host: "" });
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create user.");
    }
  };

  if (loadingRoles) return <p>Loading roles...</p>;

  return (
    <div className="relative min-h-screen bg-gray-50 px-4 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Back button fixed top-left */}
      <button
        onClick={() => navigate("/dashboard")}
        className="absolute shadow-md top-4 left-4 px-4 py-2 bg-white hover:bg-gray-100 rounded-md text-gray-700 transition"
      >
        &larr; Back to Dashboard
      </button>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full"
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          Add New User
        </h2>

        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
        {successMsg && <div className="mb-4 text-green-600 text-center">{successMsg}</div>}

        <label className="block mb-4">
          <span className="text-gray-700 font-medium mb-1 block">Username</span>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-800
                       focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Enter username"
            required
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700 font-medium mb-1 block">Password</span>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-800
                       focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Enter password"
            required
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700 font-medium mb-1 block">Role</span>
          <select
            name="role_id"
            value={formData.role_id}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-800
                       focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            required
          >
            <option value="" disabled>
              -- Select Role --
            </option>
            {roles.map((role) => (
              <option key={role.role_id} value={role.role_id}>
                {role.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block mb-6">
          <span className="text-gray-700 font-medium mb-1 block">Host</span>
          <input
            type="text"
            name="host"
            value={formData.host}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-800
                       focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="%"
            required
          />
        </label>

        <button
          type="submit"
          className="w-full bg-[#2d69ff] hover:bg-[#4c83ff] text-white font-semibold py-2 rounded-md
                     transition-colors duration-300"
        >
          Create User
        </button>
      </form>
    </div>
  );
}