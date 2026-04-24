import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";

const AddProduct = () => {
    const { user } = useContext(AuthContext);
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

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async e => {
        e.preventDefault();

        const res = await fetch("https://server-gopts-bzds.vercel.app/products/add", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                ...form,
                images: [],
                email: user.email
            })
        });

        const data = await res.json();
        alert(data.message);
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <h2 className="text-xl font-bold">Add Product</h2>

            {/* <input name="title" onChange={handleChange} placeholder="Product Name" className="input" />
            <textarea name="description" onChange={handleChange} placeholder="Description" className="textarea" />

            <select name="category" onChange={handleChange}>
                <option value="">Select Category</option>
                <option>Shirt</option>
                <option>Pant</option>
                <option>Jacket</option>
                <option>Accessories</option>
            </select>

            <input type="number" name="price" onChange={handleChange} placeholder="Price" />
            <input type="number" name="availableQuantity" onChange={handleChange} placeholder="Available Qty" />
            <input type="number" name="moq" onChange={handleChange} placeholder="MOQ" /> */}
            <input
                name="title"
                required
                onChange={handleChange}
                placeholder="Product Name"
            />

            <select name="category" required onChange={handleChange}>
                <option value="">Select Category</option>
                <option value="Shirt">Shirt</option>
                <option value="Pant">Pant</option>
                <option value="Jacket">Jacket</option>
                <option value="Accessories">Accessories</option>
            </select>

            <input
                type="number"
                name="price"
                required
                onChange={handleChange}
                placeholder="Price"
            />

            <input
                type="number"
                name="availableQuantity"
                required
                onChange={handleChange}
                placeholder="Available Qty"
            />

            <input
                type="number"
                name="moq"
                required
                onChange={handleChange}
                placeholder="MOQ"
            />


            <select name="paymentOption" onChange={handleChange}>
                <option>Cash on Delivery</option>
                <option>PayFirst</option>
            </select>

            <label className="ml-2 mr-2">
                <input type="checkbox" name="showOnHome" onChange={handleChange} />
                Show on Home Page
            </label>

            <button className="btn btn-primary">Add Product</button>
        </form>
    );
};

export default AddProduct;
