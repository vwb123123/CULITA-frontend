import { NavLink, Link } from "react-router";
import { twMerge } from "tailwind-merge";
import {
    FiHome,
    FiUsers,
    FiShoppingBag,
    FiList,
    FiPackage,
    FiLogOut,
    FiMessageSquare,
} from "react-icons/fi";
import logo from "../../assets/mainPage/logo2.png";
import useAuthStore from "../../store/useAuthStore.ts";
import { RiCustomerServiceLine } from "react-icons/ri";

const MENUS = [
    { name: "대시보드", path: "/admin", icon: <FiHome /> },
    { name: "회원 관리", path: "/admin/users", icon: <FiUsers /> },
    { name: "카테고리 관리", path: "/admin/categories", icon: <FiList /> },
    { name: "상품 관리", path: "/admin/products", icon: <FiShoppingBag /> },
    { name: "주문 관리", path: "/admin/orders", icon: <FiPackage /> },
    { name: "리뷰 관리", path: "/admin/reviews", icon: <FiMessageSquare /> },
    {
        name: "문의 관리",
        path: "/admin/inquiries",
        icon: <RiCustomerServiceLine />,
    },
];

function AdminSidebar() {
    const { logout } = useAuthStore();

    const handleLogout = () => {
        if (confirm("관리자 로그아웃 하시겠습니까?")) {
            logout();
            window.location.href = "/login";
        }
    };

    return (
        <aside
            className={twMerge([
                "w-64",
                "h-screen",
                "bg-white",
                "border-r",
                "border-gray-200",
                "fixed",
                "left-0",
                "top-0",
                "z-50",
                "flex",
                "flex-col",
                "transition-all",
                "duration-300",
            ])}
        >
            <div
                className={twMerge([
                    "h-17.5",
                    "flex",
                    "items-center",
                    "justify-center",
                    "border-b",
                    "border-gray-100",
                ])}
            >
                <Link to="/admin" className="w-32">
                    <img
                        src={logo}
                        alt="Culita Admin"
                        className="w-full object-contain"
                    />
                </Link>
            </div>

            <nav className="flex-1 py-6 px-4 space-y-2">
                <p className="text-xs text-gray-400 font-semibold mb-4 px-2">
                    MENU
                </p>
                {MENUS.map((menu) => (
                    <NavLink
                        key={menu.path}
                        to={menu.path}
                        end={menu.path === "/admin"}
                        className={({ isActive }) =>
                            twMerge([
                                "flex",
                                "items-center",
                                "gap-3",
                                "px-4",
                                "py-3",
                                "rounded-xl",
                                "text-sm",
                                "font-medium",
                                "transition-all",
                                "duration-200",
                                isActive
                                    ? ["bg-[#ff4600]/10", "text-[#ff4600]"]
                                    : [
                                          "text-gray-600",
                                          "hover:bg-gray-50",
                                          "hover:text-gray-900",
                                      ],
                            ])
                        }
                    >
                        <span className="text-lg">{menu.icon}</span>
                        {menu.name}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-100">
                <button
                    onClick={handleLogout}
                    className={twMerge([
                        "flex",
                        "items-center",
                        "gap-3",
                        "w-full",
                        "px-4",
                        "py-3",
                        "text-sm",
                        "text-gray-500",
                        "hover:text-[#ff4600]",
                        "transition-colors",
                    ])}
                >
                    <FiLogOut className="text-lg" />
                    로그아웃
                </button>
            </div>
        </aside>
    );
}

export default AdminSidebar;
