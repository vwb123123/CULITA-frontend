import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";
import MyPageHome from "./MyPageHome";
import useAuthStore from "../../../store/useAuthStore.ts";

const TABS = ["홈", "주문내역조회", "취소/교환/반품", "회원정보"];

const MyPage = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuthStore();
    const [activeTab, setActiveTab] = useState("홈");

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn, navigate]);

    if (!isLoggedIn) return null;

    return (
        <main
            className={twMerge([
                "w-full",
                "max-w-[1200px]",
                "mx-auto",
                "pt-[160px]",
                "pb-[100px]",
                "px-4",
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
                            activeTab === tab
                                ? [
                                      "text-white",
                                      "bg-[#ff4600]",
                                      "rounded-full",
                                      "px-4",
                                      "py-1.5",
                                  ]
                                : ["text-gray-500", "hover:text-black", "px-2"],
                        )}
                    >
                        {tab === "홈" && activeTab === tab && (
                            <span className="w-1.5 h-1.5 bg-white rounded-full" />
                        )}
                        {tab}
                    </button>
                ))}
            </nav>

            {/* 탭에 따른 컴포넌트 렌더링 */}
            {activeTab === "홈" ? (
                <MyPageHome />
            ) : (
                /* 주문내역조회 및 기타 탭 뷰 */
                <>
                    <div
                        className={twMerge(
                            ["flex", "flex-col", "md:flex-row"],
                            ["items-center", "justify-center"],
                            ["gap-3", "mb-16", "border-t"],
                            ["border-gray-100", "pt-10"],
                        )}
                    >
                        <div className={twMerge(["relative", "w-[220px]"])}>
                            <select
                                className={twMerge([
                                    "w-full",
                                    "border",
                                    "border-gray-300",
                                    "rounded-[2px]",
                                    "px-3",
                                    "py-2",
                                    "text-[13px]",
                                    "outline-none",
                                    "appearance-none",
                                    "bg-white",
                                ])}
                            >
                                <option>전체 주문처리상태</option>
                            </select>
                            <div
                                className={twMerge([
                                    "absolute",
                                    "right-3",
                                    "top-1/2",
                                    "-translate-y-1/2",
                                    "pointer-events-none",
                                ])}
                            >
                                <svg
                                    width="10"
                                    height="6"
                                    viewBox="0 0 10 6"
                                    fill="none"
                                >
                                    <path
                                        d="M1 1L5 5L9 1"
                                        stroke="#999"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div
                            className={twMerge([
                                "flex",
                                "border",
                                "border-gray-200",
                                "rounded-[2px]",
                                "overflow-hidden",
                                "h-[38px]",
                            ])}
                        >
                            {["오늘", "3개월", "6개월", "설정"].map(
                                (period) => (
                                    <button
                                        key={period}
                                        className={twMerge(
                                            [
                                                "px-5",
                                                "text-[13px]",
                                                "border-r",
                                                "border-gray-200",
                                                "last:border-r-0",
                                                "transition-all",
                                            ],
                                            period === "3개월"
                                                ? ["bg-black", "text-white"]
                                                : [
                                                      "bg-white",
                                                      "text-gray-600",
                                                      "hover:bg-gray-50",
                                                  ],
                                        )}
                                    >
                                        {period}
                                    </button>
                                ),
                            )}
                        </div>
                    </div>
                    <div
                        className={twMerge([
                            "flex",
                            "flex-col",
                            "items-center",
                            "justify-center",
                            "py-32",
                            "border-t",
                            "border-gray-100",
                        ])}
                    >
                        <p
                            className={twMerge([
                                "text-[#999]",
                                "text-[13px]",
                                "tracking-tight",
                            ])}
                        >
                            주문 내역이 없습니다.
                        </p>
                    </div>
                    <div
                        className={twMerge([
                            "flex",
                            "justify-center",
                            "items-center",
                            "gap-6",
                            "mt-8",
                        ])}
                    >
                        <button
                            className={twMerge(["text-gray-300", "text-lg"])}
                        >
                            {"<"}
                        </button>
                        <span className={twMerge(["text-[13px]", "font-bold"])}>
                            1
                        </span>
                        <button
                            className={twMerge(["text-gray-300", "text-lg"])}
                        >
                            {">"}
                        </button>
                    </div>
                </>
            )}
        </main>
    );
};

export default MyPage;
