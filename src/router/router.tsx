import { createBrowserRouter, redirect } from "react-router";
import Layout from "../layouts/Layout.tsx";
import Home from "../pages/Home.tsx";
import Login from "../pages/account/Login.tsx";
import Register from "../pages/account/Register.tsx";
import FaQ from "../pages/account/FaQ.tsx";
import CheckOrder from "../pages/account/CheckOrder.tsx";
import MyPage from "../pages/account/mypages/MyPage.tsx";
import CartPage from "../pages/(shop)/CartPage.tsx";
import ProductListPage from "../pages/(shop)/ProductListPage.tsx";
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
import useAuthStore from "../store/useAuthStore.ts";
import AdminLayout from "../layouts/AdminLayout.tsx";
import AdminUserList from "../pages/(admin)/users/AdminUserList.tsx";
import AdminUserCreate from "../pages/(admin)/users/AdminUserCreate.tsx";
import AdminUserEdit from "../pages/(admin)/users/AdminUserEdit.tsx";
import AdminCategoryList from "../pages/(admin)/categories/AdminCategoryList.tsx";
import AdminCategoryCreate from "../pages/(admin)/categories/AdminCategoryCreate.tsx";
import AdminCategoryEdit from "../pages/(admin)/categories/AdminCategoryEdit.tsx";
import AdminProductList from "../pages/(admin)/products/AdminProductList.tsx";
import AdminProductCreate from "../pages/(admin)/products/AdminProductCreate.tsx";
import AdminProductEdit from "../pages/(admin)/products/AdminProductEdit.tsx";
import Agreement from "../components/layout/footerLinks/Agreement.tsx";
import Privacy from "../components/layout/footerLinks/Privacy.tsx";

export const adminOnlyLoader = () => {
    const { isLoggedIn, user } = useAuthStore.getState();
    if (!isLoggedIn) {
        alert("관리자 로그인이 필요합니다.");
        return redirect("/login");
    }

    if (user?.role !== "ADMIN") {
        alert("접근 권한이 없습니다.");
        return redirect("/");
    }

    return null;
};

const router = createBrowserRouter([
    {
        path: "",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "products", element: <ProductListPage /> },
            { path: "brand", element: <BrandPage /> },
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
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            { path: "check-order", element: <CheckOrder /> },
            { path: "faq", element: <FaQ /> },
            { path: "cart", element: <CartPage /> },

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
            { path: "agreement", element: <Agreement /> },
            { path: "privacy-policy", element: <Privacy /> },
        ],
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        loader: adminOnlyLoader,
        children: [
            { index: true, element: <div>대시보드 페이지 (준비중)</div> },
            {
                path: "users",
                children: [
                    { index: true, element: <AdminUserList /> },
                    { path: "create", element: <AdminUserCreate /> },
                    { path: ":id", element: <AdminUserEdit /> },
                ],
            },
            {
                path: "categories",
                children: [
                    { index: true, element: <AdminCategoryList /> },
                    { path: "create", element: <AdminCategoryCreate /> },
                    { path: ":path/edit", element: <AdminCategoryEdit /> },
                ],
            },
            {
                path: "products",
                children: [
                    { index: true, element: <AdminProductList /> },
                    { path: "create", element: <AdminProductCreate /> },
                    { path: ":id", element: <AdminProductEdit /> },
                ],
            },
        ],
    },
]);

export default router;
