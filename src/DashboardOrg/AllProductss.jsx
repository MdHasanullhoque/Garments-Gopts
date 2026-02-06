// // import { useEffect, useState } from "react";
// // import axios from "axios";

// // const AllProductss = () => {
// //     const [products, setProducts] = useState([]);

// //     const loadProducts = async () => {
// //         try {
// //             const res = await axios.get("http://localhost:3000/admin-products/all", { withCredentials: true });

// //             // Ensure products is an array
// //             if (Array.isArray(res.data)) {
// //                 setProducts(res.data);
// //             } else {
// //                 setProducts([]); // fallback
// //             }

// //         } catch (err) {
// //             console.error(err);
// //             setProducts([]); // error fallback
// //         }
// //     };

// //     useEffect(() => { loadProducts(); }, []);

// //     if (!products.length) return <p>No products found</p>;

// //     return (
// //         <div>
// //             <h2>Admin All Products</h2>
// //             {products.map(p => (
// //                 <div key={p._id}>
// //                     <p>{p.name}</p>
// //                     <p>Price: {p.price}</p>
// //                     <p>Category: {p.category}</p>
// //                 </div>
// //             ))}
// //         </div>
// //     );
// // };

// // export default AllProductss;

// import { useEffect, useState } from "react";
// import axios from "axios";

// const AllProductss = () => {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const loadProducts = async () => {
//         try {
//             const res = await axios.get("http://localhost:3000/admin-products/all", { withCredentials: true });
//             setProducts(Array.isArray(res.data) ? res.data : []);
//             setLoading(false);
//         } catch (err) {
//             console.error(err);
//             setProducts([]);
//             setLoading(false);
//         }
//     };

//     const deleteProduct = async (id) => {
//         if (!window.confirm("Are you sure you want to delete this product?")) return;
//         try {
//             await axios.delete(`http://localhost:3000/admin-products/${id}`, { withCredentials: true });
//             setProducts(products.filter(p => p._id !== id));
//         } catch (err) {
//             console.error(err);
//             alert("Failed to delete product");
//         }
//     };

//     const toggleShowOnHome = async (id, value) => {
//         try {
//             await axios.patch(`http://localhost:3000/admin-products/home/${id}`, { showOnHome: value }, { withCredentials: true });
//             setProducts(products.map(p => p._id === id ? { ...p, showOnHome: value } : p));
//         } catch (err) {
//             console.error(err);
//             alert("Failed to update showOnHome");
//         }
//     };

//     useEffect(() => { loadProducts(); }, []);

//     if (loading) return <p>Loading products...</p>;
//     if (!products.length) return <p>No products found</p>;

//     return (
//         <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
//             {products.map(p => (
//                 <div key={p._id} style={{ border: "1px solid #ccc", padding: "10px", width: "220px", borderRadius: "8px" }}>
//                     <img src={p.image || "https://via.placeholder.com/200"} alt={p.name} style={{ width: "100%", height: "140px", objectFit: "cover", borderRadius: "5px" }} />
//                     <h3>{p.name}</h3>
//                     <p>Price: ${p.price}</p>
//                     <p>Category: {p.category}</p>
//                     <p>
//                         Show on Home:
//                         <input
//                             type="checkbox"
//                             checked={p.showOnHome}
//                             onChange={(e) => toggleShowOnHome(p._id, e.target.checked)}
//                         />
//                     </p>
//                     <button onClick={() => deleteProduct(p._id)} style={{ color: "white", background: "red", padding: "5px 10px", border: "none", borderRadius: "5px" }}>
//                         Delete
//                     </button>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default AllProductss;

import { useEffect, useState } from "react";
import axios from "axios";

const AllProductss = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadProducts = async () => {
        try {
            const res = await axios.get("http://localhost:3000/admin-products/all", { withCredentials: true });
            setProducts(Array.isArray(res.data) ? res.data : []);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setProducts([]);
            setLoading(false);
        }
    };

    const deleteProduct = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        try {
            await axios.delete(`http://localhost:3000/admin-products/${id}`, { withCredentials: true });
            setProducts(products.filter(p => p._id !== id));
        } catch (err) {
            console.error(err);
            alert("Failed to delete product");
        }
    };

    const toggleShowOnHome = async (id, value) => {
        try {
            await axios.patch(`http://localhost:3000/admin-products/home/${id}`, { showOnHome: value }, { withCredentials: true });
            setProducts(products.map(p => p._id === id ? { ...p, showOnHome: value } : p));
        } catch (err) {
            console.error(err);
            alert("Failed to update showOnHome");
        }
    };

    useEffect(() => { loadProducts(); }, []);

    if (loading) return <p>Loading products...</p>;
    if (!products.length) return <p>No products found</p>;

    return (
        <div>
            <h2>Admin All Products</h2>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ borderBottom: "2px solid #ccc" }}>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Show on Home</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(p => (
                        <tr key={p._id} style={{ borderBottom: "1px solid #eee", textAlign: "center" }}>
                            <td>
                                <img src={p.image || "https://via.placeholder.com/60"} alt={p.name} width="60" height="60" />
                            </td>
                            <td>{p.name}</td>
                            <td>{p.category}</td>
                            <td>${p.price}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={p.showOnHome}
                                    onChange={(e) => toggleShowOnHome(p._id, e.target.checked)}
                                />
                            </td>
                            <td>
                                <button
                                    onClick={() => deleteProduct(p._id)}
                                    style={{
                                        padding: "5px 10px",
                                        background: "red",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "5px",
                                        cursor: "pointer"
                                    }}
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
