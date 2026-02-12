
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

const BookingPage = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();
    //new
    const [USER, setUSER] = useState({});


    // ================= States =================
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState("");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [address, setAddress] = useState("");
    const [additionalNotes, setAdditionalNotes] = useState("");

    // ================= Fetch latest user from backend =================
    useEffect(() => {
        if (!user?.uid || !user?.email) return;

        fetch(
            `https://server-gopts.vercel.app/users/uid/${user.uid}?email=${user.email}`
        )
            .then(res => res.json())
            .then(data => {
                if (!data.message) {
                    setUSER(data); // update context
                }
                console.log("User from backend:", data);
            })
            .catch(err => console.error(err));
    }, [user?.uid, user?.email]);


    // ================= Fetch product =================
    useEffect(() => {
        if (!id) return;

        fetch(`https://server-gopts.vercel.app/products/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
            .catch(err => console.error(err));
    }, [id]);

    // ================= Loading =================
    if (!user || !user.status) return <p>Loading user info...</p>;
    if (!product) return <p>Loading product...</p>;

    // ================= Suspended buyer block ================= 

    // if (USER.status === "suspended" && (USER.role === "buyer" || USER.role === "manager")) {
    //     return (
    //         <div className="max-w-3xl mx-auto p-6 bg-red-100 rounded">
    //             <h2 className="text-2xl font-bold text-red-600 mb-2">
    //                 You are suspended
    //             </h2>
    //             <p>
    //                 <strong>Reason:</strong> {USER.suspendReason || "No reason provided"}
    //             </p>
    //             <p>
    //                 <strong>Feedback:</strong> {USER.suspendFeedback || "No feedback"}
    //             </p>
    //         </div>
    //     );
    // }


    // ================= Suspended users block =================

    const suspendedRoles = ["buyer", "manager"]; // future roles easily addable after comma (   ,  )

    if (USER.status === "suspended" && suspendedRoles.includes(USER.role)) {
        return (
            <div className="max-w-3xl mx-auto p-6 bg-red-100 rounded">
                <h2 className="text-2xl font-bold text-red-600 mb-2">You are suspended</h2>
                <p><strong>Role:</strong> {USER.role}</p>
                <p><strong>Reason:</strong> {USER.suspendReason || "No reason provided"}</p>
                <p><strong>Feedback:</strong> {USER.suspendFeedback || "No feedback"}</p>
            </div>
        );
    }


    // ================= Quantity handler =================
    const handleQuantity = (e) => {
        const value = Number(e.target.value);

        if (value < product.minimumOrder) {
            setError(`Minimum order is ${product.minimumOrder}`);
            return;
        }
        if (value > product.availableQuantity) {
            setError("Quantity exceeds available stock");
            return;
        }

        setError("");
        setQuantity(value);
    };

    const totalPrice = quantity * product.price;

    // ================= Submit order =================
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (error) return;

        const orderData = {
            productId: id,
            productTitle: product.name,
            price: product.price,
            quantity,
            orderPrice: totalPrice,
            email: user.email,
            firstName,
            lastName,
            contactNumber,
            address,
            notes: additionalNotes,
            status: "pending",
        };

        try {
            const res = await fetch("https://server-gopts.vercel.app/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData),
            });

            if (res.ok) {
                alert("Booking successful!");
                navigate("/dashboard/my-orders");
            } else {
                const data = await res.json();
                alert("Booking failed: " + data.message);
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong!");
        }
    };

    // ================= UI =================
    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Booking Form</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input value={user.email} readOnly className="input input-bordered w-full" />
                <input value={product.name} readOnly className="input input-bordered w-full" />
                <input value={product.price} readOnly className="input input-bordered w-full" />

                <input
                    type="number"
                    value={quantity}
                    onChange={handleQuantity}
                    className="input input-bordered w-full"
                />
                {error && <p className="text-red-500">{error}</p>}

                <input value={totalPrice} readOnly className="input input-bordered w-full" />

                <input
                    placeholder="First Name"
                    required
                    className="input input-bordered w-full"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                />

                <input
                    placeholder="Last Name"
                    required
                    className="input input-bordered w-full"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                />

                <input
                    placeholder="Contact Number"
                    required
                    className="input input-bordered w-full"
                    value={contactNumber}
                    onChange={e => setContactNumber(e.target.value)}
                />

                <textarea
                    placeholder="Delivery Address"
                    required
                    className="textarea textarea-bordered w-full"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                />

                <textarea
                    placeholder="Additional Notes"
                    className="textarea textarea-bordered w-full"
                    value={additionalNotes}
                    onChange={e => setAdditionalNotes(e.target.value)}
                />

                <button className="btn btn-primary w-full">Confirm Order</button>
            </form>
        </div>
    );
};

export default BookingPage;
