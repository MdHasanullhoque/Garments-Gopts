import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

const UpdateProduct = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        description: "",
        category: "",
        price: "",
        availableQuantity: "",
        moq: "",
        paymentOption: "Cash on Delivery",
        showOnHome: false
    });

   useEffect(() => {
    fetch(`https://server-gopts-bzds.vercel.app/products/${id}`)
        .then(res => res.json())
        .then(data => {
            setForm({
                title: data.title || data.name || "",
                description: data.description || "",
                category: data.category || "",
                price: data.price || "",
                availableQuantity: data.availableQuantity || "",
                moq: data.moq || "",
                paymentOption: data.paymentOption || "Cash on Delivery",
                showOnHome: data.showOnHome || false
            });
        });
}, [id]);

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const res = await fetch(`https://server-gopts-bzds.vercel.app/products/${id}`, {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ ...form, email: user.email })
        });
        const data = await res.json();
        alert(data.message);
        navigate("/dashboard/manager/manage-products");
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <h2 className="text-xl font-bold">Update Product</h2>

            <input name="title" value={form.title || ""} onChange={handleChange} placeholder="Product Name" />

            <select name="category" value={form.category || ""} onChange={handleChange}>
                <option value="">Select Category</option>
                <option value="Shirt">Shirt</option>
                <option value="Pant">Pant</option>
                <option value="Jacket">Jacket</option>
                <option value="Accessories">Accessories</option>
            </select>

            <input type="number" name="price" value={form.price || ""} onChange={handleChange} placeholder="Price" />
            <input type="number" name="availableQuantity" value={form.availableQuantity || ""} onChange={handleChange} placeholder="Available Qty" />
            <input type="number" name="moq" value={form.moq || ""} onChange={handleChange} placeholder="MOQ" />

            <select name="paymentOption" value={form.paymentOption || ""} onChange={handleChange}>
                <option>Cash on Delivery</option>
                <option>PayFirst</option>
            </select>

            <label className="ml-2 mr-2">
                <input type="checkbox" name="showOnHome" checked={form.showOnHome || false} onChange={handleChange} />
                Show on Home Page
            </label>

            <button className="btn btn-primary">Update Product</button>
        </form>
    );
};

export default UpdateProduct;