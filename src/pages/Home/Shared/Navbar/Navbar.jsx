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
                    <li onClick={() => setMenuOpen(false)}><Link to="/all-products">All Products</Link></li>

                    {/* <li><a>About Us</a></li>
                    <li><a>Contact</a></li> */}

                    {/* About Us link using react-router Link */}
                    <li>
                        <Link to="/about-us" onClick={() => setMenuOpen(false)}>
                            About Us
                        </Link>
                    </li>

                    {/* Contact link using react-router Link */}
                    <li>
                        <Link to="/contact" onClick={() => setMenuOpen(false)}>
                            Contact
                        </Link>
                    </li>

                    {/*  Dashboard only when logged in */}
                    {user && (
                        <li>
                            <Link to="/dashboard">Dashboard</Link>
                        </li>
                    )}

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
                            <li onClick={() => setMenuOpen(false)}><Link to="/all-products">All Products</Link></li>
                            {/* <li><a onClick={() => setMenuOpen(false)}>About Us</a></li>
                            <li><a onClick={() => setMenuOpen(false)}>Contact</a></li> */}

                            {/* About Us link using react-router Link */}
                            <li>
                                <Link to="/about-us" onClick={() => setMenuOpen(false)}>
                                    About Us
                                </Link>
                            </li>

                            {/* Contact link using react-router Link */}
                            <li>
                                <Link to="/contact" onClick={() => setMenuOpen(false)}>
                                    Contact
                                </Link>
                            </li>

                            {/*  Dashboard only when logged in */}
                            {user && (
                                <li>
                                    <Link to="/dashboard">Dashboard</Link>
                                </li>
                            )}

                            {/*  Dashboard only when logged in */}
                            {/* {user && (
                                <li>
                                    <Link to="/dashboard">Dashboard</Link>
                                </li>
                            )} */}

                        </ul>
                    </div>
                )}
            </div>

            {/* Navbar End */}
            <div className="navbar-end relative flex items-center gap-2" ref={userRef}>


                {/* Theme Toggle */}
                <label className="swap swap-rotate mr-2">
                    <input
                        type="checkbox"
                        defaultChecked={localStorage.getItem('theme') === 'dark'}
                        onChange={(e) => {
                            const theme = e.target.checked ? 'dark' : 'light';
                            document.documentElement.setAttribute('data-theme', theme);
                            localStorage.setItem('theme', theme);
                        }}
                    />
                    {/* Sun icon */}
                    <svg className="swap-off h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                    </svg>
                    {/* Moon icon */}
                    <svg className="swap-on h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                    </svg>
                </label>
                {/* Theme Toggle End*/}


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
                                {/* <Link to="/dashboard" className="block mt-2 text-blue-500 hover:underline">Dashboard</Link> */}
                                {/* <Link to="" className="block mt-2 text-blue-500 hover:underline"></Link> */}

                                {/* <DashboardLayout /> */}

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
