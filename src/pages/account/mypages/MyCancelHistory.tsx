import { useEffect, useState, useCallback } from "react";
import { twMerge } from "tailwind-merge";
import type { Order, OrdersResponse } from "../../../types/order.ts";
import { getOrders } from "../../../api/order.api.ts";
import Spinner from "../../../components/common/Spinner.tsx";
import { FiX } from "react-icons/fi";

type Period = "오늘" | "1개월" | "3개월" | "6개월";

const STATUS_KO: Record<string, string> = {
    // 결제 관련
    PENDING: "입금 대기",
    PAID: "결제 완료",

    // 배송 관련
    PREPARING: "배송 준비중",
    SHIPPING: "배송 시작",
    SHIPPED: "배송중",
    DELIVERED: "배송 완료",

    // 취소/교환/반품 관련
    CANCELED: "주문 취소",
    EXCHANGE_REQUESTED: "교환 요청",
    EXCHANGED: "교환 완료",
    RETURN_REQUESTED: "반품 요청",
    RETURN_COMPLETED: "반품 완료",
};

function MyCancelHistory() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPeriod, setSelectedPeriod] = useState<Period>("오늘");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [detailOrder, setDetailOrder] = useState<Order | null>(null);

    const fetchCancelData = useCallback(async () => {
        setIsLoading(true);
        try {
            const response: OrdersResponse = await getOrders({
                period: selectedPeriod,
                page: currentPage,
                limit: 10,
            });

            let rawData: Order[] = [];

            if (Array.isArray(response.data)) {
                rawData = response.data;
            } else if (response.data && "data" in response.data) {
                rawData = response.data.data;
            }

            // 기준 날짜 계산
            const now = new Date();
            const searchDate = new Date();
            if (selectedPeriod === "오늘") searchDate.setHours(0, 0, 0, 0);
            else if (selectedPeriod === "1개월")
                searchDate.setMonth(now.getMonth() - 1);
            else if (selectedPeriod === "3개월")
                searchDate.setMonth(now.getMonth() - 3);
            else if (selectedPeriod === "6개월")
                searchDate.setMonth(now.getMonth() - 6);

            // 필터링 (상태 + 날짜)
            const cancelStatuses = [
                "CANCELED",
                "RETURNED",
                "EXCHANGED",
                "RETURN_REQUESTED",
                "RETURN_COMPLETED",
            ];

            const filteredData = rawData.filter((order) => {
                const orderDate = new Date(order.createdAt);
                return (
                    cancelStatuses.includes(order.status) &&
                    orderDate >= searchDate
                );
            });
            setOrders(filteredData);
            if (response.pagination) {
                setTotalPages(response.pagination.totalPages || 1);
            }
        } catch (error) {
            console.error("취소 내역 로드 실패:", error);
            setOrders([]);
        } finally {
            setIsLoading(false);
        }
    }, [selectedPeriod, currentPage]);
    useEffect(() => {
        setCurrentPage(1);
        fetchCancelData().then(() => {});
    }, [selectedPeriod, fetchCancelData]);

    const handleShowDetail = (id: number) => {
        const targetOrder = orders.find((o) => o.id === id);
        if (targetOrder) {
            setDetailOrder(targetOrder);
        } else {
            alert("정보를 찾을 수 없습니다.");
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return "-";
        return new Date(dateString)
            .toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            })
            .replace(/\. /g, "-")
            .replace(".", "");
    };

    return (
        <div className="max-w-[1200px] mx-auto px-4 md:px-0 pb-20">
            {/* 필터 영역 */}
            <div className="flex flex-col items-center justify-center gap-6 mb-10 border-t border-gray-100 pt-10">
                <div className="flex border border-gray-200 rounded-[2px] overflow-hidden h-[38px]">
                    {(["오늘", "1개월", "3개월", "6개월"] as Period[]).map(
                        (period) => (
                            <button
                                key={period}
                                onClick={() => setSelectedPeriod(period)}
                                className={twMerge(
                                    "px-5 text-[13px] border-r border-gray-200 last:border-r-0 transition-all",
                                    selectedPeriod === period
                                        ? "bg-black text-white"
                                        : "bg-white text-gray-600 hover:bg-gray-50",
                                )}
                            >
                                {period}
                            </button>
                        ),
                    )}
                </div>
            </div>

            {isLoading ? (
                <div className="py-32 flex flex-col items-center gap-4">
                    <Spinner />
                </div>
            ) : orders.length > 0 ? (
                <>
                    <div className="divide-y divide-gray-100 border-y border-gray-100">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="grid grid-cols-1 md:grid-cols-[150px_1fr_100px_150px] items-center py-8 text-[13px] text-center"
                            >
                                <div>{formatDate(order.createdAt)}</div>
                                <div className="flex items-center gap-4 text-left px-6">
                                    <img
                                        src={
                                            order.items?.[0]?.product
                                                ?.images?.[0]?.url
                                        }
                                        className="w-20 h-20 object-cover border"
                                        alt=""
                                    />
                                    <div>
                                        <p className="font-medium">
                                            {order.items?.[0]?.product?.name}{" "}
                                            {order.items.length > 1 &&
                                                `외 ${order.items.length - 1}건`}
                                        </p>
                                        <p className="text-gray-500 font-bold">
                                            KRW{" "}
                                            {order.totalPrice.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    {order.items.reduce(
                                        (acc, curr) => acc + curr.quantity,
                                        0,
                                    )}
                                    개
                                </div>
                                <div className="flex flex-col gap-2 items-center">
                                    <span className="font-bold text-red-500">
                                        {STATUS_KO[order.status] || "취소완료"}
                                    </span>
                                    <button
                                        onClick={() =>
                                            handleShowDetail(order.id)
                                        }
                                        className="border border-gray-200 px-4 py-1.5 text-[11px] hover:bg-black hover:text-white transition-all"
                                    >
                                        상세보기
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 페이지네이션 */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-10 gap-2">
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={twMerge(
                                        "w-8 h-8 text-[13px]",
                                        currentPage === i + 1
                                            ? "bg-black text-white"
                                            : "text-gray-400",
                                    )}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <div className="py-24 text-center text-gray-400">
                    취소/교환/반품 내역이 없습니다.
                </div>
            )}

            {/* 상세 내역 팝업 모달 */}
            {detailOrder && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
                    onClick={() => setDetailOrder(null)}
                >
                    <div
                        className="bg-white w-full max-w-2xl rounded-lg shadow-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* 모달 헤더 - 원래 디자인 복구 */}
                        <div className="flex justify-between items-center px-8 py-6 border-b bg-white">
                            <div>
                                <h3 className="font-bold text-lg">
                                    취소/반품 상세 내역
                                </h3>
                                <p className="text-[12px] text-gray-400 mt-1">
                                    주문번호: {detailOrder.id}
                                </p>
                            </div>
                            <button
                                onClick={() => setDetailOrder(null)}
                                className="text-gray-400 hover:text-black transition-colors p-2"
                            >
                                <FiX size={24} />
                            </button>
                        </div>

                        {/* 모달 본문 */}
                        <div className="p-8 overflow-y-auto">
                            <div className="space-y-8">
                                {/* 신청 상품 정보 섹션 */}
                                <section>
                                    <h4 className="font-bold mb-4 text-[13px] text-gray-400 border-b pb-2 uppercase tracking-tight">
                                        신청 상품 정보
                                    </h4>
                                    <div className="space-y-4">
                                        {detailOrder.items?.map((item) => {
                                            const product = item.product;

                                            const imageUrl =
                                                product?.images?.[0]?.url ||
                                                "https://placehold.co/100x100?text=No+Image";

                                            return (
                                                <div
                                                    key={item.id}
                                                    className="flex gap-4 items-center"
                                                >
                                                    <div className="w-16 h-16 bg-gray-50 rounded border border-gray-100 overflow-hidden flex-shrink-0">
                                                        <img
                                                            src={imageUrl}
                                                            className="w-full h-full object-cover"
                                                            alt={
                                                                product?.name ||
                                                                "상품 이미지"
                                                            }
                                                            onError={(e) => {
                                                                (
                                                                    e.target as HTMLImageElement
                                                                ).src =
                                                                    "https://placehold.co/100x100?text=No+Image";
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-medium text-[14px]">
                                                            {product?.name ||
                                                                "상품명 없음"}
                                                        </p>
                                                        <p className="text-[12px] text-gray-500">
                                                            {item.quantity}개 /
                                                            KRW{" "}
                                                            {item.price?.toLocaleString()}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </section>

                                {/* 정보 섹션 */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <section>
                                        <h4 className="font-bold mb-3 text-[11px] text-gray-400 uppercase tracking-wider">
                                            기본 정보
                                        </h4>
                                        <div className="bg-gray-50 p-4 rounded space-y-3 text-[13px]">
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">
                                                    신청자
                                                </span>
                                                <span>
                                                    {detailOrder.recipientName ||
                                                        "정보없음"}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">
                                                    처리상태
                                                </span>
                                                <span className="font-bold text-red-500">
                                                    {STATUS_KO[
                                                        detailOrder.status
                                                    ] || detailOrder.status}
                                                </span>
                                            </div>
                                        </div>
                                    </section>

                                    <section>
                                        <h4 className="font-bold mb-3 text-[11px] text-gray-400 uppercase tracking-wider">
                                            환불 정보
                                        </h4>
                                        <div className="bg-gray-50 p-4 rounded space-y-3 text-[13px]">
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">
                                                    결제수단
                                                </span>
                                                <span>
                                                    {detailOrder.payment
                                                        ?.method || "정보없음"}
                                                </span>
                                            </div>
                                            <div className="flex justify-between border-t pt-2 mt-2 font-bold">
                                                <span>환불 예정 금액</span>
                                                <span className="text-black text-[15px]">
                                                    KRW{" "}
                                                    {detailOrder.totalPrice?.toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>

                        {/* 푸터 버튼 */}
                        <div className="p-6 border-t bg-gray-50">
                            <button
                                onClick={() => setDetailOrder(null)}
                                className="w-full bg-black text-white py-4 font-bold text-[14px] hover:bg-gray-800 transition-all"
                            >
                                확인
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyCancelHistory;
