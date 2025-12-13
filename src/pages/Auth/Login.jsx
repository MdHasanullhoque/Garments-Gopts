
import React, { useState, useContext } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth /*, db */ } from "../../firebaseConfig"; // db on comment
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
// import { doc, setDoc, getDoc } from "firebase/firestore"; // comment

const Login = () => {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);

    if (user) navigate("/"); // already logged in

    // Email/Password login
    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        signInWithEmailAndPassword(auth, email, password)
            .then((res) => {
                setUser({
                    uid: res.user.uid,
                    name: res.user.displayName,
                    email: res.user.email,
                    photoURL: res.user.photoURL,
                });
                navigate("/"); // Home page
            })
            .catch((err) => setError(err.message));
    };

    // Google Login
    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const gUser = result.user;

            // If save in Firestore :
            /*
            const userRef = doc(db, "users", gUser.uid);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
                await setDoc(userRef, {
                    name: gUser.displayName,
                    email: gUser.email,
                    photoURL: gUser.photoURL,
                    role: "buyer",     // default role
                    status: "pending"  // default status
                });
            }
            */

            setUser({
                uid: gUser.uid,
                name: gUser.displayName,
                email: gUser.email,
                photoURL: gUser.photoURL,
                role: "buyer",
                status: "pending"
            });

            navigate("/");
        } catch (err) {
            console.error("Google Login Error:", err.message);
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

                {/* Google Login Button */}
                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="btn btn-outline w-full mt-4"
                >
                    Login with Google
                </button>
            </form>
        </div>
    );
};

export default Login;

