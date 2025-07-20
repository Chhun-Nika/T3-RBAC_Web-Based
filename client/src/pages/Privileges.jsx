import { useState, useEffect } from "react";
import API from "../api";
import Dashboard from "./Dashboard";

export default function PrivilegeList() {
  const [privileges, setPrivileges] = useState([]);

  useEffect(() => {
    API.get("/privileges")
      .then((res) => setPrivileges(res.data))
      .catch((err) => console.error("Failed to fetch privileges", err));
  }, []);

  return (
    <>
      <Dashboard />
      {/* Privileges Table */}
      <div className="p-8 pt-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Privilege List</h1>
        </div>
        <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
          <table className="w-full table-auto">
            <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
              <tr>
                <th className="px-4 py-3">Privilege ID</th>
                <th className="px-4 py-3">Resource</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
              {privileges.map((priv) => (
                <tr key={priv.privilege_id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3">{priv.privilege_id}</td>
                  <td className="px-4 py-3">({priv.resource}) on all Tables</td>
                  <td className="px-4 py-3 capitalize">{priv.action}</td>
                </tr>
              ))}
              {privileges.length === 0 && (
                <tr>
                  <td colSpan="3" className="px-4 py-3 text-center text-gray-500">
                    No privileges found.
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