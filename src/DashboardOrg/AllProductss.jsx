
// import { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { AuthContext } from "../context/AuthProvider";

// const AllProductss = () => {
//     const { user } = useContext(AuthContext);
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);

//     // Load all products (admin only)
//     const loadProducts = async () => {
//         if (!user?.email) return;
//         try {
//             const res = await axios.get(
//                 "http://localhost:3000/admin-products/all",
//                 { headers: { "x-email": user.email } } // admin verification
//             );
//             setProducts(Array.isArray(res.data) ? res.data : []);
//         } catch (err) {
//             console.error(err);
//             setProducts([]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => { loadProducts(); }, [user?.email]);

//     // Delete product
//     const deleteProduct = async (id) => {
//         if (!window.confirm("Delete permanently?")) return;
//         try {
//             await axios.delete(
//                 `http://localhost:3000/admin-products/${id}`,
//                 { headers: { "x-email": user.email } }
//             );
//             setProducts(products.filter(p => p._id !== id));
//         } catch {
//             alert("Delete failed");
//         }
//     };

//     // Toggle hide
//     const toggleHide = async (id, value) => {
//         try {
//             await axios.patch(
//                 `http://localhost:3000/admin-products/hide/${id}`,
//                 { isHidden: value },
//                 { headers: { "x-email": user.email } }
//             );
//             setProducts(products.map(p => p._id === id ? { ...p, isHidden: value } : p));
//         } catch {
//             alert("Failed to update visibility");
//         }
//     };

//     // Toggle show on home
//     const toggleShowOnHome = async (id, value) => {
//         try {
//             await axios.patch(
//                 `http://localhost:3000/admin-products/home/${id}`,
//                 { showOnHome: value },
//                 { headers: { "x-email": user.email } }
//             );
//             setProducts(products.map(p => p._id === id ? { ...p, showOnHome: value } : p));
//         } catch {
//             alert("Failed to update home visibility");
//         }
//     };

//     if (loading) return <p>Loading products...</p>;
//     if (!products.length) return <p>No products found</p>;

//     return (
//         <div className="p-4">
//             <h2 className="text-xl font-bold mb-4">Admin – All Products</h2>

//             <div className="overflow-x-auto">
//                 <table className="min-w-full border border-gray-300">
//                     <thead className="bg-gray-100">
//                         <tr>
//                             <th className="p-2 border">Image</th>
//                             <th className="p-2 border">Name</th>
//                             <th className="p-2 border">Price</th>
//                             <th className="p-2 border">Category</th>
//                             <th className="p-2 border">Hide</th>
//                             <th className="p-2 border">Show on Home</th>
//                             <th className="p-2 border">Delete</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {products.map(p => (
//                             <tr key={p._id} className={p.isHidden ? "opacity-50" : ""}>
//                                 <td className="p-2 border text-center">
//                                     <img src={p.image || "https://via.placeholder.com/50"} alt={p.name} className="w-12 h-12 object-cover mx-auto" />
//                                 </td>
//                                 <td className="p-2 border">{p.name}</td>
//                                 <td className="p-2 border">${p.price}</td>
//                                 <td className="p-2 border">{p.category}</td>
//                                 <td className="p-2 border text-center">
//                                     <input
//                                         type="checkbox"
//                                         checked={p.isHidden || false}
//                                         onChange={(e) => toggleHide(p._id, e.target.checked)}
//                                     />
//                                 </td>
//                                 <td className="p-2 border text-center">
//                                     <input
//                                         type="checkbox"
//                                         checked={p.showOnHome || false}
//                                         onChange={(e) => toggleShowOnHome(p._id, e.target.checked)}
//                                     />
//                                 </td>
//                                 <td className="p-2 border text-center">
//                                     <button
//                                         className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                                         onClick={() => deleteProduct(p._id)}
//                                     >
//                                         Delete
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default AllProductss;



import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";

const AllProductss = () => {
    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadProducts = async () => {
        try {
            const res = await axios.get("http://localhost:3000/admin-products/all", {
                headers: { "x-email": user.email },
            });
            setProducts(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error(err);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.email) loadProducts();
    }, [user?.email]);

    // DELETE
    const deleteProduct = async (id) => {
        if (!window.confirm("Delete permanently?")) return;
        try {
            await axios.delete(`http://localhost:3000/admin-products/${id}`, {
                headers: { "x-email": user.email },
            });
            setProducts(products.filter((p) => p._id !== id));
        } catch {
            alert("Delete failed");
        }
    };

    // SHOW/HOME toggle
    const toggleShowOnHome = async (id, value) => {
        try {
            await axios.patch(
                `http://localhost:3000/admin-products/home/${id}`,
                { showOnHome: value },
                { headers: { "x-email": user.email } }
            );
            setProducts(
                products.map((p) => (p._id === id ? { ...p, showOnHome: value } : p))
            );
        } catch {
            alert("Failed to update home visibility");
        }
    };

    // HIDE toggle
    const toggleHide = async (id, value) => {
        try {
            await axios.patch(
                `http://localhost:3000/admin-products/hide/${id}`,
                { isHidden: value },
                { headers: { "x-email": user.email } }
            );
            setProducts(
                products.map((p) => (p._id === id ? { ...p, isHidden: value } : p))
            );
        } catch {
            alert("Failed to update product visibility");
        }
    };

    if (loading) return <p>Loading products...</p>;
    if (!products.length) return <p>No products found</p>;

    return (
        <div className="p-4 overflow-x-auto">
            <h2 className="text-2xl font-bold mb-4">Admin – All Products</h2>
            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="p-2 border">Image</th>
                        <th className="p-2 border">Name</th>
                        <th className="p-2 border">Price</th>
                        <th className="p-2 border">Category</th>
                        <th className="p-2 border">Created By</th>
                        <th className="p-2 border">Hide</th>
                        <th className="p-2 border">Show on Home</th>
                        <th className="p-2 border">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((p) => (
                        <tr
                            key={p._id}
                            className={p.isHidden ? "opacity-50" : ""}
                        >
                            <td className="p-2 border">
                                <img
                                    src={p.image || "https://via.placeholder.com/60"}
                                    alt={p.name}
                                    width="60"
                                    height="60"
                                />
                            </td>
                            <td className="p-2 border">{p.name}</td>
                            <td className="p-2 border">${p.price}</td>
                            <td className="p-2 border">{p.category}</td>
                            <td className="p-2 border">{p.createdBy || "-"}</td>
                            <td className="p-2 border text-center">
                                <input
                                    type="checkbox"
                                    checked={p.isHidden || false}
                                    onChange={(e) => toggleHide(p._id, e.target.checked)}
                                />
                            </td>
                            <td className="p-2 border text-center">
                                <input
                                    type="checkbox"
                                    checked={p.showOnHome || false}
                                    onChange={(e) => toggleShowOnHome(p._id, e.target.checked)}
                                />
                            </td>
                            <td className="p-2 border text-center">
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                    onClick={() => deleteProduct(p._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllProductss;
