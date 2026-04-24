
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    // useEffect(() => {
    //     if (!user?.email) return;
    //     fetch("http://localhost:3000/orders")
    //         .then(res => res.json())
    //         .then(data => setOrders(data.filter(o => o.email === user.email)))
    //         .catch(err => console.error(err));
    // }, [user]);
    useEffect(() => {
        if (!user?.email) return;

        fetch(`http://localhost:3000/orders/my-orders?email=${user.email}`)
            .then(res => res.json())
            .then(data => setOrders(data))
            .catch(err => console.error(err));
    }, [user?.email]);

    if (!user) return <p>Loading user info...</p>;
    if (!orders.length) return <p>No orders yet.</p>;

    // Total amount calculate
    const totalAmount = orders.reduce((sum, o) => sum + o.orderPrice, 0);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">My Orders</h2>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto mb-4">
                {/* <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 border">Product</th>
                            <th className="px-4 py-2 border">Quantity</th>
                            <th className="px-4 py-2 border">Total Price</th>
                            <th className="px-4 py-2 border">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(o => (
                            <tr key={o._id} className="text-center border-t">
                                <td className="px-4 py-2 border">{o.productTitle}</td>
                                <td className="px-4 py-2 border">{o.quantity}</td>
                                <td className="px-4 py-2 border">${o.orderPrice}</td>
                                <td className="px-4 py-2 border">{o.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table> */}


                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 border">Order ID</th>
                        <th className="px-4 py-2 border">Product</th>
                        <th className="px-4 py-2 border">Quantity</th>
                        <th className="px-4 py-2 border">Total Price</th>
                        <th className="px-4 py-2 border">Status</th>
                        <th className="px-4 py-2 border">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(o => (
                        <tr key={o._id} className="text-center border-t">
                            <td className="px-4 py-2 border text-xs">{o._id}</td>
                            <td className="px-4 py-2 border">{o.productTitle}</td>
                            <td className="px-4 py-2 border">{o.quantity}</td>
                            <td className="px-4 py-2 border">${o.orderPrice}</td>
                            <td className="px-4 py-2 border">{o.status}</td>
                            <td className="px-4 py-2 border">
                                <button
                                    onClick={() => navigator.clipboard.writeText(o._id)}
                                    className="btn btn-xs btn-outline"
                                >
                                    Copy ID
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>


            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
                {orders.map(o => (
                    <div key={o._id} className="border p-4 rounded shadow bg-white">
                        <p><strong>Product:</strong> {o.productTitle}</p>
                        <p><strong>Quantity:</strong> {o.quantity}</p>
                        <p><strong>Total Price:</strong> ${o.orderPrice}</p>
                        <p><strong>Status:</strong> {o.status}</p>
                    </div>
                ))}
            </div>

            {/* Total Amount */}
            <div className="mt-6 p-4 bg-gray-100 rounded text-lg font-semibold text-right">
                Total Amount: ${totalAmount}
            </div>
        </div>
    );
};

export default MyOrders;
