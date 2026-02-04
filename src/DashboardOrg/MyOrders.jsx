
// import React, { useEffect, useState, useContext } from "react";
// import { AuthContext } from "../context/AuthProvider";

// const MyOrders = () => {
//     const { user } = useContext(AuthContext);
//     const [orders, setOrders] = useState([]);

//     useEffect(() => {
//         if (!user?.email) return;
//         fetch("http://localhost:3000/orders")
//             .then(res => res.json())
//             .then(data => setOrders(data.filter(o => o.email === user.email)))
//             .catch(err => console.error(err));
//     }, [user]);

//     if (!user) return <p>Loading user info...</p>;
//     if (!orders.length) return <p>No orders yet.</p>;

//     return (
//         <div className="p-6">
//             <h2 className="text-2xl font-bold mb-4">My Orders</h2>
//             <table className="table-auto w-full border">
//                 <thead>
//                     <tr>
//                         <th>Product</th>
//                         <th>Quantity</th>
//                         <th>Total Price</th>
//                         <th>Status</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {orders.map(o => (
//                         <tr key={o._id}>
//                             <td>{o.productTitle}</td>
//                             <td>{o.quantity}</td>
//                             <td>${o.orderPrice}</td>
//                             <td>{o.status}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default MyOrders;


// import React, { useEffect, useState, useContext } from "react";
// import { AuthContext } from "../context/AuthProvider";

// const MyOrders = () => {
//     const { user } = useContext(AuthContext);
//     const [orders, setOrders] = useState([]);

//     useEffect(() => {
//         if (!user?.email) return;
//         fetch("http://localhost:3000/orders")
//             .then(res => res.json())
//             .then(data => setOrders(data.filter(o => o.email === user.email)))
//             .catch(err => console.error(err));
//     }, [user]);

//     if (!user) return <p className="text-center mt-10">Loading user info...</p>;
//     if (!orders.length) return <p className="text-center mt-10">No orders yet.</p>;

//     return (
//         <div className="p-4 md:p-6">
//             <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">My Orders</h2>

//             {/* Desktop Table */}
//             <div className="hidden md:block overflow-x-auto">
//                 <table className="table-auto w-full border border-gray-300 rounded-lg">
//                     <thead className="bg-gray-100">
//                         <tr>
//                             <th className="px-4 py-2 text-left">Product</th>
//                             <th className="px-4 py-2 text-left">Quantity</th>
//                             <th className="px-4 py-2 text-left">Total Price</th>
//                             <th className="px-4 py-2 text-left">Status</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {orders.map(o => (
//                             <tr key={o._id} className="border-t border-gray-200 hover:bg-gray-50">
//                                 <td className="px-4 py-2">{o.productTitle}</td>
//                                 <td className="px-4 py-2">{o.quantity}</td>
//                                 <td className="px-4 py-2">${o.orderPrice}</td>
//                                 <td className={`px-4 py-2 font-semibold 
//                                     ${o.status === "pending" ? "text-yellow-600" :
//                                         o.status === "approved" ? "text-green-600" :
//                                             o.status === "rejected" ? "text-red-600" : "text-gray-600"}`}>
//                                     {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Mobile Cards */}
//             <div className="md:hidden space-y-4">
//                 {orders.map(o => (
//                     <div key={o._id} className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white">
//                         <h3 className="font-semibold text-lg mb-2">{o.productTitle}</h3>
//                         <p><span className="font-medium">Quantity:</span> {o.quantity}</p>
//                         <p><span className="font-medium">Total Price:</span> ${o.orderPrice}</p>
//                         <p>
//                             <span className="font-medium">Status:</span>{" "}
//                             <span className={`font-semibold 
//                                 ${o.status === "pending" ? "text-yellow-600" :
//                                     o.status === "approved" ? "text-green-600" :
//                                         o.status === "rejected" ? "text-red-600" : "text-gray-600"}`}>
//                                 {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
//                             </span>
//                         </p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default MyOrders;



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

    // Total amount calculate
    const totalAmount = orders.reduce((sum, o) => sum + o.orderPrice, 0);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">My Orders</h2>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto mb-4">
                <table className="min-w-full border border-gray-300">
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
                </table>
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
