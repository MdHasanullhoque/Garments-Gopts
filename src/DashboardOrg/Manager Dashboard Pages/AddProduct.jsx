// AddProduct.jsx
import { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/products", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name }),
    })
      .then(() => {
        setName("");
        alert("Product added");
      });
  };

  return (
    <form onSubmit={handleAdd} className="p-4">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>

      <input
        className="input input-bordered w-full mb-3"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Product name"
      />

      <button className="btn btn-primary">Add</button>
    </form>
  );
};

export default AddProduct;
