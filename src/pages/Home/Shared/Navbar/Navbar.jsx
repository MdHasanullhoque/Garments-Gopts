import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from '../../../../context/AuthProvider';
import { signOut } from "firebase/auth";
import { auth } from '../../../../firebaseConfig';
import Logo from '../../../Logo/Logo';

const Navbar = () => {
    const { user } = useContext(AuthContext);
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        signOut(auth);
        setOpen(false);
    }

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <Link to="/" className="btn btn-ghost text-xl"><Logo /></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to="/">Home</Link></li>
                    <li><a>All Products</a></li>
                    <li><a>About Us</a></li>
                    <li><a>Contact</a></li>
                </ul>
            </div>
            <div className="navbar-end">
                {!user && <Link to="/login" className="btn">Login</Link>}
                {user && (
                    <div className="relative">
                        <img 
                            src={user.photoURL} 
                            className="w-10 h-10 rounded-full cursor-pointer" 
                            onClick={() => setOpen(!open)} 
                        />
                        {open && (
                            <div className="absolute right-0 mt-2 p-3 bg-white shadow-md rounded w-40">
                                <p>{user.displayName}</p>
                                <p>{user.email}</p>
                                <Link to="/dashboard" className="block mt-1">Dashboard</Link>
                                <button onClick={handleLogout} className="btn btn-sm mt-1 w-full">Logout</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
