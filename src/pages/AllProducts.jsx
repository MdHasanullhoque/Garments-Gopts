import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3000/products") // backend endpoint
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold mb-8 text-center">All Products</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                    <div
                        key={product._id}
                        className="border rounded-xl shadow hover:shadow-lg transition"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-52 object-cover rounded-t-xl"
                        />

                        <div className="p-4 space-y-2">
                            <h3 className="text-xl font-semibold">{product.name}</h3>
                            <p className="text-sm text-gray-500">Category: {product.category}</p>
                            <p className="font-medium">Price: ৳{product.price}</p>
                            <p className="text-sm">Available: {product.quantity}</p>

                            {/* <Link to={`/products/${product._id}`}>
                                <button className="w-full mt-3 bg-black text-white py-2 rounded-lg hover:bg-gray-800">
                                    View Details
                                </button>
                            </Link> */}

                            <Link to={`/products/${product._id}`}>
                                <button className="w-full mt-3 bg-black text-white py-2 rounded-lg">
                                    View Details
                                </button>
                            </Link>




                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllProducts;
