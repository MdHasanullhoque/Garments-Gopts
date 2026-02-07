

import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const AllOrders = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState("all");
    const [loading, setLoading] = useState(true);

    // Fetch all orders
    const fetchOrders = () => {
        if (!user?.email) return;
        setLoading(true);
        fetch("http://localhost:3000/orders", {
            headers: { "x-email": user.email },
        })
            .then(res => res.json())
            .then(data => setOrders(Array.isArray(data) ? data : []))
            .catch(err => {
                console.error(err);
                setOrders([]);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchOrders();
    }, [user?.email]);

    const filteredOrders = filter === "all"
        ? orders
        : orders.filter(o => o.status.toLowerCase() === filter.toLowerCase());

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const res = await fetch(`http://localhost:3000/orders/${orderId}/status`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "x-email": user.email,
                },
                body: JSON.stringify({ status: newStatus }),
            });
            const data = await res.json();
            if (res.ok) {
                fetchOrders(); // reload orders after update
            } else {
                alert(data.message);
            }
        } catch (err) {
            console.error(err);
            alert("Failed to update order");
        }
    };

    if (loading) return <p className="p-4">Loading orders...</p>;

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">All Orders (Admin)</h2>

            {/* Filter */}
            <div className="mb-4">
                <label className="mr-2 font-semibold">Filter by Status:</label>
                <select
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                    className="input input-bordered"
                >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="table-auto border border-gray-300 w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-2 py-1">Order ID</th>
                            <th className="border px-2 py-1">User</th>
                            <th className="border px-2 py-1">Product</th>
                            <th className="border px-2 py-1">Quantity</th>
                            <th className="border px-2 py-1">Total Price</th>
                            <th className="border px-2 py-1">Status</th>
                            <th className="border px-2 py-1">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center p-4">
                                    No orders found.
                                </td>
                            </tr>
                        ) : (
                            filteredOrders.map(order => (
                                <tr key={order._id}>
                                    <td className="border px-2 py-1">{order._id}</td>
                                    <td className="border px-2 py-1">{order.email}</td>
                                    <td className="border px-2 py-1">{order.productTitle}</td>
                                    <td className="border px-2 py-1">{order.quantity}</td>
                                    <td className="border px-2 py-1">{order.orderPrice}</td>
                                    <td className="border px-2 py-1">{order.status}</td>
                                    <td className="border px-2 py-1 space-x-2">
                                        <button
                                            className="btn btn-sm btn-success"
                                            onClick={() => handleStatusChange(order._id, "Approved")}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            className="btn btn-sm btn-error"
                                            onClick={() => handleStatusChange(order._id, "Rejected")}
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllOrders;
