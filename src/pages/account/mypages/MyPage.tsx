import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";
import useAuthStore from "../../../store/useAuthStore.ts";

const TABS = [
    { label: "홈", path: "/mypage" },
    { label: "주문내역조회", path: "/mypage/orders" },
    { label: "취소/교환/반품", path: "/mypage/cancel" },
    { label: "리뷰관리", path: "/mypage/reviews" },
    { label: "고객센터", path: "/mypage/customer-center" },
    { label: "회원정보", path: "/mypage/user-info" },
];

const MyPage = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { isLoggedIn } = useAuthStore();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn, navigate]);

    if (!isLoggedIn) return null;

    return (
        <div
            className={twMerge(
                ["w-full", "max-w-[1168px]", "mx-auto"],
                ["pt-[170px]", "pb-[200px]", "px-10"],
            )}
        >
            <h2
                className={twMerge(
                    ["text-[36px]", "font-medium", "text-center"],
                    ["mb-10", "tracking-widest", "uppercase"],
                    ["mt-[35px]"],
                )}
            >
                My Page
            </h2>

            <nav
                className={twMerge(
                    ["flex", "flex-wrap"],
                    ["justify-center", "items-center"],
                    ["gap-x-6", "gap-y-4", "mb-12"],
                )}
            >
                {TABS.map((tab) => (
                    <button
                        key={tab.label}
                        onClick={() => navigate(tab.path)}
                        className={twMerge(
                            [
                                "text-sm",
                                "font-medium",
                                "transition-all",
                                "px-4",
                                "py-1.5",
                            ],
                            pathname === tab.path ||
                                (tab.path !== "/mypage" &&
                                    pathname.startsWith(tab.path))
                                ? ["text-white", "bg-[#ff4600]", "rounded-full"]
                                : ["text-gray-700", "hover:text-black"],
                        )}
                    >
                        {tab.label}
                    </button>
                ))}
            </nav>

            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default MyPage;
