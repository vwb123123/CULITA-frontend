import { twMerge } from "tailwind-merge";
import TopHeader from "../components/layout/TopHeader.tsx";
import Header from "../components/layout/Header.tsx";
import { Outlet } from "react-router";
import Footer from "../components/layout/Footer.tsx";

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
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
export default Layout;
