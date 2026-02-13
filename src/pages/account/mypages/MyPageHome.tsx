import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import useAuthStore from "../../../store/useAuthStore.ts";
import { getOrders } from "../../../api/order.api.ts";
import type { Order } from "../../../types/order.ts";
import Spinner from "../../../components/common/Spinner.tsx";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router";

interface MyOrderResponse {
    message: string;
    data: {
        data: Order[];
        pagination: {
            total: number;
            totalPages: number;
            currentPage: number;
            limit: number;
        };
    };
}

const MyPageHome = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const response =
                    (await getOrders()) as unknown as MyOrderResponse;

                if (response?.data?.data && Array.isArray(response.data.data)) {
                    setOrders(response.data.data);
                } else {
                    setOrders([]);
                }
            } catch (error) {
                console.error("주문 목록 로드 실패:", error);
                setOrders([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchOrderData().then(() => {});
    }, []);

    const getCount = (statusList: string[]) => {
        const safeOrders: Order[] = Array.isArray(orders) ? orders : [];
        return safeOrders.filter((order) => statusList.includes(order.status))
            .length;
    };

    const handleLogout = () => {
        const confirm = window.confirm("로그아웃 하시겠습니까?");
        if (confirm) {
            logout();
            alert("로그아웃 되었습니다.");
            navigate("/");
        }
    };

    const orderStats = [
        {
            label: "결제완료",
            count: getCount(["PAID"]),
        },
        {
            label: "배송준비중",
            count: getCount(["PREPARING"]),
        },
        {
            label: "배송중",
            count: getCount(["SHIPPING"]),
        },
        {
            label: "배송완료",
            count: getCount(["DELIVERED"]),
        },
    ];

    const claimStats = {
        cancel: getCount(["CANCELED"]),
        exchange: getCount(["EXCHANGED"]),
        refund: getCount(["RETURNED"]),
    };

    if (isLoading) {
        return (
            <div className="min-h-[400px] flex flex-col items-center justify-center">
                <Spinner full />
                <div className="mt-4 text-center text-gray-400">
                    데이터를 불러오는 중입니다...
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-[800px] mx-auto animate-in fade-in duration-500">
            <div className="border border-gray-100 p-10 rounded-sm bg-white shadow-sm">
                <div className="mb-12 text-center sm:text-left">
                    <p className="text-2xl font-light">
                        안녕하세요{" "}
                        <span className="text-[#ff4600] font-medium">
                            {user?.name || "고객"}
                        </span>
                        님, 환영합니다!
                    </p>
                    <button
                        onClick={handleLogout}
                        className="text-xs text-gray-400 underline mt-3 hover:text-black transition-colors"
                    >
                        로그아웃
                    </button>
                </div>

                <div className="border-t border-black pt-10">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-sm font-bold uppercase tracking-wider">
                            주문/배송 현황
                            <span className="text-[11px] text-gray-400 font-normal ml-3 normal-case">
                                최근 3개월 기준 (총 {orders.length}건)
                            </span>
                        </h3>
                    </div>

                    <div className="flex justify-between items-center text-center mb-10 px-4 gap-2">
                        {orderStats.map((item, idx, arr) => (
                            <div
                                key={item.label}
                                className="flex flex-1 items-center justify-center"
                            >
                                <div className="flex flex-col items-center">
                                    <span
                                        className={twMerge([
                                            "text-2xl sm:text-3xl font-light mb-3 transition-all",
                                            item.count > 0
                                                ? "text-[#ff4600] font-medium scale-110"
                                                : "text-gray-200",
                                        ])}
                                    >
                                        {item.count}
                                    </span>
                                    <span className="text-[11px] sm:text-[12px] text-gray-600 font-medium whitespace-nowrap">
                                        {item.label}
                                    </span>
                                </div>
                                {idx !== arr.length - 1 && (
                                    <div className="flex-1 flex justify-center">
                                        <span className="text-gray-500 text-xl">
                                            <IoIosArrowForward />
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-3 bg-gray-50 rounded-sm py-5 text-center text-[12px] border border-gray-100">
                        <div className="border-r border-gray-200 text-gray-500">
                            취소{" "}
                            <span
                                className={twMerge([
                                    "ml-2 font-bold",
                                    claimStats.cancel > 0
                                        ? "text-black"
                                        : "text-gray-300",
                                ])}
                            >
                                {claimStats.cancel}
                            </span>
                        </div>
                        <div className="border-r border-gray-200 text-gray-500">
                            교환{" "}
                            <span
                                className={twMerge([
                                    "ml-2 font-bold",
                                    claimStats.exchange > 0
                                        ? "text-black"
                                        : "text-gray-300",
                                ])}
                            >
                                {claimStats.exchange}
                            </span>
                        </div>
                        <div className="text-gray-500">
                            반품{" "}
                            <span
                                className={twMerge([
                                    "ml-2 font-bold",
                                    claimStats.refund > 0
                                        ? "text-black"
                                        : "text-gray-300",
                                ])}
                            >
                                {claimStats.refund}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <p className="text-center mt-8 text-[11px] text-gray-400">
                실시간 배송 정보는 택배사 데이터 연동에 따라 1~2일 차이가 발생할
                수 있습니다.
            </p>
        </div>
    );
};

export default MyPageHome;
