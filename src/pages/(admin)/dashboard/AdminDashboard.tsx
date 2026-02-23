import { type ReactNode, useEffect, useState } from "react";
import { getAdminOrders } from "../../../api/admin.order.api";
import { getAdminInquiries } from "../../../api/admin.inquiries.api";
import { fetchUsers } from "../../../api/admin.user.api";
import type { AdminOrder, OrderStatus } from "../../../types/admin.order";
import {
    FiCreditCard,
    FiAlertCircle,
    FiUserPlus,
    FiMessageSquare,
    FiRefreshCw,
} from "react-icons/fi";
import { twMerge } from "tailwind-merge";

const STATUS_STYLES: Record<OrderStatus, string> = {
    PENDING: "bg-gray-100 text-gray-600",
    PAID: "bg-blue-50 text-blue-600",
    PREPARING: "bg-indigo-50 text-indigo-600",

    SHIPPING: "bg-orange-50 text-[#ff4600]",
    DELIVERED: "bg-green-50 text-green-600",

    CANCELED: "bg-red-50 text-red-600",

    EXCHANGE_REQUESTED: "bg-cyan-50 text-cyan-600",
    EXCHANGED: "bg-cyan-100 text-cyan-800",

    RETURN_REQUESTED: "bg-purple-50 text-purple-600",
    RETURNED: "bg-purple-100 text-purple-800",
};

function AdminDashboard() {
    const [loading, setLoading] = useState(false);
    const [recentOrders, setRecentOrders] = useState<AdminOrder[]>([]);

    const [summary, setSummary] = useState({
        pendingOrders: 0,
        preparingOrders: 0,
        cancelRequests: 0,
        pendingInquiries: 0,
        totalUsers: 0,
    });

    const loadDashboard = async () => {
        setLoading(true);

        const delay = new Promise((resolve) => setTimeout(resolve, 500));
        try {
            const [ordersRes, inquiriesRes, usersRes] = await Promise.all([
                getAdminOrders({ limit: 5 }),
                getAdminInquiries({ status: "PENDING", limit: 1 }),
                fetchUsers({ limit: 1 }),
                delay,
            ]);

            const orders = ordersRes.data?.orders || [];
            const totalOrders = ordersRes.data?.pagination?.total || 0;
            const totalInquiries = inquiriesRes.pagination?.total || 0;
            const totalUsers = usersRes.pagination?.totalUsers || 0;

            setRecentOrders(orders);
            setSummary((prev) => ({
                ...prev,
                pendingOrders: totalOrders,
                pendingInquiries: totalInquiries,
                totalUsers: totalUsers,
            }));
        } catch (error) {
            console.error("대시보드 로드 실패:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDashboard().then(() => {});
    }, []);

    return (
        <div className="space-y-8 p-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">대시보드</h2>
                <button
                    onClick={loadDashboard}
                    disabled={loading}
                    className={twMerge(
                        ["p-2.5", "border", "rounded-xl"],
                        ["transition-all", "duration-200"],
                        ["bg-white", "border-gray-200", "text-gray-500"],
                        ["hover:bg-gray-50", "active:scale-95"],
                        loading
                            ? "opacity-70 cursor-not-allowed"
                            : "cursor-pointer",
                    )}
                >
                    <FiRefreshCw
                        size={18}
                        className={twMerge(
                            "transition-transform",
                            loading ? "animate-spin text-[#ff4600]" : "",
                        )}
                    />
                </button>
            </div>

            {/* 상단 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatusCard
                    label="누적 주문"
                    value={summary.pendingOrders}
                    icon={<FiCreditCard />}
                    color="text-blue-600 bg-blue-50"
                />
                <StatusCard
                    label="미답변 문의"
                    value={summary.pendingInquiries}
                    icon={<FiMessageSquare />}
                    color="text-[#ff4600] bg-orange-50"
                />
                <StatusCard
                    label="총 가입자"
                    value={summary.totalUsers}
                    icon={<FiUserPlus />}
                    color="text-emerald-600 bg-emerald-50"
                />
                <StatusCard
                    label="취소 요청"
                    value={summary.cancelRequests}
                    icon={<FiAlertCircle />}
                    color="text-red-600 bg-red-50"
                />
            </div>

            <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-5 border-b border-gray-50 font-bold flex items-center">
                    최근 주문
                    <span
                        className={twMerge([
                            "text-gray-400",
                            "text-xs",
                            "px-2",
                        ])}
                    >
                        (신규 주문 5건)
                    </span>
                </div>
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-500">
                        <tr>
                            <th className="py-3 px-5 text-left">주문번호</th>
                            <th className="py-3 pl-7 text-left">금액</th>
                            <th className="py-3 pr-8 text-right">상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentOrders.length > 0 ? (
                            recentOrders.map((order) => (
                                <tr
                                    key={order.id}
                                    className="border-t border-gray-50"
                                >
                                    <td className="py-4 pl-8 font-medium text-gray-900">
                                        {order.orderNumber || ` ${order.id}`}
                                    </td>
                                    <td className="py-4 px-3 font-bold">
                                        ₩
                                        {(
                                            order.totalAmount ??
                                            order.totalPrice ??
                                            0
                                        ).toLocaleString()}
                                    </td>
                                    <td className="py-4 px-5 text-right">
                                        <span
                                            className={twMerge(
                                                [
                                                    "text-[10px]",
                                                    "font-semibold",
                                                ],
                                                ["px-2", "py-1"],
                                                ["rounded", "bg-gray-100"],
                                                STATUS_STYLES[order.status],
                                            )}
                                        >
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={3}
                                    className="py-10 text-center text-gray-400"
                                >
                                    최근 주문 내역이 없습니다.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

interface StatusCardProps {
    label: string;
    value: number | undefined | null;
    icon: ReactNode;
    color: string;
}

function StatusCard({ label, value, icon, color }: StatusCardProps) {
    const safeValue = typeof value === "number" ? value : 0;

    return (
        <div className="bg-white p-5 rounded-[20px] border border-gray-100 flex justify-between items-center shadow-sm">
            <div>
                <p className="text-xs text-gray-500 mb-1">{label}</p>
                <p className="text-2xl font-bold">
                    {safeValue.toLocaleString()}
                </p>
            </div>
            <div className={twMerge("p-3 rounded-2xl", color)}>{icon}</div>
        </div>
    );
}

export default AdminDashboard;
