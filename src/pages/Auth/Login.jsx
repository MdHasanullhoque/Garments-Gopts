import React, { useState, useContext } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";


const Login = () => {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    if(user) navigate("/"); // already logged in

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate("/"); // Home page
            })
            .catch((err) => setError(err.message));
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
            </form>
        </div>
    );
};

export default Login;
