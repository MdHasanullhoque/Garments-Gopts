import { createBrowserRouter } from "react-router-dom";
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

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    if (!token) return window.location.href = "/login";
    return children;
}

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "products/:id",
                element: <ProductDetails />
            },
            {
                path: "/all-products",
                element: <AllProducts />
            },
        ]
    },


    //Dashboard


    {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
            {
                path: "manage-users",
                element: <ManageUsers />
            },
            {
                path: "all-productss",
                element: <AllProductss />
            },
            {
                path: "all-orders",
                element: <ALlOrders />
            }
        ]
    }

]);
