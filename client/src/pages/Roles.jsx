import { useState, useEffect } from "react";
import API from "../api";
import Dashboard from "./Dashboard";

export default function RoleList() {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    API.get("/roles")
      .then((res) => setRoles(res.data))
      .catch((err) => console.error("Failed to fetch roles", err));
  }, []);

  return (
    <>
      <Dashboard />
      {/* Roles Table */}
      <div className="p-8 pt-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Role List</h1>
        </div>
        <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
          <table className="w-full table-auto">
            <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
              <tr>
                <th className="px-4 py-3">Role ID</th>
                <th className="px-4 py-3">Role Name</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Privileges</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
              {roles.map((role) => (
                <tr key={role.role_id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3">{role.role_id}</td>
                  <td className="px-4 py-3">{role.name}</td>
                  <td className="px-4 py-3">
                    {role.description || "No description"}
                  </td>
                  <td className="px-4 py-3 whitespace-pre-wrap">
                    {role.Privileges?.length > 0 ? (
                        <span>
                        {role.Privileges.map((priv) => `${priv.action}`).join(', ')}
                        </span>
                    ) : (
                        <span className="text-gray-400">No privileges</span>
                    )}
                    </td>
                </tr>
              ))}
              {roles.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-3 text-center text-gray-500"
                  >
                    No roles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}