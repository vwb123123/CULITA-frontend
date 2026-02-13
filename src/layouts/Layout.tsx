import { twMerge } from "tailwind-merge";
import TopHeader from "../components/layout/TopHeader.tsx";
import Header from "../components/layout/Header.tsx";
import { Outlet, ScrollRestoration } from "react-router";
import Footer from "../components/layout/Footer.tsx";
import TopButton from "../components/common/TopButton.tsx";

function Layout() {
    return (
        <div className={twMerge(["min-h-screen", "flex", "flex-col"])}>
            <div
                className={twMerge(
                    ["relative", "overflow-hidden"],
                    ["z-99", "h-7.5"],
                )}
            >
                <TopHeader />
            </div>
            <Header />
            <main className={"flex-1"}>
                <ScrollRestoration />
                <Outlet />
            </main>
            <TopButton />
            <Footer />
        </div>
    );
}
export default Layout;
