import { useNavigate, useSearchParams } from "react-router";
import { CiCircleAlert } from "react-icons/ci";

function OrderFailPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const errorCode = searchParams.get("code");
    const errorMessage =
        searchParams.get("message") ||
        "결제 중 알 수 없는 오류가 발생했습니다.";

    return (
        <div className="pt-[200px] pb-40 px-10 bg-white min-h-screen">
            <div className="max-w-[600px] mx-auto text-center">
                <div className="flex justify-center mb-8">
                    <CiCircleAlert className="w-20 h-20 text-[#ff4400]" />
                </div>

                <h1 className="text-4xl font-bold mb-4 uppercase tracking-tighter">
                    Order Failed
                </h1>
                <p className="text-gray-500 mb-12">
                    결제 처리 중 문제가 발생하여 주문이 완료되지 않았습니다.
                </p>

                {/* 에러 정보 카드 */}
                <div className="border border-black p-8 text-left space-y-4 mb-12 bg-gray-50">
                    <div className="flex justify-between border-b pb-4 border-gray-200">
                        <span className="text-gray-400 font-medium">
                            에러 코드
                        </span>
                        <span className="font-mono text-sm">
                            {errorCode || "UNKNOWN_ERROR"}
                        </span>
                    </div>
                    <div className="py-2">
                        <p className="text-gray-400 mb-2 font-medium">
                            실패 사유
                        </p>
                        <p className="text-black font-medium leading-relaxed">
                            {errorMessage}
                        </p>
                    </div>
                </div>

                {/* 버튼 영역 */}
                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => navigate("/orders/checkout")}
                        className="w-full py-5 bg-black text-white font-bold hover:bg-gray-800 transition-all"
                    >
                        다시 결제하기
                    </button>
                    <button
                        onClick={() => navigate("/cart")}
                        className="w-full py-5 border border-black font-bold hover:bg-gray-50 transition-all"
                    >
                        장바구니로 돌아가기
                    </button>
                </div>

                <p className="mt-8 text-xs text-gray-400">
                    문제가 지속될 경우 고객센터로 문의해 주시기 바랍니다.
                </p>
            </div>
        </div>
    );
}

export default OrderFailPage;
