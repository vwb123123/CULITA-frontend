import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
    getAdminOrderById,
    updateOrderStatus,
} from "../../../api/admin.order.api";
import type { AdminOrder, OrderStatus } from "../../../types/admin.order";
import {
    FiArrowLeft,
    FiPackage,
    FiTruck,
    FiSave,
    FiRefreshCw,
} from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import Spinner from "../../../components/common/Spinner.tsx";

function AdminOrderDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState<AdminOrder | null>(null);
    const [loading, setLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);

    const [newStatus, setNewStatus] = useState<OrderStatus>("PENDING");
    const [carrier, setCarrier] = useState("");
    const [trackingNumber, setTrackingNumber] = useState("");

    useEffect(() => {
        if (!id) return;
        getAdminOrderById(Number(id)).then((res) => {
            setOrder(res.data);
            setNewStatus(res.data.status);
            setCarrier(res.data.carrier || "");
            setTrackingNumber(res.data.trackingNumber || "");
            setLoading(false);
        });
    }, [id]);

    const handleUpdateStatus = async () => {
        if (!id || !order) return;
        if (newStatus === "SHIPPING" && (!carrier || !trackingNumber)) {
            return alert(
                "배송 중으로 변경 시 택배사와 운송장 번호가 필요합니다.",
            );
        }

        if (!confirm("주문 상태를 변경하시겠습니까?")) return;

        setIsUpdating(true);
        try {
            await updateOrderStatus(Number(id), {
                status: newStatus,
                carrier,
                trackingNumber,
            });
            alert("상태가 성공적으로 변경되었습니다.");
            window.location.reload();
        } catch (error) {
            console.log(error);
            alert("변경 실패");
        } finally {
            setIsUpdating(false);
        }
    };

    if (loading) {
        return (
            <div>
                <Spinner full />
                <p className="p-10 text-center">주문 정보를 불러오는 중...</p>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="p-10 text-center">
                주문 정보를 찾을 수 없습니다.
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-6 pb-20">
            <div className="flex items-center gap-4 mb-4">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
                >
                    <FiArrowLeft size={24} />
                </button>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        주문 상세 조회
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Order No:{" "}
                        <span className="font-mono text-[#ff4600]">
                            #{order?.orderNumber || order?.id || "---"}
                        </span>
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 왼쪽 부분 */}
                <div className="lg:col-span-2 space-y-6">
                    <section className="bg-white p-8 rounded-[20px] border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-800 border-b pb-4 mb-6 flex items-center gap-2">
                            <FiPackage className="text-orange-500" /> 주문 상품
                            ({order?.items?.length || 0})
                        </h3>
                        <div className="divide-y divide-gray-100">
                            {(order?.items || []).map((item) => (
                                <div
                                    key={item.id}
                                    className="py-4 flex items-center gap-4"
                                >
                                    <div
                                        className={twMerge(
                                            ["w-16", "h-16", "rounded-lg"],
                                            ["bg-gray-50", "shrink-0"],
                                            ["overflow-hidden", "flex"],
                                            ["border", "border-gray-100"],
                                            ["items-center", "justify-center"],
                                        )}
                                    >
                                        {item.product?.thumbnail ? (
                                            <img
                                                src={item.product.thumbnail}
                                                className="w-full h-full object-cover"
                                                alt={item.product?.name}
                                            />
                                        ) : item.product?.images &&
                                          item.product.images.length > 0 ? (
                                            <img
                                                src={item.product.images[0].url}
                                                className="w-full h-full object-cover"
                                                alt={item.product?.name}
                                            />
                                        ) : (
                                            <span className="text-[10px] text-gray-400">
                                                NO IMG
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-medium text-gray-900">
                                            {item.product?.name ||
                                                "상품 정보 없음"}
                                        </div>
                                        <div className="text-sm text-gray-400">
                                            수량: {item.quantity || 0}개 /{" "}
                                            {(item.price || 0).toLocaleString()}
                                            원
                                        </div>
                                    </div>
                                    <div className="font-bold">
                                        {(
                                            (item.price || 0) *
                                            (item.quantity || 0)
                                        ).toLocaleString()}
                                        원
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 pt-6 border-t border-gray-100 flex justify-between items-center">
                            <span className="text-gray-500">총 결제 금액</span>
                            <span className="text-2xl font-black text-[#ff4600]">
                                <span>
                                    {(order?.totalPrice || 0).toLocaleString()}
                                    원
                                </span>
                            </span>
                        </div>
                    </section>
                </div>

                {/* 오른쪽 부분 */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-[20px] border border-gray-100 shadow-sm sticky top-6">
                        <h3 className="text-lg font-bold text-gray-800 border-b pb-3 mb-6">
                            주문 상태 관리
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase">
                                    현재 상태
                                </label>
                                <select
                                    value={newStatus}
                                    onChange={(e) =>
                                        setNewStatus(
                                            e.target.value as OrderStatus,
                                        )
                                    }
                                    className={twMerge(
                                        ["w-full", "px-4", "py-3"],
                                        ["rounded-xl"],
                                        ["border", "border-gray-200"],
                                        ["outline-none", "bg-gray-50"],
                                        ["focus:border-[#ff4600]"],
                                    )}
                                >
                                    {/* 결제 단계 */}
                                    <option value="PENDING">입금 대기</option>
                                    <option value="PAID">결제 완료</option>

                                    {/* 배송 단계 */}
                                    <option value="PREPARING">
                                        배송 준비중
                                    </option>
                                    <option value="SHIPPING">
                                        배송중 (출고완료)
                                    </option>
                                    <option value="DELIVERED">배송 완료</option>

                                    {/* 취소/교환/반품 단계 */}
                                    <option value="CANCELED">주문 취소</option>
                                    <option value="EXCHANGE_REQUESTED">
                                        교환 요청
                                    </option>
                                    <option value="EXCHANGED">교환 완료</option>
                                    <option value="RETURN_REQUESTED">
                                        반품 요청
                                    </option>
                                    <option value="RETURNED">반품 완료</option>
                                </select>
                            </div>

                            {(newStatus === "SHIPPING" ||
                                order.status === "SHIPPING" ||
                                order.status === "DELIVERED") && (
                                <div className="p-4 bg-orange-50 rounded-xl space-y-3 animate-in fade-in duration-300">
                                    <h4 className="text-[11px] font-bold text-[#ff4600] flex items-center gap-1">
                                        <FiTruck /> 배송 정보 입력
                                    </h4>
                                    <input
                                        placeholder="택배사 (예: CJ대한통운)"
                                        value={carrier}
                                        onChange={(e) =>
                                            setCarrier(e.target.value)
                                        }
                                        className={twMerge(
                                            ["w-full", "px-3", "py-2"],
                                            ["text-sm", "rounded-lg"],
                                            ["border", "border-orange-100"],
                                            ["outline-none", "bg-white"],
                                            ["focus:border-[#ff4600]"],
                                        )}
                                    />
                                    <input
                                        placeholder="운송장 번호"
                                        value={trackingNumber}
                                        onChange={(e) =>
                                            setTrackingNumber(e.target.value)
                                        }
                                        className={twMerge(
                                            ["w-full", "px-3", "py-2"],
                                            ["text-sm", "rounded-lg"],
                                            ["border", "border-orange-100"],
                                            ["outline-none", "bg-white"],
                                            ["focus:border-[#ff4600]"],
                                        )}
                                    />
                                </div>
                            )}

                            <button
                                onClick={handleUpdateStatus}
                                disabled={isUpdating}
                                className={twMerge(
                                    ["w-full", "py-4", "bg-black"],
                                    ["text-white", "gap-2"],
                                    ["rounded-[100px]", "font-bold"],
                                    ["flex", "items-center", "justify-center"],
                                    ["hover:bg-[#ff4600]", "transition-all"],
                                )}
                            >
                                {isUpdating ? (
                                    <FiRefreshCw className="animate-spin" />
                                ) : (
                                    <FiSave />
                                )}
                                <span>변경 사항 저장</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminOrderDetail;
