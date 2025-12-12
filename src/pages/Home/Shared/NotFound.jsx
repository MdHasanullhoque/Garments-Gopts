import React from 'react';

const NotFound = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <h1 className="text-5xl font-bold mb-4">404</h1>
            <p className="mb-4">Page Not Found!</p>
            <Link to="/" className="btn btn-primary">Go to Home</Link>
        </div>
    );
};

export default NotFound;