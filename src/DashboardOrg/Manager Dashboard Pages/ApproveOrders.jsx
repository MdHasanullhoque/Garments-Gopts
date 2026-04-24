import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const ApproveOrders = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (!user?.email) return;

        fetch("http://localhost:3000/orders/approved", {
            headers: {
                "x-email": user.email, //  MUST
            },
        })
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setOrders(data);
                } else {
                    console.error("Not array:", data);
                    setOrders([]);
                }
            })
            .catch(() => setOrders([]));
    }, [user?.email]);

    const updateStatus = (id, status) => {
        fetch(`http://localhost:3000/orders/${id}/status`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "x-email": user.email,
            },
            body: JSON.stringify({ status }),
        })
            .then(res => res.json())
            .then(() => {
                // remove from list instantly
                setOrders(prev => prev.filter(o => o._id !== id));
            });
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Approve Orders</h2>

            {orders.length === 0 ? (
                <p>No pending orders</p>
            ) : (
                <table className="table w-full border">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>User</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(o => (
                            <tr key={o._id}>
                                <td>{o.productTitle}</td>
                                <td>{o.email}</td>
                                <td>${o.orderPrice}</td>
                                <td className="space-x-2">
                                    <button
                                        onClick={() => updateStatus(o._id, "Approved")}
                                        className="btn btn-success btn-xs"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => updateStatus(o._id, "Rejected")}
                                        className="btn btn-error btn-xs"
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ApproveOrders;
