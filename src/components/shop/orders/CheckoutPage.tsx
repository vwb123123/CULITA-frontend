import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import DaumPostcodeEmbed from "react-daum-postcode";
import type { Address } from "react-daum-postcode";
import { useNavigate } from "react-router";
import useAuthStore from "../../../store/useAuthStore.ts";
import useOrderStore from "../../../store/useOrderStore.ts";
import Spinner from "../../common/Spinner.tsx";
import { twMerge } from "tailwind-merge";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import { checkoutOrder } from "../../../api/order.api.ts";

interface OrderForm {
    recipientName: string;
    zipCode: string;
    address1: string;
    address2: string;
    phone1: string;
    phone2: string;
    phone3: string;
    emailId: string;
    emailDomain: string;
    deliveryRequest: string;
}

type MyPaymentMethod =
    | "CARD"
    | "VIRTUAL_ACCOUNT"
    | "TRANSFER"
    | "TOSSPAY"
    | "KAKAOPAY";
type TossPaymentMethod = "카드" | "가상계좌" | "계좌이체" | "토스페이";

const PAYMENT_METHODS = [
    { id: "CARD", label: "신용카드" },
    { id: "KAKAOPAY", label: "카카오페이" },
    { id: "TOSSPAY", label: "토스페이" },
    { id: "TRANSFER", label: "계좌이체" },
    { id: "VIRTUAL_ACCOUNT", label: "가상계좌" },
] as const;

const TEST_CLIENT_KEY = "test_ck_pP2YxJ4K87qQeBO1MzLmVRGZwXLO";

function CheckoutPage() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedPayment, setSelectedPayment] =
        useState<MyPaymentMethod>("CARD");
    const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);

    const { user, isLoggedIn } = useAuthStore();
    const { orderItems, getCartTotalPrice, getShippingFee, getFinalAmount } =
        useOrderStore();

    useEffect(() => {
        if (!isLoggedIn) {
            const confirmLogin = window.confirm(
                "로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까?",
            );
            if (confirmLogin) navigate("/login");
            else navigate(-1);
            return;
        }
        if (!orderItems || orderItems.length === 0) {
            alert("주문할 상품이 없습니다.");
            navigate("/cart");
        }
    }, [isLoggedIn, orderItems, navigate]);

    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm<OrderForm>({
        defaultValues: {
            recipientName: user?.name || "",
            phone1: "010",
            emailId: user?.email ? user.email.split("@")[0] : "",
            emailDomain: user?.email ? user.email.split("@")[1] : "gmail.com",
            deliveryRequest: "",
        },
    });

    const selectedMsg = useWatch({
        control,
        name: "deliveryRequest",
    });

    const handleCompletePostcode = (data: Address) => {
        setValue("zipCode", data.zonecode);
        setValue("address1", data.address);
        setIsPostcodeOpen(false);
    };

    const getTossMethod = (method: MyPaymentMethod): TossPaymentMethod => {
        switch (method) {
            case "TRANSFER":
                return "계좌이체";
            case "VIRTUAL_ACCOUNT":
                return "가상계좌";
            case "TOSSPAY":
                return "토스페이";
            default:
                return "카드";
        }
    };

    const onSubmit = async (data: OrderForm) => {
        setIsSubmitting(true);
        try {
            const orderRequest = {
                items: orderItems.map((item) => ({
                    productId: item.product.id,
                    quantity: item.quantity,
                })),
                recipientName: data.recipientName,
                recipientPhone: `${data.phone1}${data.phone2}${data.phone3}`,
                zipCode: data.zipCode,
                address1: data.address1,
                address2: data.address2,
                deliveryRequest:
                    selectedMsg === "custom"
                        ? (
                              document.getElementById(
                                  "customMsg",
                              ) as HTMLInputElement
                          )?.value
                        : selectedMsg,
            };

            const result = await checkoutOrder(orderRequest);
            const actualId = result.data.id;

            const tossPayments = await loadTossPayments(TEST_CLIENT_KEY);
            const methodForToss = getTossMethod(selectedPayment);

            await tossPayments.requestPayment(methodForToss, {
                amount: Number(getFinalAmount()),
                orderId: `order_${actualId}_${new Date().getTime()}`,
                orderName:
                    orderItems.length > 1
                        ? `${orderItems[0].product.name} 외...`
                        : orderItems[0].product.name,
                customerName: data.recipientName,
                successUrl: `${window.location.origin}/orders/success?msg=${encodeURIComponent(orderRequest.deliveryRequest || "")}`,
                failUrl: `${window.location.origin}/orders/fail`,
            });
        } catch (e: unknown) {
            if (e instanceof Error) alert(e.message);
            setIsSubmitting(false);
        }
    };

    const formatPrice = (price: number) => `KRW ${price.toLocaleString()}`;

    return (
        <div className="pt-[170px] px-10 pb-50 bg-white relative">
            {isSubmitting && <Spinner full />}

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-[1200px] mx-auto"
            >
                <h1 className="text-4xl font-medium text-center mb-16 uppercase">
                    Order & Payment
                </h1>

                <div className="flex flex-col lg:flex-row gap-20">
                    {/* 왼쪽 영역 */}
                    <div className="flex-1">
                        <h2 className="text-xl font-bold border-b border-black pb-4 mb-8">
                            배송지 정보
                        </h2>

                        <div className="space-y-6 text-[13px]">
                            <div className="grid grid-cols-[120px_1fr] items-center">
                                <label className="font-medium">
                                    받는사람 *
                                </label>
                                <div className="flex flex-col gap-1">
                                    <input
                                        {...register("recipientName", {
                                            required: true,
                                        })}
                                        className={`border p-2 w-full max-w-[300px] outline-none ${errors.recipientName ? "border-red-500" : "border-[#ddd] focus:border-black"}`}
                                    />
                                    {errors.recipientName && (
                                        <span className="text-red-500 text-[11px]">
                                            필수 입력 항목입니다.
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* 주소 */}
                            <div className="grid grid-cols-[120px_1fr] items-start">
                                <label className="font-medium mt-2">
                                    주소 *
                                </label>
                                <div className="space-y-2">
                                    <div className="flex gap-2">
                                        <input
                                            {...register("zipCode", {
                                                required: true,
                                            })}
                                            readOnly
                                            className="border p-2 w-[120px] bg-[#f9f9f9] border-[#ddd] flex-2"
                                            placeholder="우편번호"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setIsPostcodeOpen(
                                                    !isPostcodeOpen,
                                                )
                                            }
                                            className="border border-black px-4 py-2 hover:bg-black hover:text-white transition-all text-[12px]"
                                        >
                                            주소검색
                                        </button>
                                    </div>
                                    {isPostcodeOpen && (
                                        <div className="border border-black p-2 relative z-50 bg-white shadow-xl">
                                            <DaumPostcodeEmbed
                                                onComplete={
                                                    handleCompletePostcode
                                                }
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setIsPostcodeOpen(false)
                                                }
                                                className="absolute top-2 right-4 z-[60] font-bold p-2"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    )}
                                    <input
                                        {...register("address1", {
                                            required: true,
                                        })}
                                        readOnly
                                        className="border p-2 w-full bg-[#f9f9f9] border-[#ddd]"
                                        placeholder="기본주소"
                                    />
                                    <input
                                        {...register("address2", {
                                            required: true,
                                        })}
                                        className="border p-2 w-full outline-none border-[#ddd] focus:border-black"
                                        placeholder="상세주소를 입력해주세요."
                                    />
                                </div>
                            </div>

                            {/* 연락처 */}
                            <div className="grid grid-cols-[120px_1fr] items-center">
                                <label className="font-medium">
                                    휴대전화 *
                                </label>
                                <div className="flex items-center gap-2">
                                    <select
                                        {...register("phone1")}
                                        className="border p-2 border-[#ddd] bg-white outline-none"
                                    >
                                        <option value="010">010</option>
                                    </select>
                                    <span>-</span>
                                    <input
                                        {...register("phone2", {
                                            required: true,
                                            maxLength: 4,
                                        })}
                                        className="border p-2 w-[80px] text-center border-[#ddd] outline-none focus:border-black"
                                    />
                                    <span>-</span>
                                    <input
                                        {...register("phone3", {
                                            required: true,
                                            maxLength: 4,
                                        })}
                                        className="border p-2 w-[80px] text-center border-[#ddd] outline-none focus:border-black"
                                    />
                                </div>
                            </div>

                            {/* 이메일 */}
                            <div className="grid grid-cols-[120px_1fr] items-center">
                                <label className="font-medium">이메일 *</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        {...register("emailId", {
                                            required: true,
                                        })}
                                        className="border p-2 w-[150px] border-[#ddd] outline-none focus:border-black"
                                    />
                                    <span>@</span>
                                    <input
                                        {...register("emailDomain", {
                                            required: true,
                                        })}
                                        className="border p-2 w-[150px] border-[#ddd] outline-none focus:border-black"
                                    />
                                </div>
                            </div>

                            {/* 배송 메시지 */}
                            <div className="grid grid-cols-[120px_1fr] items-start">
                                <label className="font-medium mt-2">
                                    배송 메시지
                                </label>
                                <div className="space-y-2">
                                    <select
                                        {...register("deliveryRequest")}
                                        className="border p-2 w-full max-w-[465px] border-[#ddd] outline-none focus:border-black bg-white"
                                    >
                                        <option value="">
                                            -- 메시지를 선택해주세요 --
                                        </option>
                                        <option value="배송 전 미리 연락바랍니다.">
                                            배송 전 미리 연락바랍니다.
                                        </option>
                                        <option value="부재 시 경비실에 맡겨주세요.">
                                            부재 시 경비실에 맡겨주세요.
                                        </option>
                                        <option value="부재 시 문 앞에 놓아주세요.">
                                            부재 시 문 앞에 놓아주세요.
                                        </option>
                                        <option value="택배함에 보관해 주세요.">
                                            택배함에 보관해 주세요.
                                        </option>
                                        <option value="custom">
                                            직접 입력
                                        </option>
                                    </select>
                                    {selectedMsg === "custom" && (
                                        <input
                                            id="customMsg"
                                            type="text"
                                            placeholder="배송 메시지를 직접 입력해주세요."
                                            className="border p-2 w-full max-w-[465px] border-[#ddd] outline-none focus:border-black animate-in fade-in duration-300"
                                        />
                                    )}
                                </div>
                            </div>

                            {/* 결제 수단 선택 */}
                            <div className="mt-12">
                                <h2 className="text-xl font-bold border-b border-black pb-4 mb-8">
                                    결제수단
                                </h2>
                                <div className="grid grid-cols-3 gap-2 mb-6">
                                    {PAYMENT_METHODS.map((method) => (
                                        <button
                                            key={method.id}
                                            type="button"
                                            onClick={() =>
                                                setSelectedPayment(
                                                    method.id as MyPaymentMethod,
                                                )
                                            }
                                            className={twMerge(
                                                "h-[54px] border text-[13px] font-medium transition-all",
                                                selectedPayment === method.id
                                                    ? "bg-black text-white border-black"
                                                    : "bg-white text-black border-[#ddd] hover:border-black",
                                            )}
                                        >
                                            {method.label}
                                        </button>
                                    ))}
                                </div>
                                <div className="space-y-2 text-[12px] text-[#FF4B00] mb-8 leading-5">
                                    <p>
                                        • 테스트 결제이므로 실제 금액은 청구되지
                                        않습니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 오른쪽 영역 */}
                    <div className="lg:w-[400px]">
                        <div className="sticky top-[200px] space-y-6">
                            <div className="border border-[#eee] p-6 bg-white shadow-sm">
                                <h3 className="font-bold border-b pb-4 mb-4">
                                    상품정보
                                </h3>
                                <div className="max-h-[300px] overflow-y-auto space-y-4 pr-2">
                                    {orderItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex gap-4"
                                        >
                                            {item.product.thumbnail && (
                                                <img
                                                    src={item.product.thumbnail}
                                                    className="w-16 h-16 object-cover border border-[#eee]"
                                                    alt={item.product.name}
                                                />
                                            )}
                                            <div className="text-[12px] flex-1">
                                                <p className="font-medium line-clamp-2">
                                                    {item.product.name}
                                                </p>
                                                <p className="text-gray-400">
                                                    수량: {item.quantity}개
                                                </p>
                                                <p className="font-bold">
                                                    {formatPrice(
                                                        item.product.price *
                                                            item.quantity,
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="border border-[#eee] p-6 bg-gray-50 shadow-sm">
                                <h3 className="font-bold border-b pb-4 mb-4">
                                    결제 정보
                                </h3>
                                <div className="space-y-3 text-[13px]">
                                    <div className="flex justify-between">
                                        <span>주문금액</span>
                                        <span>
                                            {formatPrice(getCartTotalPrice())}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-gray-500 italic">
                                        <span>배송비 (3만원 이상 무료)</span>
                                        <span>
                                            + {formatPrice(getShippingFee())}
                                        </span>
                                    </div>
                                    <div className="flex justify-between pt-4 border-t border-black font-bold text-lg">
                                        <span>최종 결제금액</span>
                                        <span>
                                            {formatPrice(getFinalAmount())}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-5 font-bold text-lg transition-all ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-[#FF4B00] text-white hover:bg-black"}`}
                            >
                                {isSubmitting
                                    ? "처리 중..."
                                    : `${formatPrice(getFinalAmount())} 결제하기`}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CheckoutPage;
