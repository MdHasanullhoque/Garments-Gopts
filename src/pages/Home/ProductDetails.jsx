
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3000/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Loading product...</p>;
    if (!product) return <p>Product not found.</p>;

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <img src={product.imageUrl} alt={product.name} className="w-full max-w-md mb-4 rounded-lg border-2" />
            <p><strong>Category:</strong> {product.category}</p>
            <p>{product.shortDescription}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Available Quantity:</strong> {product.availableQuantity}</p>

            <button
                className="btn btn-primary mt-5"
                onClick={() => navigate(`/booking/${product._id}`)}
            >
                Order / Booking
            </button>
        </div>
    );
};

export default ProductDetails;
