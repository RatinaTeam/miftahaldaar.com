import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import ErrorPage from "../components/Shared/ErrorPage";
import Login from "../components/Authentication/Login";
import DashboardLayout from "../layout/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../components/Dashboard/Dashboard";
import Users from "../components/Dashboard/Users/Users";
import NewOrders from "../components/Dashboard/NewOrders";
import NewOrder from "../components/Dashboard/NewOrder/NewOrder";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Login />,
            },
            {
                path: "/login",
                element: <Login />,
            },
        ],
    },
    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
                <DashboardLayout />
            </PrivateRoute>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/dashboard",
                element: <Dashboard />,
            },
            {
                path: "users_list",
                element: <Users />,
            },
            {
                path: "new_order",
                element: <NewOrder />,
            },

        ],
    },
]);

export default router;
