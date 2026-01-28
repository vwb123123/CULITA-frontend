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
import BrandPage from "../pages/(brand)/BrandPage.tsx";
import FilmPage from "../pages/(film)/FilmPage.tsx";
import EventPage from "../pages/(event)/EventPage.tsx";
import MyPageHome from "../pages/account/mypages/MyPageHome.tsx";
import OrderHistory from "../pages/account/mypages/OrderHistory.tsx";
import CancelHistory from "../pages/account/mypages/CancelHistory.tsx";
import UserInfo from "../pages/account/mypages/UserInfo.tsx";
import CulitaSeason2 from "../pages/(film)/(filmDetailPages)/CulitaSeason2.tsx";
import CulitaCollaboration from "../pages/(film)/(filmDetailPages)/CulitaCollaboration.tsx";
import CulitaEveryday from "../pages/(film)/(filmDetailPages)/CulitaEveryday.tsx";
import CheersToMe from "../pages/(film)/(filmDetailPages)/CheersToMe.tsx";
import CulitaSeason1 from "../pages/(film)/(filmDetailPages)/CulitaSeason1.tsx";
import MayPresent from "../pages/(event)/(eventDetailPages)/MayPresent.tsx";
import CulitasSeason3 from "../pages/(event)/(eventDetailPages)/CulitasSeason3.tsx";
import CulitasSeason2 from "../pages/(event)/(eventDetailPages)/CulitasSeason2.tsx";
import CulitasSeason1 from "../pages/(event)/(eventDetailPages)/CulitasSeason1.tsx";

const router = createBrowserRouter([
    {
        path: "",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            { path: "check-order", element: <CheckOrder /> },
            { path: "faq", element: <FaQ /> },
            { path: "cart", element: <CartPage /> },
            { path: "shop", element: <ShopPage /> },
            { path: "brand", element: <BrandPage /> },
            {
                path: "event",
                children: [
                    { index: true, element: <EventPage /> },
                    { path: "event-list1", element: <MayPresent /> },
                    { path: "event-list2", element: <CulitasSeason3 /> },
                    { path: "event-list3", element: <CulitasSeason2 /> },
                    { path: "event-list4", element: <CulitasSeason1 /> },
                ],
            },

            {
                path: "mypage",
                element: <MyPage />,
                children: [
                    {
                        index: true,
                        element: <MyPageHome />,
                    },
                    { path: "order-history", element: <OrderHistory /> },
                    { path: "cancel-history", element: <CancelHistory /> },
                    { path: "profile", element: <UserInfo /> },
                ],
            },
            {
                path: "film",

                children: [
                    { index: true, element: <FilmPage /> },
                    { path: "board_1", element: <CulitaSeason2 /> },
                    { path: "board_2", element: <CulitaCollaboration /> },
                    { path: "board_3", element: <CulitaSeason1 /> },
                    { path: "board_4", element: <CulitaEveryday /> },
                    { path: "board_5", element: <CheersToMe /> },
                ],
            },
        ],
    },
]);
export default router;
