
// //30-01-2026


// import { useEffect, useState } from "react";

// const ManageUsers = () => {
//     const [users, setUsers] = useState([]);

//     // Fetch all users
//     const fetchUsers = async () => {
//         const res = await fetch("http://localhost:3000/users");
//         const data = await res.json();
//         setUsers(data);
//     };

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     // Update user role
//     const handleUpdate = async (id, role) => {
//         const newRole = prompt("Enter new role (admin/manager/buyer):", role);
//         if (!newRole) return;

//         await fetch(`http://localhost:3000/users/${id}`, {
//             method: "PATCH",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ role: newRole }),
//         });
//         fetchUsers(); // refresh
//     };

//     // Suspend user
//     const handleSuspend = async (id) => {
//         if (!window.confirm("Are you sure to suspend this user?")) return;
//         await fetch(`http://localhost:3000/users/${id}`, {
//             method: "PATCH",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ status: "suspended" }),
//         });
//         fetchUsers(); // refresh
//     };

//     return (
//         <div>
//             <h2>Manage Users</h2>
//             <table border="1" cellPadding="5" cellSpacing="0">
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Role</th>
//                         <th>Status</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.map(u => (
//                         <tr key={u._id}>
//                             <td>{u.name}</td>
//                             <td>{u.email}</td>
//                             <td>{u.role}</td>
//                             <td>{u.status || "active"}</td>
//                             <td>
//                                 <button onClick={() => handleUpdate(u._id, u.role)}>Update</button>
//                                 <button onClick={() => handleSuspend(u._id)}>Suspend</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default ManageUsers;






//new 2 


import { useEffect, useState } from "react";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newRole, setNewRole] = useState("");
    const [suspendId, setSuspendId] = useState(null);

    const fetchUsers = async () => {
        const res = await fetch("http://localhost:3000/users");
        const data = await res.json();
        setUsers(data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleOpenModal = (user) => {
        setSelectedUser(user);
        setNewRole(user.role);
        setShowModal(true);
    };

    const handleModalSubmit = async () => {
        await fetch(`http://localhost:3000/users/${selectedUser._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ role: newRole }),
        });

        alert("User role updated successfully "); // 

        setShowModal(false);
        fetchUsers();
    };

    const handleSuspend = async () => {
        await fetch(`http://localhost:3000/users/${suspendId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "suspended" }),
        });

        alert("User suspended successfully "); // 

        setSuspendId(null);
        fetchUsers();
    };

    return (
        <div className="p-4 md:p-8">
            <h2 className="text-2xl font-bold mb-6">Manage Users</h2>

            {/* table wrapper responsive */}
            <div className="overflow-x-auto bg-white rounded-xl shadow">
                <table className="min-w-full text-sm md:text-base">
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
                                <td className="p-3 break-all">{u.email}</td>
                                <td className="p-3 capitalize">{u.role}</td>
                                <td className="p-3">
                                    <span
                                        className={`px-2 py-1 rounded text-xs font-semibold ${u.status === "suspended"
                                            ? "bg-red-100 text-red-600"
                                            : "bg-green-100 text-green-600"
                                            }`}
                                    >
                                        {u.status || "active"}
                                    </span>
                                </td>
                                <td className="p-3 flex gap-2 flex-wrap">
                                    <button
                                        onClick={() => handleOpenModal(u)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                    >
                                        Update
                                    </button>

                                    <button
                                        onClick={() => setSuspendId(u._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Suspend
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Update modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-sm rounded-xl p-6 shadow">
                        <h3 className="text-lg font-semibold mb-4">Update Role</h3>

                        <select
                            value={newRole}
                            onChange={(e) => setNewRole(e.target.value)}
                            className="w-full border p-2 rounded mb-4"
                        >
                            <option value="admin">Admin</option>
                            <option value="manager">Manager</option>
                            <option value="buyer">Buyer</option>
                        </select>

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={handleModalSubmit}
                                className="bg-green-500 text-white px-4 py-2 rounded"
                            >
                                Save
                            </button>

                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-300 px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Suspend modal */}
            {suspendId && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-sm rounded-xl p-6 shadow">
                        <h3 className="text-lg font-semibold mb-4">
                            Confirm suspend user?
                        </h3>

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={handleSuspend}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Yes
                            </button>

                            <button
                                onClick={() => setSuspendId(null)}
                                className="bg-gray-300 px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageUsers;
