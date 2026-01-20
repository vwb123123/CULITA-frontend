import { createBrowserRouter } from "react-router";
import Layout from "../layouts/Layout.tsx";
import Home from "../pages/Home.tsx";
import Login from "../pages/account/Login.tsx";
import SignUp from "../pages/account/SignUp.tsx";

const router = createBrowserRouter([
    {
        path: "",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "login", element: <Login /> },
            { path: "signUp", element: <SignUp /> },
        ],
    },
]);
export default router;
