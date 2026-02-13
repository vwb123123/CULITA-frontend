import { useEffect, useState } from "react";
import useOrderStore from "../../../store/useOrderStore";
import { useNavigate, useSearchParams } from "react-router";
import { CiCircleCheck } from "react-icons/ci";
import { confirmOrder } from "../../../api/order.api.ts";
import Spinner from "../../common/Spinner.tsx";
import { AxiosError } from "axios";

function OrderSuccessPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { clearOrder } = useOrderStore();
    const [isConfirming, setIsConfirming] = useState(true);

    const orderId = searchParams.get("orderId");
    const amount = searchParams.get("amount");
    const paymentKey = searchParams.get("paymentKey");
    const deliveryMsg = searchParams.get("msg");

    useEffect(() => {
        const fetchOrder = async () => {
            const rawOrderId = searchParams.get("orderId");
            console.log("URL에서 읽어온 orderId:", rawOrderId);

            if (!paymentKey || !rawOrderId || !amount) {
                alert("결제 정보가 누락되었습니다.");
                navigate("/");
                return;
            }

            try {
                await confirmOrder({
                    orderId: rawOrderId,
                    paymentKey: paymentKey,
                    amount: Number(amount),
                });

                clearOrder();
                setIsConfirming(false);
            } catch (error: unknown) {
                if (error instanceof AxiosError) {
                    const serverMessage =
                        error.response?.data?.message ||
                        "결제 승인 중 오류가 발생했습니다.";
                    console.error("서버 에러 디테일:", error.response?.data);
                    navigate(
                        `/orders/fail?message=${encodeURIComponent(serverMessage)}`,
                    );
                } else if (error instanceof Error) {
                    console.error("일반 에러:", error.message);
                    navigate(
                        `/orders/fail?message=${encodeURIComponent(error.message)}`,
                    );
                } else {
                    navigate(
                        `/orders/fail?message=알 수 없는 오류가 발생했습니다.`,
                    );
                }
            }
        };
        fetchOrder().then(() => {});
    }, [amount, clearOrder, navigate, paymentKey, searchParams]);

    const formatPrice = (price: string | null) => {
        if (!price) return "0";
        return Number(price).toLocaleString();
    };

    if (isConfirming) {
        return (
            <div className={"flex flex-col justify-center items-center"}>
                <Spinner full />;
                <p>결제를 확정하고 있습니다. 잠시만 기다려주세요...</p>
            </div>
        );
    }

    return (
        <div className="pt-[200px] pb-40 px-10 bg-white min-h-screen">
            <div className="max-w-[600px] mx-auto text-center">
                {/* 성공 아이콘 */}
                <div className="flex justify-center mb-8">
                    <CiCircleCheck className="w-20 h-20 text-[#ff4400]" />
                </div>

                <h1 className="text-4xl font-bold mb-4 uppercase tracking-tighter">
                    Order Complete!
                </h1>
                <p className="text-gray-500 mb-12">
                    주문이 성공적으로 완료되었습니다. 곧 배송을 시작할게요!
                </p>

                {/* 주문 정보 카드 */}
                <div className="border border-black p-8 text-left space-y-4 mb-12">
                    <div className="flex justify-between border-b pb-4 border-gray-100">
                        <span className="text-gray-400">주문 번호</span>
                        <span className="font-medium">{orderId}</span>
                    </div>
                    <div className="flex justify-between border-b pb-4 border-gray-100">
                        <span className="text-gray-400">결제 금액</span>
                        <span className="font-bold text-xl">
                            KRW {formatPrice(amount)}
                        </span>
                    </div>
                    {deliveryMsg && (
                        <div className="flex justify-between  pb-4">
                            <span className="text-gray-400">배송 메시지</span>
                            <span className="text-gray-600 italic">
                                {deliveryMsg}
                            </span>
                        </div>
                    )}
                </div>

                {/* 버튼 영역 */}
                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => navigate("/mypage/orders")}
                        className="w-full py-5 bg-black text-white font-bold hover:bg-gray-800 transition-all"
                    >
                        주문 내역 확인하기
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className="w-full py-5 border border-black font-bold hover:bg-gray-50 transition-all"
                    >
                        쇼핑 계속하기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OrderSuccessPage;
