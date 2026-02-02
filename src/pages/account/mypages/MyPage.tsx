import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";
import MyPageHome from "./MyPageHome";
import useAuthStore from "../../../store/useAuthStore.ts";
import OrderHistory from "./OrderHistory.tsx";
import UserInfo from "./UserInfo.tsx";
import CancelHistory from "./CancelHistory.tsx";

const TABS = ["홈", "주문내역조회", "취소/교환/반품", "회원정보"];

const MyPage = () => {
    const navigate = useNavigate();
    const { isLoggedIn, user } = useAuthStore();
    const [activeTab, setActiveTab] = useState("홈");

    const isAdmin = user?.role === "ADMIN";

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn, navigate]);

    if (!isLoggedIn) return null;

    return (
        <div
            className={twMerge([
                "w-full",
                "max-w-[1168px]",
                "mx-auto",
                "pt-[170px]",
                "pb-[200px]",
                "px-10",
            ])}
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
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={twMerge(
                            ["text-sm", "font-medium", "transition-all"],
                            ["flex", "items-center", "gap-2"],
                            ["px-4", "py-1.5"],
                            activeTab === tab
                                ? ["text-white", "bg-[#ff4600]", "rounded-full"]
                                : ["text-gray-700", "hover:text-black"],
                        )}
                    >
                        {tab}
                    </button>
                ))}

                {/* 관리자 전용 버튼 */}
                {isAdmin && (
                    <button
                        onClick={() => navigate("/admin")}
                        className={twMerge(
                            ["text-sm", "font-medium"],
                            ["px-4", "py-1.5"],
                            ["border", "border-red-500", "text-red-600"],
                            ["rounded-full", "hover:bg-red-50"],
                        )}
                    >
                        관리자 페이지
                    </button>
                )}
            </nav>

            {/* 탭에 따른 컴포넌트 렌더링 */}
            {activeTab === "홈" && <MyPageHome />}
            {activeTab === "주문내역조회" && <OrderHistory />}
            {activeTab === "취소/교환/반품" && <CancelHistory />}
            {activeTab === "회원정보" && <UserInfo />}
        </div>
    );
};

export default MyPage;
