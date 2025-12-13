
import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link } from "react-router-dom";
import { AuthContext } from '../../../../context/AuthProvider';
import { signOut } from "firebase/auth";
import { auth } from '../../../../firebaseConfig';
import Logo from '../../../Logo/Logo';

const Navbar = () => {
    const { user } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const [userOpen, setUserOpen] = useState(false);

    const menuRef = useRef(null);
    const userRef = useRef(null);

    const handleLogout = () => {
        signOut(auth);
        setUserOpen(false);
    }

    // Click outside handler
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
            if (userRef.current && !userRef.current.contains(event.target)) {
                setUserOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, []);

    return (
        <div className="navbar bg-base-100 shadow-sm px-4 md:px-8 relative">
            {/* Logo */}
            <div className="navbar-start">
                <Link to="/" className="btn btn-ghost text-xl"><Logo /></Link>
            </div>

            {/* Desktop Menu */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-4">
                    <li><Link to="/">Home</Link></li>
                    <li><a>All Products</a></li>
                    <li><a>About Us</a></li>
                    <li><a>Contact</a></li>
                </ul>
            </div>

            {/* Mobile Hamburger */}
            <div className="navbar-center lg:hidden" ref={menuRef}>
                <button
                    className="btn btn-ghost"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {menuOpen && (
                    <div className="absolute top-full left-0 w-full bg-white shadow-md z-40">
                        <ul className="flex flex-col p-4 space-y-2">
                            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
                            <li><a onClick={() => setMenuOpen(false)}>All Products</a></li>
                            <li><a onClick={() => setMenuOpen(false)}>About Us</a></li>
                            <li><a onClick={() => setMenuOpen(false)}>Contact</a></li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Navbar End */}
            <div className="navbar-end relative flex items-center gap-2" ref={userRef}>
                {!user && <Link to="/login" className="btn">Login</Link>}
                {user && (
                    <div className="relative">
                        <img
                            src={user.photoURL}
                            className="w-10 h-10 rounded-full cursor-pointer"
                            onClick={() => setUserOpen(!userOpen)}
                        />
                        {userOpen && (
                            <div className="absolute right-0 mt-2 p-3 bg-white shadow-md rounded w-44 z-50">
                                <p className="text-sm font-medium">{user.displayName}</p>
                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                <Link to="/dashboard" className="block mt-2 text-blue-500 hover:underline">Dashboard</Link>
                                <button onClick={handleLogout} className="btn btn-sm mt-2 w-full">Logout</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
