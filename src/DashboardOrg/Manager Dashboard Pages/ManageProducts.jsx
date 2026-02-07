// ManageProducts.jsx
import { useEffect, useState } from "react";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const deleteProduct = (id) => {
    fetch(`http://localhost:3000/products/${id}`, { method: "DELETE" })
      .then(() => {
        setProducts(prev => prev.filter(p => p._id !== id));
      });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Products</h2>

      {products.map(p => (
        <div key={p._id} className="flex justify-between border p-2 mb-2">
          <span>{p.name}</span>
          <button
            onClick={() => deleteProduct(p._id)}
            className="btn btn-error btn-sm"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ManageProducts;
