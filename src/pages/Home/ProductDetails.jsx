import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const { id } = useParams(); // URL to Id
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3000/products/${id}`)

            //fetch(`http://localhost:3000/products/${id}`)

            //http://localhost:3000/product/${id}

            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Fetch error:', err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Loading product...</p>;
    if (!product) return <p>Product not found.</p>;

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full max-w-md mb-4 rounded-lg border-2"
            />
            <p className="mb-2"><strong>Category:</strong> {product.category}</p>
            <p className="mb-2">{product.shortDescription}</p>
            <p className="mb-2"><strong>Price:</strong> ${product.price}</p>
            <p className="mb-2"><strong>Available Quantity:</strong> {product.availableQuantity}</p>


            {/* start from here */}
            <button className="btn btn-primary mt-5" disabled>
                Order / Booking (Coming Soon)
            </button>

        </div>
    );
};

export default ProductDetails;
