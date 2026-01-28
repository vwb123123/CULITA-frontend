import { Outlet } from "react-router";
import { twMerge } from "tailwind-merge";
import AdminSidebar from "../components/layout/AdminSidebar.tsx";
import AdminHeader from "../components/layout/AdminHeader.tsx";

function AdminLayout() {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            <AdminSidebar />
            <div className={twMerge(["flex-1", "flex", "flex-col", "ml-64"])}>
                <AdminHeader />

                <main className={twMerge(["flex-1", "p-8", "overflow-auto"])}>
                    <div className="max-w-400 mx-auto">
                        <Outlet />
                    </div>
                </main>

                <footer className="py-6 text-center text-xs text-gray-400">
                    &copy; {new Date().getFullYear()} Culita Admin Panel. All
                    rights reserved.
                </footer>
            </div>
        </div>
    );
}

export default AdminLayout;
