import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const PendingOrders = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (!user?.email) return;

        fetch("https://server-gopts.vercel.app/orders?status=Pending", {
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
                    <tbody>
                        {orders.map(o => (
                            <tr key={o._id}>
                                <td>{o.productTitle}</td>
                                <td>{o.email}</td>
                                <td>${o.orderPrice}</td>
                                <td>{o.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PendingOrders;
