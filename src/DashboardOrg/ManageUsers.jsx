


// import { useEffect, useState } from "react";

// const ManageUsers = () => {
//     const [users, setUsers] = useState([]);
//     const [showModal, setShowModal] = useState(false);
//     const [selectedUser, setSelectedUser] = useState(null);
//     const [newRole, setNewRole] = useState("");
//     const [suspendId, setSuspendId] = useState(null);

//     // ================== Step 2 ==================
//     // Suspend modal input fields
//     const [suspendReason, setSuspendReason] = useState(""); // reason input
//     const [suspendFeedback, setSuspendFeedback] = useState(""); // feedback textarea
//     // ===========================================

//     const fetchUsers = async () => {
//         const res = await fetch("http://localhost:3000/users");
//         const data = await res.json();
//         setUsers(data);
//     };

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     const handleOpenModal = (user) => {
//         setSelectedUser(user);
//         setNewRole(user.role);
//         setShowModal(true);
//     };

//     const handleModalSubmit = async () => {
//         await fetch(`http://localhost:3000/users/${selectedUser._id}`, {
//             method: "PATCH",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ role: newRole }),
//         });

//         alert("User role updated successfully "); //  Step 2 alert

//         setShowModal(false);
//         fetchUsers();
//     };

//     // ================== Step 2 ==================
//     // handle suspend with reason & feedback
//     const handleSuspend = async () => {
//         await fetch(`http://localhost:3000/users/${suspendId}`, {
//             method: "PATCH",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//                 status: "suspended",
//                 suspendReason,
//                 suspendFeedback
//             }),
//         });

//         alert("User suspended with reason "); // 👈 Step 2 alert

//         // reset modal state
//         setSuspendId(null);
//         setSuspendReason("");
//         setSuspendFeedback("");
//         fetchUsers();
//     };
//     // ===========================================

//     return (
//         <div className="p-4 md:p-8">
//             <h2 className="text-2xl font-bold mb-6">Manage Users</h2>

//             {/* table wrapper responsive */}
//             <div className="overflow-x-auto bg-white rounded-xl shadow">
//                 <table className="min-w-full text-sm md:text-base">
//                     <thead className="bg-gray-100">
//                         <tr>
//                             <th className="p-3 text-left">Name</th>
//                             <th className="p-3 text-left">Email</th>
//                             <th className="p-3 text-left">Role</th>
//                             <th className="p-3 text-left">Status</th>
//                             <th className="p-3 text-left">Actions</th>
//                         </tr>
//                     </thead>

//                     <tbody>
//                         {users.map((u) => (
//                             <tr key={u._id} className="border-t">
//                                 <td className="p-3">{u.name}</td>
//                                 <td className="p-3 break-all">{u.email}</td>
//                                 <td className="p-3 capitalize">{u.role}</td>
//                                 <td className="p-3">
//                                     <span
//                                         className={`px-2 py-1 rounded text-xs font-semibold ${u.status === "suspended"
//                                             ? "bg-red-100 text-red-600"
//                                             : "bg-green-100 text-green-600"
//                                             }`}
//                                     >
//                                         {u.status || "active"}
//                                     </span>
//                                 </td>
//                                 <td className="p-3 flex gap-2 flex-wrap">
//                                     <button
//                                         onClick={() => handleOpenModal(u)}
//                                         className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
//                                     >
//                                         Update
//                                     </button>

//                                     {/* Step 2: Suspend button triggers modal */}
//                                     <button
//                                         onClick={() => setSuspendId(u._id)}
//                                         className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                                     >
//                                         Suspend
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Update modal */}
//             {showModal && (
//                 <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
//                     <div className="bg-white w-full max-w-sm rounded-xl p-6 shadow">
//                         <h3 className="text-lg font-semibold mb-4">Update Role</h3>

//                         <select
//                             value={newRole}
//                             onChange={(e) => setNewRole(e.target.value)}
//                             className="w-full border p-2 rounded mb-4"
//                         >
//                             <option value="admin">Admin</option>
//                             <option value="manager">Manager</option>
//                             <option value="buyer">Buyer</option>
//                         </select>

//                         <div className="flex justify-end gap-2">
//                             <button
//                                 onClick={handleModalSubmit}
//                                 className="bg-green-500 text-white px-4 py-2 rounded"
//                             >
//                                 Save
//                             </button>

//                             <button
//                                 onClick={() => setShowModal(false)}
//                                 className="bg-gray-300 px-4 py-2 rounded"
//                             >
//                                 Cancel
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* ================== Step 2 ================== */}
//             {/* Suspend modal with Reason + Feedback */}
//             {suspendId && (
//                 <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
//                     <div className="bg-white w-full max-w-sm rounded-xl p-6 shadow">
//                         <h3 className="text-lg font-semibold mb-4">
//                             Suspend User
//                         </h3>

//                         {/* Reason input */}
//                         <input
//                             type="text"
//                             placeholder="Reason"
//                             value={suspendReason}
//                             onChange={(e) => setSuspendReason(e.target.value)}
//                             className="w-full border p-2 rounded mb-2"
//                         />

//                         {/* Feedback textarea */}
//                         <textarea
//                             placeholder="Feedback"
//                             value={suspendFeedback}
//                             onChange={(e) => setSuspendFeedback(e.target.value)}
//                             className="w-full border p-2 rounded mb-4"
//                         />

//                         <div className="flex justify-end gap-2">
//                             <button
//                                 onClick={handleSuspend} // 👈 Step 2 submit
//                                 className="bg-red-500 text-white px-4 py-2 rounded"
//                             >
//                                 Submit
//                             </button>

//                             <button
//                                 onClick={() => setSuspendId(null)}
//                                 className="bg-gray-300 px-4 py-2 rounded"
//                             >
//                                 Cancel
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//             {/* =========================================== */}
//         </div>
//     );
// };

// export default ManageUsers;



import { useEffect, useState } from "react";

const ManageUsers = () => {
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
        const res = await fetch("http://localhost:3000/users");
        const data = await res.json();
        setUsers(data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // ================= Open role update modal =================
    const handleOpenModal = (user) => {
        setSelectedUser(user);
        setNewRole(user.role);
        setShowModal(true);
    };

    // ================= Update role =================
    const handleModalSubmit = async () => {
        await fetch(`http://localhost:3000/users/${selectedUser._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ role: newRole }),
        });

        alert("User role updated successfully");
        setShowModal(false);
        fetchUsers();
    };

    // ================= Suspend user =================
    const handleSuspend = async () => {
        await fetch(`http://localhost:3000/users/${suspendId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                status: "suspended",
                suspendReason,
                suspendFeedback,
            }),
        });

        alert("User suspended successfully");

        // modal reset
        setSuspendId(null);
        setSuspendReason("");
        setSuspendFeedback("");
        fetchUsers();
    };

    // ================= Unsuspend user =================
    // const handleUnsuspend = async (id) => {
    //     await fetch(`http://localhost:3000/users/${id}`, {
    //         method: "PATCH",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({
    //             status: "active",
    //             suspendReason: "",
    //             suspendFeedback: "",
    //         }),
    //     });

    //     alert("User unsuspended successfully");
    //     fetchUsers();
    // };

    const handleUnsuspend = async (id) => {
        const res = await fetch(`http://localhost:3000/users/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                status: "active",
                suspendReason: "",
                suspendFeedback: "",
            }),
        });

        const updatedUser = await res.json(); // backend থেকে updated user

        alert("User unsuspended successfully");

        fetchUsers();

        // ================== Update AuthContext if current user ==================
        if (updatedUser.uid === user?.uid) {
            setUser(updatedUser);
        }
    };


    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

            {/* ================= User Table ================= */}
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

                                {/* Status badge */}
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

                                {/* Actions */}
                                <td className="p-3 flex gap-2">
                                    {/* Role update */}
                                    <button
                                        onClick={() => handleOpenModal(u)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded"
                                    >
                                        Update
                                    </button>

                                    {/* Suspend / Unsuspend toggle */}
                                    <button
                                        onClick={() =>
                                            u.status === "suspended"
                                                ? handleUnsuspend(u._id)
                                                : setSuspendId(u._id)
                                        }
                                        className={`px-3 py-1 rounded text-white ${u.status === "suspended"
                                            ? "bg-green-500"
                                            : "bg-red-500"
                                            }`}
                                    >
                                        {u.status === "suspended"
                                            ? "Unsuspend"
                                            : "Suspend"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ================= Role Update Modal ================= */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                    <div className="bg-white p-6 rounded w-80">
                        <h3 className="font-semibold mb-3">Update Role</h3>

                        <select
                            value={newRole}
                            onChange={(e) => setNewRole(e.target.value)}
                            className="w-full border p-2 mb-4"
                        >
                            <option value="admin">Admin</option>
                            <option value="manager">Manager</option>
                            <option value="buyer">Buyer</option>
                        </select>

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={handleModalSubmit}
                                className="bg-green-500 text-white px-3 py-1 rounded"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-300 px-3 py-1 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ================= Suspend Modal ================= */}
            {suspendId && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                    <div className="bg-white p-6 rounded w-80">
                        <h3 className="font-semibold mb-3">Suspend User</h3>

                        <input
                            placeholder="Reason"
                            value={suspendReason}
                            onChange={(e) => setSuspendReason(e.target.value)}
                            className="w-full border p-2 mb-2"
                        />

                        <textarea
                            placeholder="Feedback"
                            value={suspendFeedback}
                            onChange={(e) => setSuspendFeedback(e.target.value)}
                            className="w-full border p-2 mb-4"
                        />

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={handleSuspend}
                                className="bg-red-500 text-white px-3 py-1 rounded"
                            >
                                Submit
                            </button>
                            <button
                                onClick={() => setSuspendId(null)}
                                className="bg-gray-300 px-3 py-1 rounded"
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
