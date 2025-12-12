import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { auth } from "../../../firebase/firebase.config";
import {auth} from "../../firebaseConfig"
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const photoURL = e.target.photo.value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                updateProfile(res.user, { displayName: name, photoURL: photoURL })
                    .then(() => navigate("/")) // redirect to home
            })
            .catch((err) => setError(err.message));
    };

    return (
        <div className="flex justify-center p-10">
            <form onSubmit={handleRegister} className="card w-96 bg-base-100 shadow-xl p-5">
                <h2 className="text-xl font-bold mb-3">Register</h2>
                <input type="text" name="name" placeholder="Name" className="input input-bordered w-full mb-3" required />
                <input type="email" name="email" placeholder="Email" className="input input-bordered w-full mb-3" required />
                <input type="password" name="password" placeholder="Password" className="input input-bordered w-full mb-3" required />
                <input type="text" name="photo" placeholder="Photo URL" className="input input-bordered w-full mb-3" />
                {error && <p className="text-red-500">{error}</p>}
                <button className="btn btn-primary w-full mt-2">Register</button>
                <p className="mt-2">Already have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
            </form>
        </div>
    );
};

export default Register;
