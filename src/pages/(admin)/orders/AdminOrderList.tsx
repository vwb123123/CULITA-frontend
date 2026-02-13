import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { getAdminOrders } from "../../../api/admin.order.api";
import type {
    AdminOrder,
    AdminOrderListResponse,
    AdminOrderQueryParams,
    OrderStatus,
} from "../../../types/admin.order";
import {
    FiChevronLeft,
    FiChevronRight,
    FiRefreshCw,
    FiSearch,
    FiEye,
} from "react-icons/fi";
import { twMerge } from "tailwind-merge";

const STATUS_STYLES: Record<OrderStatus, string> = {
    // 결제 및 준비 단계
    PENDING: "bg-gray-100 text-gray-600",
    PAID: "bg-blue-50 text-blue-600",
    PREPARING: "bg-indigo-50 text-indigo-600",

    // 배송 단계
    SHIPPING: "bg-orange-50 text-[#ff4600]",
    DELIVERED: "bg-green-50 text-green-600",

    // 취소
    CANCELED: "bg-red-50 text-red-600",

    // 교환 단계
    EXCHANGE_REQUESTED: "bg-cyan-50 text-cyan-600",
    EXCHANGED: "bg-cyan-100 text-cyan-800",

    // 반품 단계
    RETURN_REQUESTED: "bg-purple-50 text-purple-600",
    RETURNED: "bg-purple-100 text-purple-800",
};

function AdminOrderList() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [orders, setOrders] = useState<AdminOrder[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        total: 0,
        totalPages: 0,
        currentPage: 1,
    });

    const page = Number(searchParams.get("page")) || 1;
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";

    useEffect(() => {
        const loadOrders = async () => {
            setLoading(true);
            try {
                const queryParams: AdminOrderQueryParams = {
                    page: page || 1,
                    limit: 10,
                    search: search || undefined,
                    status: (status as OrderStatus) || undefined,
                };

                const res = (await getAdminOrders(
                    queryParams,
                )) as AdminOrderListResponse;

                const { orders, pagination } = res.data;

                if (orders) {
                    setOrders(orders);
                    setPagination(
                        pagination || {
                            total: 0,
                            totalPages: 0,
                            currentPage: page,
                        },
                    );
                }
            } catch (error) {
                console.error("주문 로드 실패:", error);
            } finally {
                setLoading(false);
                window.scrollTo(0, 0);
            }
        };
        loadOrders().then(() => {});
    }, [page, search, status]);

    const handlePageChange = (newPage: number) => {
        if (isNaN(newPage) || newPage < 1) return;
        const params = new URLSearchParams(searchParams);
        params.set("page", String(newPage));
        setSearchParams(params);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        주문 관리
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        총 {pagination?.total || 0}건의 주문 건
                    </p>
                </div>

                <div className="flex gap-3">
                    <select
                        value={status || ""}
                        onChange={(e) =>
                            setSearchParams({
                                status: e.target.value,
                                page: "1",
                            })
                        }
                        className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#ff4600]"
                    >
                        <option value="">모든 상태</option>

                        {/* 결제 단계 */}
                        <option value="PENDING">입금 대기</option>
                        <option value="PAID">결제 완료</option>

                        {/* 배송 단계 */}
                        <option value="PREPARING">배송 준비중</option>
                        <option value="SHIPPING">배송중(출고완료)</option>
                        <option value="DELIVERED">배송 완료</option>

                        {/* 취소/교환/반품 단계 */}
                        <option value="CANCELED">주문 취소</option>
                        <option value="EXCHANGE_REQUESTED">교환 요청</option>
                        <option value="EXCHANGED">교환 완료</option>
                        <option value="RETURN_REQUESTED">반품 요청</option>
                        <option value="RETURNED">반품 완료</option>
                    </select>
                    <div className="relative">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="주문자, 번호 검색"
                            defaultValue={search}
                            onKeyDown={(e) =>
                                e.key === "Enter" &&
                                setSearchParams({
                                    search: e.currentTarget.value,
                                    page: "1",
                                })
                            }
                            className={twMerge(
                                ["w-64", "rounded-xl"],
                                ["pl-11", "pr-4", "py-2.5"],
                                ["border", "border-gray-200"],
                                ["text-sm", "outline-none"],
                                ["focus:border-[#ff4600]"],
                            )}
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-xs text-gray-500 uppercase font-semibold">
                            <th className="py-4 px-6">주문 번호 / 일시</th>
                            <th className="py-4 px-6">주문자</th>
                            <th className="py-4 px-6">결제 금액</th>
                            <th className="py-4 px-6">상태</th>
                            <th className="py-4 px-6 text-right">상세</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-[13px]">
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="py-20 text-center">
                                    <FiRefreshCw className="animate-spin mx-auto text-2xl text-gray-300" />
                                </td>
                            </tr>
                        ) : orders && orders.length > 0 ? (
                            orders.map((order) => {
                                const displayPrice = Number(
                                    order.totalAmount || order.totalPrice || 0,
                                );

                                return (
                                    <tr
                                        key={order.id}
                                        className="hover:bg-orange-50/30 transition-colors"
                                    >
                                        {/* 주문 번호 / 일시 영역 */}
                                        <td className="py-4 px-6">
                                            <div className="font-medium text-gray-900">
                                                {order.orderNumber ||
                                                    order.id ||
                                                    "번호 없음"}
                                            </div>
                                            <div className="text-[11px] text-gray-400 mt-1">
                                                {order.createdAt
                                                    ? new Date(
                                                          order.createdAt,
                                                      ).toLocaleString()
                                                    : "-"}
                                            </div>
                                        </td>

                                        {/* 주문자 */}
                                        <td className="py-4 px-6">
                                            <div className="font-medium text-gray-800">
                                                {order.user?.name ||
                                                    "이름 없음"}
                                            </div>
                                            <div className="text-[11px] text-gray-400">
                                                {order.user?.email || "-"}
                                            </div>
                                        </td>

                                        {/* 결제 금액 */}
                                        <td className="py-4 px-6 font-bold text-gray-900">
                                            {displayPrice.toLocaleString()}원
                                        </td>

                                        {/* 상태 */}
                                        <td className="py-4 px-6">
                                            <span
                                                className={twMerge(
                                                    "px-2.5 py-1 rounded-full text-[11px] font-bold uppercase",
                                                    STATUS_STYLES[
                                                        order.status as OrderStatus
                                                    ] ||
                                                        "bg-gray-100 text-gray-600",
                                                )}
                                            >
                                                {order.status}
                                            </span>
                                        </td>

                                        {/* 상세 보기 */}
                                        <td className="py-4 px-6 text-right">
                                            <Link
                                                to={`/admin/orders/${order.id}`}
                                                className="p-2 text-gray-400 hover:text-[#ff4600] inline-block transition-colors"
                                            >
                                                <FiEye size={18} />
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="py-20 text-center text-gray-400"
                                >
                                    주문 내역이 없습니다.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {pagination.totalPages > 0 && (
                    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/50">
                        <div className="text-xs text-gray-500">
                            Page {pagination.currentPage} of{" "}
                            {pagination.totalPages}
                        </div>
                        <div className="flex gap-2">
                            {/* 이전 페이지 버튼 */}
                            <button
                                type="button"
                                disabled={page <= 1}
                                onClick={() => handlePageChange(page - 1)}
                                className={twMerge(
                                    ["p-2", "rounded-lg", "bg-white"],
                                    ["border", "border-gray-200"],
                                    ["hover:text-[#ff4600]"],
                                    ["disabled:opacity-50"],
                                )}
                            >
                                <FiChevronLeft />
                            </button>

                            {/* 다음 페이지 버튼 */}
                            <button
                                type="button"
                                disabled={page >= pagination.totalPages}
                                onClick={() => handlePageChange(page + 1)}
                                className={twMerge(
                                    ["p-2", "rounded-lg", "bg-white"],
                                    ["border", "border-gray-200"],
                                    ["hover:text-[#ff4600]"],
                                    ["disabled:opacity-50"],
                                )}
                            >
                                <FiChevronRight />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminOrderList;
