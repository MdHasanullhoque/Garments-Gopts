import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TestHomePlz = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3000/products")
            .then((res) => res.json())
            .then((data) => {
                setProducts(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p className="text-center mt-10 text-lg">Loading products...</p>;
    }

    return (
        <div className="max-w-[1200px] mx-auto px-4 py-10">
            {/* <h2 className="text-2xl font-bold mb-6 text-center">
                Our Products
            </h2> */}

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="border rounded-lg p-4 flex flex-col hover:shadow-lg transition-shadow duration-300"
                    >
                        {/* 🔹 Image */}
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-48 object-cover rounded mb-4"
                        />

                        {/* 🔹 Name */}
                        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>

                        {/* 🔹 Short description */}
                        <p className="text-sm text-gray-600 mb-2">
                            {product.shortDescription}
                        </p>

                        {/* 🔹 Price */}
                        <p className="font-semibold mb-3">Price: ${product.price}</p>

                        {/* 🔹 View Details button */}
                        <Link
                            to={`/products/${product._id}`}
                            className="mt-auto bg-blue-500 text-white text-center py-2 rounded hover:bg-blue-600 transition-colors"
                        >
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TestHomePlz;


