import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
const HomeProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Fetch error:', err);
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="text-center mt-10 text-lg">Loading products...</p>;

    return (
        <div className="max-w-[1200px] mx-auto px-4 py-8">
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                {products.map(product => (
                    <div
                        key={product._id}
                        className="border border-gray-300 rounded-lg p-4 flex flex-col hover:shadow-lg transition-shadow duration-300"
                    >
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-48 object-cover rounded-md mb-4"
                        />
                        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">{product.shortDescription}</p>
                        <p className="font-semibold mb-1">Price: ${product.price}</p>
                        {/* <p className="text-gray-700 mb-3">Available: {product.availableQuantity}</p> */}


                        <button className="mt-auto bg-blue-500 text-white py-2 px-4 rounded
                         hover:bg-blue-600 transition-colors">
                            <Link to={`/product/${product._id}`}>View Details</Link>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeProducts;
