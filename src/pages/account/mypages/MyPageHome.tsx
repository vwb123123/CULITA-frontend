import { twMerge } from "tailwind-merge";
import type { User } from "../../../types/user.ts";

interface MyPageHomeProps {
    user: User | null;
    logout: () => void;
}

const MyPageHome = ({ user, logout }: MyPageHomeProps) => {
    return (
        <div
            className={twMerge([
                "grid",
                "grid-cols-1",
                "md:grid-cols-2",
                "gap-6",
            ])}
        >
            {/* 왼쪽 유저 정보 섹션 */}
            <div
                className={twMerge([
                    "border",
                    "border-gray-100",
                    "p-8",
                    "rounded-sm",
                ])}
            >
                <div
                    className={twMerge([
                        "flex",
                        "justify-between",
                        "items-start",
                        "mb-10",
                    ])}
                >
                    <div>
                        <p className={twMerge(["text-lg", "font-light"])}>
                            안녕하세요{" "}
                            <span className="text-[#ff4600] font-medium">
                                {user?.name || "이서연"}
                            </span>
                            님, 회원님은{" "}
                            <span className="text-[#ff4600] font-medium">
                                일반회원
                            </span>{" "}
                            입니다.
                        </p>
                        <button
                            onClick={logout}
                            className={twMerge([
                                "text-xs",
                                "text-gray-400",
                                "underline",
                                "mt-2",
                            ])}
                        >
                            로그아웃
                        </button>
                    </div>
                    <button
                        className={twMerge([
                            "border",
                            "border-gray-200",
                            "text-[11px]",
                            "px-3",
                            "py-1",
                        ])}
                    >
                        회원 혜택
                    </button>
                </div>
                <div
                    className={twMerge([
                        "space-y-4",
                        "border-t",
                        "border-black",
                        "pt-6",
                    ])}
                >
                    <div
                        className={twMerge([
                            "flex",
                            "justify-between",
                            "text-sm",
                        ])}
                    >
                        <span className="text-gray-600">적립금</span>
                        <span className="font-medium text-gray-300">
                            3,000원
                        </span>
                    </div>
                    <div
                        className={twMerge([
                            "flex",
                            "justify-between",
                            "text-sm",
                            "pt-4",
                            "border-t",
                            "border-gray-50",
                        ])}
                    >
                        <span className="text-gray-600">쿠폰</span>
                        <span className="font-medium text-gray-300">0</span>
                    </div>
                </div>
            </div>

            {/* 오른쪽 주문배송 섹션 */}
            <div
                className={twMerge([
                    "border",
                    "border-gray-100",
                    "p-8",
                    "rounded-sm",
                ])}
            >
                <div
                    className={twMerge([
                        "flex",
                        "justify-between",
                        "items-center",
                        "mb-10",
                    ])}
                >
                    <h3 className="text-sm font-medium">
                        주문배송{" "}
                        <span className="text-[11px] text-gray-400 font-normal ml-2">
                            최근 3개월 기준
                        </span>
                    </h3>
                    <span className="text-gray-300 text-xs font-light">
                        {">"}
                    </span>
                </div>
                <div
                    className={twMerge([
                        "flex",
                        "justify-between",
                        "items-center",
                        "text-center",
                        "mb-10",
                    ])}
                >
                    {[
                        { label: "입금전", count: 0 },
                        { label: "배송준비중", count: 0 },
                        { label: "배송중", count: 0 },
                        { label: "배송완료", count: 0 },
                    ].map((item, idx, arr) => (
                        <div
                            key={item.label}
                            className="flex flex-1 items-center justify-center"
                        >
                            <div className="flex flex-col items-center">
                                <span className="text-2xl font-light mb-2 text-gray-300">
                                    {item.count}
                                </span>
                                <span className="text-[11px] text-gray-500">
                                    {item.label}
                                </span>
                            </div>
                            {idx !== arr.length - 1 && (
                                <span className="text-gray-200 font-thin text-xl ml-8">
                                    {">"}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
                <div
                    className={twMerge([
                        "grid",
                        "grid-cols-3",
                        "bg-gray-50",
                        "py-4",
                        "text-center",
                        "text-[11px]",
                    ])}
                >
                    <div className="border-r border-gray-200 text-gray-500">
                        취소 <span className="ml-1 text-gray-300">0</span>
                    </div>
                    <div className="border-r border-gray-200 text-gray-500">
                        교환 <span className="ml-1 text-gray-300">0</span>
                    </div>
                    <div className="text-gray-500">
                        반품 <span className="ml-1 text-gray-300">0</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPageHome;
