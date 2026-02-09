import React, { useState } from "react";

const TrackOrder = () => {
    const [orderId, setOrderId] = useState("");
    const [order, setOrder] = useState(null);
    const [error, setError] = useState("");

    const handleTrack = () => {
        setError("");
        setOrder(null);

        if (!orderId) {
            setError("Please enter Order ID");
            return;
        }

        fetch(`http://localhost:3000/orders/track/${orderId}`)
            .then(res => {
                if (!res.ok) throw new Error("Order not found");
                return res.json();
            })
            .then(data => setOrder(data))
            .catch(() => setError("Order not found"));
    };

    return (
        <div className="p-6 max-w-md">
            <h2 className="text-2xl font-bold mb-4">Track Order</h2>

            <input
                type="text"
                placeholder="Enter Order ID"
                className="input input-bordered w-full mb-3"
                value={orderId}
                onChange={e => setOrderId(e.target.value)}
            />

            <button onClick={handleTrack} className="btn btn-primary w-full">
                Track
            </button>

            {error && <p className="text-red-500 mt-3">{error}</p>}

            {order && (
                <div className="mt-4 border p-4 rounded bg-base-200">
                    <p><b>Product:</b> {order.productTitle}</p>
                    <p><b>Quantity:</b> {order.quantity}</p>
                    <p><b>Total:</b> ${order.orderPrice}</p>
                    <p>
                        <b>Status:</b>{" "}
                        <span
                            className={
                                order.status === "Approved"
                                    ? "text-green-600"
                                    : order.status === "Rejected"
                                        ? "text-red-600"
                                        : "text-orange-500"
                            }
                        >
                            {order.status}
                        </span>
                    </p>
                </div>
            )}
        </div>
    );
};

export default TrackOrder;
