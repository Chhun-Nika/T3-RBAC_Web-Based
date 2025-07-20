

import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import API from "../api"; // <--- use your configured Axios instance
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function Dashboard() {
    const [summary, setSummary] = useState({ users: 0, roles: 0, privileges: 0 });

    useEffect(() => {
        API.get("/summary")
        .then((res) => setSummary(res.data))
        .catch((err) => console.error("Error fetching summary", err));
    }, []);
    
    const [loading, setLoading] = useState(false);
    const [actionType, setActionType] = useState(null); // 'backup' or 'restore'

    const handleBackup = async () => {
        setLoading(true);
        setActionType("backup");
        try {
        const res = await API.post("/backup");
        alert(res.data.message || "Backup successful!");
        } catch (err) {
        console.error(err);
        alert("Backup failed.");
        } finally {
        setLoading(false);
        setActionType(null);
        }
    };

    const handleRestore = async () => {
        const targetDb = prompt("Enter the name of the new database to restore into:");
        if (!targetDb) return;

        setLoading(true);
        setActionType("restore");
        try {
        const res = await API.post("/backup/restore", { database: targetDb });
        alert(res.data.message || "Restore successful!");
        } catch (err) {
        console.error(err);
        alert("Restore failed.");
        } finally {
        setLoading(false);
        setActionType(null);
        }
    };



    return (
        <>
            <NavBar />
            <div className="p-8 pb-0">
                <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

                {/* Summary Section */}
                {/* Summary Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mb-10">
                    <SummaryCard title="Users" count={summary.users} href="/users" />
                    <SummaryCard title="Roles" count={summary.roles} href="/roles" />
                    <SummaryCard title="Privileges" count={summary.privileges} href="/privileges" />

                    <div className="flex flex-col bg-white shadow-md rounded-xl p-4 justify-between">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">
                            DB Tools
                        </h2>
                        <p className="text-sm text-gray-500 mb-4">
                            Backup and recover the hospital database.
                        </p>
                        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                            {/* <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full sm:w-auto">
                                Backup
                            </button>
                            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md w-full sm:w-auto">
                                Recovery
                            </button> */}
                            <button
                                onClick={handleBackup}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
                                disabled={loading}
                            >
                                {loading && actionType === "backup" ? (
                                <Loader2 className="animate-spin w-5 h-5" />
                                ) : (
                                "Backup"
                                )}
                            </button>

                            <button
                                onClick={handleRestore}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
                                disabled={loading}
                            >
                                {loading && actionType === "restore" ? (
                                <Loader2 className="animate-spin w-5 h-5" />
                                ) : (
                                "Restore"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function SummaryCard({ title, count, href }) {
    return (
        // <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-200">
        //     <h2 className="text-m font-semibold text-gray-700 mb-2">{title}</h2>
        //     <p className="text-3xl font-bold text-blue-600">{count}</p>
        // </div>
        <Link
        to={href}
        className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-200"
        >
            <h2 className="text-xl font-semibold text-gray-700 mb-2">{title}</h2>
            <p className="text-3xl font-bold text-blue-600">{count}</p>
        </Link>
    );
}