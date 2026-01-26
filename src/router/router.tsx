import { createBrowserRouter } from "react-router";
import Layout from "../layouts/Layout.tsx";
import Home from "../pages/Home.tsx";
import Login from "../pages/account/Login.tsx";
import Register from "../pages/account/Register.tsx";
import FaQ from "../pages/account/FaQ.tsx";
import CheckOrder from "../pages/account/CheckOrder.tsx";
import MyPage from "../pages/account/mypages/MyPage.tsx";
import CartPage from "../pages/(shop)/CartPage.tsx";
import ShopPage from "../pages/(shop)/ShopPage.tsx";

const router = createBrowserRouter([
    {
        path: "",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            { path: "check-order", element: <CheckOrder /> },
            { path: "mypage", element: <MyPage /> },
            { path: "faq", element: <FaQ /> },
            { path: "cart", element: <CartPage /> },
            { path: "shop", element: <ShopPage /> },
        ],
    },
]);
export default router;
