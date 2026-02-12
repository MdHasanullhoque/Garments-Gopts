import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../pages/Home/Shared/Footer/Footer';
import Navbar from '../pages/Home/Shared/Navbar/Navbar';

const RootLayout = () => {
    return (
        <div>
            <Navbar></Navbar>



            <div className="w-full max-w-7xl mx-auto px-4">
                <Outlet></Outlet>
            </div>

            <Footer></Footer>
        </div>
    );
};

export default RootLayout;