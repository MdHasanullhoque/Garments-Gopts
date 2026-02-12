import React, { useContext, useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const AdminRoute = () => {
    const { user } = useContext(AuthContext);
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user?.uid || !user?.email) {
            setLoading(false);
            return;
        }

        // get user role from backend
        fetch(`https://server-gopts.vercel.app/users/uid/${user.uid}?email=${user.email}`)
            .then(res => res.json())
            .then(data => {
                if (!data.message) {
                    setRole(data.role);
                }
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [user?.uid, user?.email]);

    if (loading) return <p className="p-4">Loading...</p>;
    if (!user) return <Navigate to="/login" replace />;
    if (role !== "admin") return <p className="p-4">Access Denied. Admins only.</p>;

    return <Outlet />;
};

export default AdminRoute;
