
import { createBrowserRouter, Navigate } from "react-router-dom";
import { useContext } from "react";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ProductDetails from "../pages/Home/ProductDetails";
import AllProducts from "../pages/AllProducts";
import DashboardLayout from "../DashboardOrg/DashboardLayout";
import ManageUsers from "../DashboardOrg/ManageUsers";
import ALlOrders from "../DashboardOrg/ALlOrders";
import AllProductss from "../DashboardOrg/AllProductss";
import BookingPage from "../pages/Booking/BookingPage";
import MyOrders from "../DashboardOrg/MyOrders";
import { AuthContext } from "../context/AuthProvider";

// PrivateRoute Component
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
            { path: "manage-users", element: <ManageUsers /> },
            { path: "all-productss", element: <AllProductss /> },
            { path: "all-orders", element: <ALlOrders /> },
            { path: "my-orders", element: <MyOrders /> },
        ],
    },
]);

