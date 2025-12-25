
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (!user?.email) return;
        fetch("http://localhost:3000/orders")
            .then(res => res.json())
            .then(data => setOrders(data.filter(o => o.email === user.email)))
            .catch(err => console.error(err));
    }, [user]);

    if (!user) return <p>Loading user info...</p>;
    if (!orders.length) return <p>No orders yet.</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">My Orders</h2>
            <table className="table-auto w-full border">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(o => (
                        <tr key={o._id}>
                            <td>{o.productTitle}</td>
                            <td>{o.quantity}</td>
                            <td>${o.orderPrice}</td>
                            <td>{o.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyOrders;
