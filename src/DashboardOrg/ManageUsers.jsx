// import React, { useEffect, useState } from "react";

// const ManageUsers = () => {
//     const [users, setUsers] = useState([]);

//     // useEffect(() => {
//     //     fetch("http://localhost:3000/users")
//     //         .then(res => res.json())
//     //         .then(data => setUsers(data));
//     // }, []);

//     // useEffect(() => {
//     //     fetch("http://localhost:3000/users")
//     //         .then(res => {
//     //             if (!res.ok) {
//     //                 throw new Error("Network response was not ok");
//     //             }
//     //             return res.json();
//     //         })
//     //         .then(data => setUsers(data))
//     //         .catch(err => console.error("Fetch error:", err));
//     // }, []);

//     useEffect(() => {
//         fetch("http://localhost:3000/users")
//             .then(res => {
//                 if (!res.ok) {
//                     throw new Error(`HTTP error! status: ${res.status}`);
//                 }
//                 return res.json();
//             })
//             .then(data => setUsers(data))
//             .catch(err => console.error("Fetch error details:", err.message));
//     }, []);

//     const updateUser = (id, role, status) => {
//         fetch(`http://localhost:3000/users/${id}`, {
//             method: "PATCH",
//             headers: { "content-type": "application/json" },
//             body: JSON.stringify({ role, status }),
//         })
//             .then(res => res.json())
//             .then(updated => {
//                 setUsers(users.map(u => u._id === id ? updated : u));
//             });
//     };

//     return (
//         <div className="p-6">
//             <h2 className="text-xl font-bold mb-4">Manage Users</h2>

//             <table className="table w-full">
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Role</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>

//                 <tbody>
//                     {users.map(user => (
//                         <tr key={user._id}>
//                             <td>{user.name || "N/A"}</td>
//                             <td>{user.email}</td>
//                             <td>{user.role}</td>

//                             <td className="space-x-2">
//                                 <button
//                                     className="btn btn-xs btn-success"
//                                     onClick={() =>
//                                         updateUser(user._id, user.role, "approved")
//                                     }
//                                 >
//                                     Approve
//                                 </button>

//                                 <button
//                                     className="btn btn-xs btn-warning"
//                                     onClick={() =>
//                                         updateUser(user._id, "manager", user.status)
//                                     }
//                                 >
//                                     Make Manager
//                                 </button>

//                                 <button
//                                     className="btn btn-xs btn-error"
//                                     onClick={() =>
//                                         updateUser(user._id, user.role, "suspended")
//                                     }
//                                 >
//                                     Suspend
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default ManageUsers;




//30-01-2026


import { useEffect, useState } from "react";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);

    // Fetch all users
    const fetchUsers = async () => {
        const res = await fetch("http://localhost:3000/users");
        const data = await res.json();
        setUsers(data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Update user role
    const handleUpdate = async (id, role) => {
        const newRole = prompt("Enter new role (admin/manager/buyer):", role);
        if (!newRole) return;

        await fetch(`http://localhost:3000/users/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ role: newRole }),
        });
        fetchUsers(); // refresh
    };

    // Suspend user
    const handleSuspend = async (id) => {
        if (!window.confirm("Are you sure to suspend this user?")) return;
        await fetch(`http://localhost:3000/users/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "suspended" }),
        });
        fetchUsers(); // refresh
    };

    return (
        <div>
            <h2>Manage Users</h2>
            <table border="1" cellPadding="5" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u._id}>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>{u.role}</td>
                            <td>{u.status || "active"}</td>
                            <td>
                                <button onClick={() => handleUpdate(u._id, u.role)}>Update</button>
                                <button onClick={() => handleSuspend(u._id)}>Suspend</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;
