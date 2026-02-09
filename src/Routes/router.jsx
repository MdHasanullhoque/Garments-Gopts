
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
import MyProfile from "../DashboardOrg/MyProfile";
import TrackOrder from "../DashboardOrg/TrackOrder";
import NotFound from "../pages/NotFound";

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
        errorElement: <NotFound />,
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
        errorElement: <NotFound />,
        children: [
            { path: "manage-users", element: <AdminRoute><ManageUsers /></AdminRoute> },
            {
                path: "profile",
                element: (
                    <PrivateRoute>
                        <MyProfile />
                    </PrivateRoute>
                ),
            },

            { path: "my-orders", element: <MyOrders /> },
            { path: "track-order", element: <TrackOrder /> },

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
