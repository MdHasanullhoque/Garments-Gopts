
// import { createBrowserRouter, Navigate } from "react-router-dom";
// import { useContext } from "react";
// import RootLayout from "../layouts/RootLayout";
// import Home from "../pages/Home/Home";
// import Login from "../pages/Auth/Login";
// import Register from "../pages/Auth/Register";
// import ProductDetails from "../pages/Home/ProductDetails";
// import AllProducts from "../pages/AllProducts";
// import DashboardLayout from "../DashboardOrg/DashboardLayout";
// import ManageUsers from "../DashboardOrg/ManageUsers";
// import ALlOrders from "../DashboardOrg/AllOrders";
// import AllOrders from "../DashboardOrg/AllOrders";
// import AllProductss from "../DashboardOrg/AllProductss";
// import BookingPage from "../pages/Booking/BookingPage";
// import MyOrders from "../DashboardOrg/MyOrders";
// import { AuthContext } from "../context/AuthProvider";
// import AdminRoute from "./AdminRoute";
// import ManagerRoute from "../DashboardOrg/Manager Dashboard Pages/ManagerRoute";
// import AddProduct from "../DashboardOrg/Manager Dashboard Pages/AddProduct";
// import ManageProducts from "../DashboardOrg/Manager Dashboard Pages/ManageProducts";
// import PendingOrders from "../DashboardOrg/Manager Dashboard Pages/PendingOrders";
// import ApproveOrders from "../DashboardOrg/Manager Dashboard Pages/ApproveOrders";



// // PrivateRoute Component
// const PrivateRoute = ({ children }) => {
//     const { user } = useContext(AuthContext);
//     if (!user?.email) return <Navigate to="/login" />;
//     return children;
// };

// export const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <RootLayout />,
//         children: [
//             { index: true, element: <Home /> },
//             { path: "login", element: <Login /> },
//             { path: "register", element: <Register /> },
//             //30-01-02026
//             { path: "products", element: <Navigate to="/all-products" /> }, // <-- add this
//             { path: "products/:id", element: <ProductDetails /> },
//             { path: "all-products", element: <AllProducts /> },
//             {
//                 path: "booking/:id",
//                 element: (
//                     <PrivateRoute>
//                         <BookingPage />
//                     </PrivateRoute>
//                 ),
//             },
//         ],
//     },
//     {
//         path: "dashboard",
//         element: <DashboardLayout />,
//         children: [
//             { path: "manage-users", element: <ManageUsers /> },

//             // { path: "all-productss", element: <AllProductss /> },
//             // Dashboard children
//             {
//                 path: "all-productss",
//                 element: <AdminRoute />,
//                 children: [{ path: "", element: <AllProductss /> }],
//             },

//             // { path: "all-orders", element: <ALlOrders /> },
//             // {
//             //     path: "my-orders",
//             //     element: <MyOrders />
//             // },

//             {
//                 path: "all-orders",
//                 element: <AdminRoute />, // admin can see all orders
//                 children: [{ path: "", element: <AllOrders /> }],
//             },
//             { path: "my-orders", element: <MyOrders /> },



//             //manager routes 

//             {
//                 path: "manager",
//                 element: <ManagerRoute />,
//                 children: [
//                     { path: "add-product", element: <AddProduct /> },
//                     { path: "manage-products", element: <ManageProducts /> },
//                     { path: "pending-orders", element: <PendingOrders /> },
//                     { path: "approve-orders", element: <ApproveOrders /> },
//                 ],
//             },
//         ],
//     },
// ]);


import { createBrowserRouter, Navigate } from "react-router-dom";
import { useContext } from "react";
import RootLayout from "../layouts/RootLayout";
import DashboardLayout from "../DashboardOrg/DashboardLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ProductDetails from "../pages/Home/ProductDetails";
import AllProducts from "../pages/AllProducts";
import ManageUsers from "../DashboardOrg/ManageUsers";
import AllOrders from "../DashboardOrg/AllOrders";
import AllProductss from "../DashboardOrg/AllProductss";
import BookingPage from "../pages/Booking/BookingPage";
import MyOrders from "../DashboardOrg/MyOrders";
import { AuthContext } from "../context/AuthProvider";
import AdminRoute from "./AdminRoute";
import ManagerRoute from "../DashboardOrg/Manager Dashboard Pages/ManagerRoute";
import AddProduct from "../DashboardOrg/Manager Dashboard Pages/AddProduct";
import ManageProducts from "../DashboardOrg/Manager Dashboard Pages/ManageProducts";
import PendingOrders from "../DashboardOrg/Manager Dashboard Pages/PendingOrders";
import ApproveOrders from "../DashboardOrg/Manager Dashboard Pages/ApproveOrders";

// PrivateRoute
const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (!user?.email) return <Navigate to="/login" />;
    return children;
};

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            { path: "products", element: <Navigate to="/all-products" /> },
            { path: "products/:id", element: <ProductDetails /> },
            { path: "all-products", element: <AllProducts /> },
            {
                path: "booking/:id",
                element: (
                    <PrivateRoute>
                        <BookingPage />
                    </PrivateRoute>
                ),
            },
        ],
    },
    {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
            { path: "manage-users", element: <AdminRoute><ManageUsers /></AdminRoute> },
            { path: "all-productss", element: <AdminRoute><AllProductss /></AdminRoute> },
            { path: "all-orders", element: <AdminRoute><AllOrders /></AdminRoute> },
            { path: "my-orders", element: <MyOrders /> },

            // Manager routes
            {
                path: "manager",
                element: <ManagerRoute />,
                children: [
                    { path: "add-product", element: <AddProduct /> },
                    { path: "manage-products", element: <ManageProducts /> },
                    { path: "pending-orders", element: <PendingOrders /> },
                    { path: "approve-orders", element: <ApproveOrders /> },
                ],
            },
        ],
    },
]);
