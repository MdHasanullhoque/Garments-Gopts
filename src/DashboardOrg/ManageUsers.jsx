import React, { useEffect, useState } from "react";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);

    // useEffect(() => {
    //     fetch("http://localhost:3000/users")
    //         .then(res => res.json())
    //         .then(data => setUsers(data));
    // }, []);

    // useEffect(() => {
    //     fetch("http://localhost:3000/users")
    //         .then(res => {
    //             if (!res.ok) {
    //                 throw new Error("Network response was not ok");
    //             }
    //             return res.json();
    //         })
    //         .then(data => setUsers(data))
    //         .catch(err => console.error("Fetch error:", err));
    // }, []);

    useEffect(() => {
        fetch("http://localhost:3000/users")
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => setUsers(data))
            .catch(err => console.error("Fetch error details:", err.message));
    }, []);

    const updateUser = (id, role, status) => {
        fetch(`http://localhost:3000/users/${id}`, {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ role, status }),
        })
            .then(res => res.json())
            .then(updated => {
                setUsers(users.map(u => u._id === id ? updated : u));
            });
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Manage Users</h2>

            <table className="table w-full">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name || "N/A"}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>

                            <td className="space-x-2">
                                <button
                                    className="btn btn-xs btn-success"
                                    onClick={() =>
                                        updateUser(user._id, user.role, "approved")
                                    }
                                >
                                    Approve
                                </button>

                                <button
                                    className="btn btn-xs btn-warning"
                                    onClick={() =>
                                        updateUser(user._id, "manager", user.status)
                                    }
                                >
                                    Make Manager
                                </button>

                                <button
                                    className="btn btn-xs btn-error"
                                    onClick={() =>
                                        updateUser(user._id, user.role, "suspended")
                                    }
                                >
                                    Suspend
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageUsers;
