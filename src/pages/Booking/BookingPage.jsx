import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

const BookingPage = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();

    // Product data
    const [product, setProduct] = useState(null);

    // Order quantity & error
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState("");

    // Input states
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [address, setAddress] = useState("");
    const [additionalNotes, setAdditionalNotes] = useState("");

    // Fetch product details
    useEffect(() => {
        if (!id) return;
        fetch(`http://localhost:3000/products/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
            .catch(err => console.error(err));
    }, [id]);

    if (!user) return <p>Loading user info...</p>;
    if (!product) return <p>No product selected</p>;

    // Quantity validation
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

    // Submit booking
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!quantity || error) return;

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
            const res = await fetch("http://localhost:3000/orders", {
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

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Booking Form</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
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
                    className="input input-bordered w-full"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    required
                />
                <input
                    placeholder="Last Name"
                    className="input input-bordered w-full"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    required
                />
                <input
                    placeholder="Contact Number"
                    className="input input-bordered w-full"
                    value={contactNumber}
                    onChange={e => setContactNumber(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Delivery Address"
                    className="textarea textarea-bordered w-full"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    required
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
