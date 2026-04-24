import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://server-gopts-bzds.vercel.app/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const deleteProduct = (id) => {
    fetch(`https://server-gopts-bzds.vercel.app/products/${id}`, { method: "DELETE" })
      .then(() => {
        setProducts(prev => prev.filter(p => p._id !== id));
      });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Products</h2>

      {products.map(p => (
        <div key={p._id} className="flex justify-between border p-2 mb-2">
          <span>{p.title || p.name}</span>
          <div className="space-x-2">
            <button
              onClick={() => navigate(`/dashboard/manager/update-product/${p._id}`)}
              className="btn btn-warning btn-sm"
            >
              Update
            </button>
            <button
              onClick={() => deleteProduct(p._id)}
              className="btn btn-error btn-sm"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageProducts;