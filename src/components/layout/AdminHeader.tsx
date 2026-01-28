import { twMerge } from "tailwind-merge";
import { FiUser } from "react-icons/fi";
import useAuthStore from "../../store/useAuthStore.ts";

function AdminHeader() {
    const { user } = useAuthStore();

    return (
        <header
            className={twMerge([
                "h-17.5",
                "bg-white",
                "border-b",
                "border-gray-200",
                "flex",
                "items-center",
                "justify-between",
                "px-8",
                "sticky",
                "top-0",
                "z-40",
            ])}
        >
            <h1 className="text-lg font-bold text-gray-800">ADMIN CONSOLE</h1>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                        <FiUser />
                    </div>
                    <div className="text-sm">
                        <span className="font-semibold text-gray-800">
                            {user?.name || "관리자"}
                        </span>
                        <span className="text-gray-500 ml-1">님</span>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default AdminHeader;
