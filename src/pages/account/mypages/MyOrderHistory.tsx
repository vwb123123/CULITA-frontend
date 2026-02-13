import { useEffect, useState, useCallback } from "react";
import { twMerge } from "tailwind-merge";
import type { Order, OrdersResponse } from "../../../types/order.ts";
import { cancelOrder, getOrders, returnOrder } from "../../../api/order.api.ts";
import { FiX } from "react-icons/fi";
import { useNavigate } from "react-router";

type Period = "오늘" | "1개월" | "3개월" | "6개월";

const STATUS_KO: Record<string, string> = {
    // 결제 관련
    PENDING: "입금 대기",
    PAID: "결제 완료",

    // 배송 관련
    PREPARING: "배송 준비중",
    SHIPPING: "배송 중",
    DELIVERED: "배송 완료",

    // 취소/교환/반품 관련
    CANCELED: "주문 취소",
    EXCHANGE_REQUESTED: "교환 요청",
    EXCHANGED: "교환 완료",
    RETURN_REQUESTED: "반품 요청",
    RETURNED: "반품 완료",
};

function MyOrderHistory() {
    const navigate = useNavigate();
    const [allOrders, setAllOrders] = useState<Order[]>([]);
    const [displayOrders, setDisplayOrders] = useState<Order[]>([]);

    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [selectedPeriod, setSelectedPeriod] = useState<Period>("오늘");
    const [selectedStatus, setSelectedStatus] =
        useState<string>("전체 주문처리상태");

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [isActionLoading, setIsActionLoading] = useState(false);

    const itemsPerPage = 10;

    const fetchOrderData = useCallback(async () => {
        setIsLoading(true);
        try {
            const queryParams = {
                period: selectedPeriod,
                page: 1,
                limit: 100,
            };
            const res = (await getOrders(queryParams)) as OrdersResponse;

            let orderList: Order[] = [];

            if (Array.isArray(res.data)) {
                orderList = res.data;
            } else if (res.data && Array.isArray(res.data.data)) {
                orderList = res.data.data;
            }

            setAllOrders(orderList);
        } catch (error) {
            console.error("데이터 로드 실패:", error);
            setAllOrders([]);
        } finally {
            setIsLoading(false);
        }
    }, [selectedPeriod]);

    useEffect(() => {
        let filtered = [...allOrders];
        if (selectedStatus !== "전체 주문처리상태") {
            const target = selectedStatus.toUpperCase().trim();
            filtered = filtered.filter((order) => {
                const currentStatus = order.status.toUpperCase().trim();
                if (target === "CANCELED") {
                    return [
                        "CANCELED",
                        "RETURNED",
                        "EXCHANGED",
                        "RETURN_REQUESTED",
                        "RETURN_COMPLETED",
                    ].includes(currentStatus);
                }
                return currentStatus === target;
            });
        }

        const total = Math.ceil(filtered.length / itemsPerPage);
        setTotalPages(total || 1);

        let pageToRender = currentPage;
        if (currentPage > total && total > 0) {
            setCurrentPage(1);
            pageToRender = 1;
        }

        const offset = (pageToRender - 1) * itemsPerPage;
        setDisplayOrders(filtered.slice(offset, offset + itemsPerPage));
    }, [allOrders, selectedStatus, currentPage]);

    useEffect(() => {
        fetchOrderData().then(() => {});
    }, [fetchOrderData]);

    const onPageChange = (page: number) => setCurrentPage(page);

    const formatDate = (dateString: string) => {
        return new Date(dateString)
            .toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
            })
            .replace(/\. /g, "-")
            .replace(".", "");
    };

    const handleDetailClick = (order: Order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    const handleOrderAction = async (
        action: "cancel" | "exchange" | "refund",
        orderId: number,
    ) => {
        const actionLabel =
            action === "cancel"
                ? "취소"
                : action === "exchange"
                  ? "교환"
                  : "반품";
        let reason = "";
        if (action !== "cancel") {
            reason = window.prompt(`${actionLabel} 사유를 입력해주세요.`) || "";
            if (!reason) return;
        }

        if (
            !window.confirm(`정말로 이 주문을 ${actionLabel} 신청하시겠습니까?`)
        )
            return;

        setIsActionLoading(true);
        try {
            if (action === "cancel") await cancelOrder(orderId);
            else await returnOrder(orderId, reason);

            alert(`${actionLabel} 처리가 완료되었습니다.`);
            setIsModalOpen(false);
            fetchOrderData().then(() => {});
        } catch (error) {
            console.error(error);
            alert("처리 중 오류가 발생했습니다.");
        } finally {
            setIsActionLoading(false);
        }
    };

    const handleReviewWrite = (productId: number | undefined) => {
        if (!productId) {
            alert("상품 정보를 찾을 수 없습니다.");
            return;
        }
        navigate(`/products/${productId}#review`);
    };

    return (
        <div className="max-w-[1200px] mx-auto">
            {/* 상단 필터 영역 */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-10 border-t border-gray-100 pt-10">
                <div className="relative w-[220px]">
                    <select
                        value={selectedStatus}
                        onChange={(e) => {
                            setSelectedStatus(e.target.value);
                            setCurrentPage(1);
                        }}
                        className={twMerge(
                            ["w-full", "border-gray-300", "border"],
                            ["rounded-[2px]", "px-3", "py-2", "cursor-pointer"],
                            ["text-[13px]", "outline-none", "bg-white"],
                        )}
                    >
                        <option value="전체 주문처리상태">
                            전체 주문처리상태
                        </option>
                        <option value="PAID">결제완료</option>
                        <option value="PREPARING">배송준비중</option>
                        <option value="SHIPPING">배송중</option>
                        <option value="DELIVERED">배송완료</option>
                        <option value="CANCELED">취소/교환/반품</option>
                    </select>
                </div>

                <div className="flex border border-gray-200 rounded-[2px] overflow-hidden h-[38px]">
                    {["오늘", "1개월", "3개월", "6개월"].map((period) => (
                        <button
                            key={period}
                            onClick={() => {
                                setSelectedPeriod(period as Period);
                                setCurrentPage(1);
                            }}
                            className={twMerge(
                                ["px-5", "text-[13px]", "border-r"],
                                ["border-gray-200", "last:border-r-0"],
                                ["transition-all"],
                                selectedPeriod === period
                                    ? "bg-black text-white"
                                    : "bg-white text-gray-600 hover:bg-gray-50",
                            )}
                        >
                            {period}
                        </button>
                    ))}
                </div>
            </div>

            {isLoading ? (
                <div className="py-32 text-center text-gray-400">
                    주문 내역을 불러오고 있습니다...
                </div>
            ) : displayOrders.length > 0 ? (
                <>
                    <div className="divide-y divide-gray-100 border-b border-gray-100">
                        {displayOrders.map((order) => (
                            <div
                                key={order.id}
                                className="grid grid-cols-[150px_1fr_120px_120px] items-center py-6 text-[13px] text-center px-4"
                            >
                                <div className="flex flex-col gap-1">
                                    <span>{formatDate(order.createdAt)}</span>
                                    <span className="text-gray-400 text-[11px]">
                                        [{order.id}]
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-left px-4">
                                    <img
                                        src={
                                            order.items[0]?.product.images[0]
                                                ?.url
                                        }
                                        alt=""
                                        className="w-20 h-20 object-cover border border-gray-100"
                                    />
                                    <div className="flex flex-col gap-1">
                                        <p className="font-medium">
                                            {order.items[0]?.product.name}{" "}
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
                                    <span
                                        className={twMerge(
                                            "font-bold",
                                            [
                                                "CANCELED",
                                                "RETURNED",
                                                "RETURN_COMPLETED",
                                            ].includes(order.status)
                                                ? "text-red-500"
                                                : "text-black",
                                        )}
                                    >
                                        {STATUS_KO[order.status] ||
                                            order.status}
                                    </span>
                                    <button
                                        onClick={() => handleDetailClick(order)}
                                        className="border border-gray-200 px-3 py-1 text-[11px] hover:bg-gray-50"
                                    >
                                        상세보기
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 페이지네이션 */}
                    <div className="flex justify-center items-center gap-2 mt-12">
                        <button
                            onClick={() =>
                                onPageChange(Math.max(currentPage - 1, 1))
                            }
                            disabled={currentPage === 1}
                            className="px-3 py-1 border border-gray-200 disabled:opacity-30 text-sm"
                        >
                            이전
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => onPageChange(i + 1)}
                                className={twMerge(
                                    "w-8 h-8 text-sm",
                                    currentPage === i + 1
                                        ? "bg-black text-white"
                                        : "text-gray-400",
                                )}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() =>
                                onPageChange(
                                    Math.min(currentPage + 1, totalPages),
                                )
                            }
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 border border-gray-200 disabled:opacity-30 text-sm"
                        >
                            다음
                        </button>
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center py-32 border-b border-gray-100">
                    <p className="text-[#999] text-[13px]">
                        <span className="font-bold text-black">
                            {selectedStatus !== "전체 주문처리상태"
                                ? `[${STATUS_KO[selectedStatus] || selectedStatus}] `
                                : ""}
                        </span>
                        주문 내역이 없습니다.
                    </p>
                </div>
            )}

            {/* 모달 */}
            {isModalOpen && selectedOrder && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white w-full max-w-2xl rounded-lg shadow-xl overflow-hidden">
                        <div className="flex justify-between items-center p-6 border-b">
                            <h3 className="text-lg font-bold">
                                주문 상세 정보
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full"
                            >
                                <FiX size={20} />
                            </button>
                        </div>
                        <div className="p-6 max-h-[70vh] overflow-y-auto">
                            <div className="mb-4 text-sm text-gray-500 flex justify-between">
                                <span>주문번호: {selectedOrder.id}</span>
                                <span>
                                    주문일자:{" "}
                                    {formatDate(selectedOrder.createdAt)}
                                </span>
                            </div>
                            <div className="space-y-4">
                                {selectedOrder.items.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex gap-4 items-center border-b border-gray-50 pb-4 last:border-0"
                                    >
                                        <img
                                            src={item.product.images[0]?.url}
                                            className="w-20 h-20 object-cover rounded border"
                                            alt=""
                                        />
                                        <div className="flex-1">
                                            <p className="font-medium">
                                                {item.product.name}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                수량: {item.quantity}개
                                            </p>
                                            <p className="text-sm font-bold mt-1">
                                                KRW{" "}
                                                {item.price.toLocaleString()}
                                            </p>
                                        </div>

                                        {/* 배송 완료 상태일 때 리뷰 작성 버튼 노출 */}
                                        {selectedOrder.status ===
                                            "DELIVERED" && (
                                            <button
                                                onClick={() =>
                                                    handleReviewWrite(
                                                        item.productId,
                                                    )
                                                }
                                                className={twMerge(
                                                    ["flex", "shrink-0"],
                                                    ["px-4", "py-2"],
                                                    ["border", "border-black"],
                                                    [
                                                        "text-[11px]",
                                                        "font-bold",
                                                    ],
                                                    [
                                                        "hover:bg-black",
                                                        "hover:text-white",
                                                    ],
                                                    ["transition-colors"],
                                                )}
                                            >
                                                리뷰 작성하기
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 bg-gray-50 p-4 rounded space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">
                                        주문 처리 상태
                                    </span>
                                    <span className="font-bold text-[#ff4600]">
                                        {STATUS_KO[selectedOrder.status] ||
                                            selectedOrder.status}
                                    </span>
                                </div>
                                <div className="flex justify-between border-t pt-2 mt-2 font-bold text-lg">
                                    <span>총 결제 금액</span>
                                    <span>
                                        KRW{" "}
                                        {selectedOrder.totalPrice.toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            {/* 버튼 영역 */}
                            <div className="mt-8">
                                {isActionLoading ? (
                                    <div className="text-center py-4 text-gray-400 animate-pulse text-sm">
                                        요청을 처리하는 중입니다...
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-2">
                                        {[
                                            "PENDING",
                                            "PAID",
                                            "PREPARING",
                                        ].includes(selectedOrder.status) && (
                                            <button
                                                onClick={() =>
                                                    handleOrderAction(
                                                        "cancel",
                                                        selectedOrder.id,
                                                    )
                                                }
                                                className="col-span-2 py-4 bg-white border border-red-500 text-red-500 font-bold hover:bg-red-50"
                                            >
                                                주문 취소 신청
                                            </button>
                                        )}
                                        {selectedOrder.status ===
                                            "DELIVERED" && (
                                            <>
                                                <button
                                                    onClick={() =>
                                                        handleOrderAction(
                                                            "exchange",
                                                            selectedOrder.id,
                                                        )
                                                    }
                                                    className="py-4 bg-gray-100 font-medium hover:bg-gray-200"
                                                >
                                                    교환 신청
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleOrderAction(
                                                            "refund",
                                                            selectedOrder.id,
                                                        )
                                                    }
                                                    className="py-4 bg-gray-100 font-medium hover:bg-gray-200"
                                                >
                                                    반품 신청
                                                </button>
                                                <button
                                                    className="col-span-2 py-4 bg-black text-white font-bold hover:bg-gray-800"
                                                    onClick={() => {
                                                        alert(
                                                            "구매 확정되었습니다.",
                                                        );
                                                        setIsModalOpen(false);
                                                    }}
                                                >
                                                    구매 확정
                                                </button>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="p-6 border-t text-right">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-black text-white px-8 py-2 text-sm rounded transition-colors hover:bg-gray-800"
                            >
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MyOrderHistory;
