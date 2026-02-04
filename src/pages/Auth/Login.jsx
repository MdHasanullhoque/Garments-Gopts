

import React, { useState, useContext, useEffect } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

const Login = () => {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);

    useEffect(() => {
        if (user) navigate("/");
    }, [user, navigate]);

    // =================== Email/Password login ===================
    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const res = await signInWithEmailAndPassword(auth, email, password);

            const currentUser = {
                uid: res.user.uid,
                name: res.user.displayName || "Unknown",
                email: res.user.email,
                photoURL: res.user.photoURL || "",
                role: "buyer",
                status: "pending"
            };

            // Sync to backend MongoDB
            const syncRes = await fetch("http://localhost:3000/users/sync", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(currentUser)
            });

            if (!syncRes.ok) throw new Error("User sync failed");

            setUser(currentUser);
            navigate("/");

        } catch (err) {
            console.error("Login Error:", err.message);
            setError(err.message);
        }
    };

    // =================== Google login ===================
    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const gUser = result.user;

            const currentUser = {
                uid: gUser.uid,
                name: gUser.displayName,
                email: gUser.email,
                photoURL: gUser.photoURL,
                role: "buyer",
                status: "pending"
            };

            // Sync to backend MongoDB
            const syncRes = await fetch("http://localhost:3000/users/sync", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(currentUser)
            });

            if (!syncRes.ok) throw new Error("User sync failed");

            setUser(currentUser);
            navigate("/");

        } catch (err) {
            console.error("Google Login Error:", err.message);
            setError(err.message);
        }
    };

    return (
        <div className="flex justify-center p-10">
            <form onSubmit={handleLogin} className="card w-96 bg-base-100 shadow-xl p-5">
                <h2 className="text-xl font-bold mb-3">Login</h2>
                <input type="email" name="email" placeholder="Email" className="input input-bordered w-full mb-3" required />
                <input type="password" name="password" placeholder="Password" className="input input-bordered w-full mb-3" required />
                {error && <p className="text-red-500">{error}</p>}
                <button className="btn btn-primary w-full mt-2">Login</button>
                <p className="mt-2">Don't have an account? <Link to="/register" className="text-blue-500">Register</Link></p>

                <button type="button" onClick={handleGoogleLogin} className="btn btn-outline w-full mt-4">
                    Login with Google
                </button>
            </form>
        </div>
    );
};

export default Login;
