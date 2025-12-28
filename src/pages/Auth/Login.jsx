
// import React, { useState, useContext, useEffect } from "react";
// import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { auth, db } from "../../firebaseConfig";
// import { useNavigate, Link } from "react-router-dom";
// import { AuthContext } from "../../context/AuthProvider";
// import { doc, setDoc, getDoc } from "firebase/firestore";

// const Login = () => {
//     const [error, setError] = useState("");
//     const navigate = useNavigate();
//     const { user, setUser } = useContext(AuthContext);

//     useEffect(() => {
//         if (user) navigate("/");
//     }, [user, navigate]);

//     // Email/Password login
//     const handleLogin = (e) => {
//         e.preventDefault();
//         const email = e.target.email.value;
//         const password = e.target.password.value;

//         signInWithEmailAndPassword(auth, email, password)
//             .then(async (res) => {
//                 const currentUser = {
//                     uid: res.user.uid,
//                     name: res.user.displayName || "Unknown",
//                     email: res.user.email,
//                     photoURL: res.user.photoURL || ""
//                 };

//                 // Sync with backend
//                 await fetch("http://localhost:3000/users/sync", {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify(currentUser)
//                 });

//                 setUser(currentUser);
//                 navigate("/");
//             })
//             .catch(err => setError(err.message));
//     };

//     // Google Login
//     // const handleGoogleLogin = async () => {
//     //     try {
//     //         const provider = new GoogleAuthProvider();
//     //         const result = await signInWithPopup(auth, provider);
//     //         const gUser = result.user;

//     //         const currentUser = {
//     //             uid: gUser.uid,
//     //             name: gUser.displayName,
//     //             email: gUser.email,
//     //             photoURL: gUser.photoURL
//     //         };

//     //         // Sync with backend
//     //         await fetch("http://localhost:3000/users/sync", {
//     //             method: "POST",
//     //             headers: { "Content-Type": "application/json" },
//     //             body: JSON.stringify(currentUser)
//     //         });

//     //         setUser(currentUser);
//     //         navigate("/");
//     //     } catch (err) {
//     //         console.error("Google Login Error:", err.message);
//     //         setError(err.message);
//     //     }
//     // };

//     // Google login handler
//     const handleGoogleLogin = async () => {
//         const provider = new GoogleAuthProvider();
//         try {
//             const result = await signInWithPopup(auth, provider);
//             const gUser = result.user;

//             // Backend sync
//             await fetch("http://localhost:3000/users/sync", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                     name: gUser.displayName,
//                     email: gUser.email,
//                     photoURL: gUser.photoURL
//                 })
//             });

//             setUser({
//                 uid: gUser.uid,
//                 name: gUser.displayName,
//                 email: gUser.email,
//                 photoURL: gUser.photoURL,
//                 role: "buyer",
//                 status: "pending"
//             });

//             navigate("/");
//         } catch (err) {
//             console.error("Google Login Error:", err.message);
//         }
//     };
//     return (
//         <div className="flex justify-center p-10">
//             <form onSubmit={handleLogin} className="card w-96 bg-base-100 shadow-xl p-5">
//                 <h2 className="text-xl font-bold mb-3">Login</h2>
//                 <input type="email" name="email" placeholder="Email" className="input input-bordered w-full mb-3" required />
//                 <input type="password" name="password" placeholder="Password" className="input input-bordered w-full mb-3" required />
//                 {error && <p className="text-red-500">{error}</p>}
//                 <button className="btn btn-primary w-full mt-2">Login</button>
//                 <p className="mt-2">Don't have an account? <Link to="/register" className="text-blue-500">Register</Link></p>

//                 <button type="button" onClick={handleGoogleLogin} className="btn btn-outline w-full mt-4">
//                     Login with Google
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default Login;


import React, { useState, useContext, useEffect } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebaseConfig"; // Firebase config path check করে নিতে হবে
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

const Login = () => {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);

    useEffect(() => {
        if (user) navigate("/");
    }, [user, navigate]);

    // Email/Password login
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

            // Sync with backend
            const syncRes = await fetch("http://localhost:3000/users/sync", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(currentUser)
            });

            if (!syncRes.ok) {
                const errData = await syncRes.json();
                throw new Error(errData.message || "User sync failed");
            }

            setUser(currentUser);
            navigate("/");

        } catch (err) {
            console.error("Login Error:", err.message);
            setError(err.message);
        }
    };

    // Google Login
    // const handleGoogleLogin = async () => {
    //     const provider = new GoogleAuthProvider();
    //     try {
    //         const result = await signInWithPopup(auth, provider);
    //         const gUser = result.user;

    //         const currentUser = {
    //             uid: gUser.uid,
    //             name: gUser.displayName,
    //             email: gUser.email,
    //             photoURL: gUser.photoURL,
    //             role: "buyer",
    //             status: "pending"
    //         };

    //         // Backend sync
    //         const syncRes = await fetch("http://localhost:3000/users/sync", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify(currentUser)
    //         });

    //         if (!syncRes.ok) {
    //             const errData = await syncRes.json();
    //             throw new Error(errData.message || "User sync failed");
    //         }

    //         setUser(currentUser);
    //         navigate("/");

    //     } catch (err) {
    //         console.error("Google Login Error:", err.message);
    //         setError(err.message);
    //     }
    // };


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

            // Backend sync
            const res = await fetch("http://localhost:3000/users/sync", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(currentUser)
            });

            if (!res.ok) throw new Error("User sync failed");

            setUser(currentUser);
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

                <button type="button" onClick={handleGoogleLogin} className="btn btn-outline w-full mt-4">
                    Login with Google
                </button>
            </form>
        </div>
    );
};

export default Login;
