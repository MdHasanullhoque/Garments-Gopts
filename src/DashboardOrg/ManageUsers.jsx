import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
const ManageUsers = () => {
    const { user } = useContext(AuthContext);

    // ================= State =================
    const [users, setUsers] = useState([]);

    // Role update modal
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newRole, setNewRole] = useState("");

    // Suspend modal
    const [suspendId, setSuspendId] = useState(null);
    const [suspendReason, setSuspendReason] = useState("");
    const [suspendFeedback, setSuspendFeedback] = useState("");

    // ================= Fetch all users =================
    const fetchUsers = async () => {
        console.log("Fetching with email:", user?.email);
        const res = await fetch("https://server-gopts-bzds.vercel.app/users", {
            headers: {
                "x-email": user.email
            }
        });
        const data = await res.json();
        if (Array.isArray(data)) setUsers(data);
    };

    useEffect(() => {
        if (!user?.email) return;
        fetchUsers();
    }, [user?.email]);

    // ================= Open role update modal =================
    const handleOpenModal = (u) => {
        setSelectedUser(u);
        setNewRole(u.role);
        setShowModal(true);
    };

    // ================= Update role =================
    const handleModalSubmit = async () => {
        await fetch(`https://server-gopts-bzds.vercel.app/users/${selectedUser._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "x-email": user.email
            },
            body: JSON.stringify({ role: newRole }),
        });
        alert("User role updated successfully");
        setShowModal(false);
        fetchUsers();
    };

    // ================= Suspend user =================
    const handleSuspend = async () => {
        await fetch(`https://server-gopts-bzds.vercel.app/users/${suspendId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "x-email": user.email
            },
            body: JSON.stringify({
                status: "suspended",
                suspendReason,
                suspendFeedback,
            }),
        });
        alert("User suspended successfully");
        setSuspendId(null);
        setSuspendReason("");
        setSuspendFeedback("");
        fetchUsers();
    };

    const handleUnsuspend = async (id) => {
        await fetch(`https://server-gopts-bzds.vercel.app/users/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "x-email": user.email
            },
            body: JSON.stringify({
                status: "active",
                suspendReason: "",
                suspendFeedback: "",
            }),
        });
        alert("User unsuspended successfully");
        fetchUsers();
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

            <div className="overflow-x-auto bg-white shadow rounded">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-left">Role</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u._id} className="border-t">
                                <td className="p-3">{u.name}</td>
                                <td className="p-3">{u.email}</td>
                                <td className="p-3 capitalize">{u.role}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 rounded text-xs font-semibold ${u.status === "suspended" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
                                        {u.status || "active"}
                                    </span>
                                </td>
                                <td className="p-3 flex gap-2">
                                    <button onClick={() => handleOpenModal(u)} className="bg-blue-500 text-white px-3 py-1 rounded">
                                        Update
                                    </button>
                                    <button
                                        onClick={() => u.status === "suspended" ? handleUnsuspend(u._id) : setSuspendId(u._id)}
                                        className={`px-3 py-1 rounded text-white ${u.status === "suspended" ? "bg-green-500" : "bg-red-500"}`}
                                    >
                                        {u.status === "suspended" ? "Unsuspend" : "Suspend"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Role Update Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                    <div className="bg-white p-6 rounded w-80">
                        <h3 className="font-semibold mb-3">Update Role</h3>
                        <select value={newRole} onChange={(e) => setNewRole(e.target.value)} className="w-full border p-2 mb-4">
                            <option value="admin">Admin</option>
                            <option value="manager">Manager</option>
                            <option value="buyer">Buyer</option>
                        </select>
                        <div className="flex justify-end gap-2">
                            <button onClick={handleModalSubmit} className="bg-green-500 text-white px-3 py-1 rounded">Save</button>
                            <button onClick={() => setShowModal(false)} className="bg-gray-300 px-3 py-1 rounded">Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Suspend Modal */}
            {suspendId && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                    <div className="bg-white p-6 rounded w-80">
                        <h3 className="font-semibold mb-3">Suspend User</h3>
                        <input placeholder="Reason" value={suspendReason} onChange={(e) => setSuspendReason(e.target.value)} className="w-full border p-2 mb-2" />
                        <textarea placeholder="Feedback" value={suspendFeedback} onChange={(e) => setSuspendFeedback(e.target.value)} className="w-full border p-2 mb-4" />
                        <div className="flex justify-end gap-2">
                            <button onClick={handleSuspend} className="bg-red-500 text-white px-3 py-1 rounded">Submit</button>
                            <button onClick={() => setSuspendId(null)} className="bg-gray-300 px-3 py-1 rounded">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageUsers;