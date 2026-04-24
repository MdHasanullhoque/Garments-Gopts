import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const PendingOrders = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    const handleStatus = async (id, status) => {
    await fetch(`https://server-gopts-bzds.vercel.app/orders/${id}/status`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "x-email": user.email
        },
        body: JSON.stringify({ status })
    });
    setOrders(prev => prev.filter(o => o._id !== id));
};

    useEffect(() => {
        
        if (!user?.email) return;

        fetch("https://server-gopts-bzds.vercel.app/orders/pending", {
            headers: {
                "x-email": user.email
            }
        })
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setOrders(data);
                else setOrders([]);
            })
            .catch(() => setOrders([]));
    }, [user?.email]);

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Pending Orders</h2>

            {orders.length === 0 ? (
                <p>No pending orders</p>
            ) : (
                <table className="table w-full border">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>User</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    {/* <tbody>
                        {orders.map(o => (
                            <tr key={o._id}>
                                <td>{o.productTitle}</td>
                                <td>{o.email}</td>
                                <td>${o.orderPrice}</td>
                                <td>{o.status}</td>
                            </tr>
                        ))}
                    </tbody> */}
                    <tbody>
                        {orders.map(o => (
                            <tr key={o._id}>
                                <td>{o.productTitle}</td>
                                <td>{o.email}</td>
                                <td>${o.orderPrice}</td>
                                <td>{o.status}</td>
                                <td>
                                    <button
                                        onClick={() => handleStatus(o._id, "Approved")}
                                        className="btn btn-success btn-sm mr-2"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleStatus(o._id, "Rejected")}
                                        className="btn btn-error btn-sm"
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

export default PendingOrders;
