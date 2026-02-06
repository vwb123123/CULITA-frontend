import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import useCartStore from "../../store/useCartStore.ts";
import useAuthStore from "../../store/useAuthStore.ts";
import Spinner from "../../components/common/Spinner.tsx";
import { useNavigate } from "react-router";

function CartPage() {
    const navigate = useNavigate();
    const { items, fetchCart, removeItem, updateQuantity, loading } =
        useCartStore();
    const { isLoggedIn } = useAuthStore();
    const [checkedIds, setCheckedIds] = useState<number[]>([]);

    useEffect(() => {
        fetchCart().then(() => {});
    }, []);

    const isAllChecked = items.length > 0 && checkedIds.length === items.length;
    const toggleAllChecked = () => {
        setCheckedIds(isAllChecked ? [] : items.map((item) => item.id));
    };
    const toggleChecked = (id: number) => {
        setCheckedIds((prev) =>
            prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
        );
    };

    const productTotal = items.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0,
    );
    const shippingFee = productTotal >= 30000 || productTotal === 0 ? 0 : 3000;
    const finalPrice = productTotal + shippingFee;

    const formatPrice = (price: number) => `KRW ${price.toLocaleString()}`;

    const handleOrder = () => {
        if (!isLoggedIn) {
            const confirmLogin = window.confirm(
                "로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까?",
            );
            if (confirmLogin) {
                navigate("/login");
            }
            return;
        }
        navigate("/orders");
    };

    if (loading && items.length === 0) return <Spinner full />;

    return (
        <div className={twMerge("pt-[170px] px-10 pb-50 bg-white")}>
            <section className={twMerge("max-w-[1200px] mx-auto")}>
                <h1
                    className={twMerge("text-4xl font-medium text-center mb-8")}
                >
                    CART
                </h1>

                {/* 장바구니 단일 탭 */}
                <div className={twMerge("flex border-b border-[#ddd]")}>
                    <div
                        className={twMerge(
                            ["px-10", "py-4", "font-medium", "w-full"],
                            ["text-center"],
                        )}
                    >
                        장바구니 ({items.length})
                    </div>
                </div>

                {items.length === 0 ? (
                    /* 1. 장바구니가 비어있을 때의 단독 화면 */
                    <div className={twMerge("py-16 text-center")}>
                        <p className={twMerge(" text-[#757575] mb-6")}>
                            장바구니가 비어 있습니다.
                        </p>
                        <button
                            onClick={() => navigate("/products")}
                            className={twMerge(
                                "px-10 py-3 border border-black text-[12px] uppercase",
                                "hover:bg-black hover:text-white transition-all duration-300",
                            )}
                        >
                            쇼핑하러가기
                        </button>
                    </div>
                ) : (
                    /* 2. 장바구니에 상품이 있을 때 */
                    <>
                        {/* 테이블 영역 */}
                        <div className={twMerge("w-full mb-10")}>
                            <table className={twMerge("w-full")}>
                                <thead className={twMerge("bg-[#f2f2f2]")}>
                                    <tr className={twMerge("h-12 text-xs")}>
                                        <th className="w-[50px]">
                                            <input
                                                type="checkbox"
                                                checked={isAllChecked}
                                                onChange={toggleAllChecked}
                                                className="accent-black"
                                            />
                                        </th>
                                        <th className="font-normal pl-4 w-[450px]">
                                            상품정보
                                        </th>
                                        <th className="font-normal">수량</th>
                                        <th className="font-normal">가격</th>
                                        <th className="font-normal">
                                            할인가격
                                        </th>
                                        <th className="font-normal">배송비</th>
                                        <th className="font-normal text-right pr-10">
                                            상품금액
                                        </th>
                                        <th className="w-[50px]"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item) => (
                                        <tr
                                            key={item.id}
                                            className={twMerge(
                                                ["border-b", " border-[#eee]"],
                                                ["text-[#222]", "w-full"],
                                            )}
                                        >
                                            <td className="py-8 text-center">
                                                <input
                                                    type="checkbox"
                                                    checked={checkedIds.includes(
                                                        item.id,
                                                    )}
                                                    onChange={() =>
                                                        toggleChecked(item.id)
                                                    }
                                                    className="accent-black"
                                                />
                                            </td>
                                            <td
                                                className={twMerge(
                                                    "py-8 flex items-center gap-5 pl-4",
                                                )}
                                            >
                                                {item.product.thumbnail && (
                                                    <img
                                                        src={
                                                            item.product
                                                                .thumbnail
                                                        }
                                                        className="w-[85px] h-[85px] object-cover border border-[#eee]"
                                                        alt={item.product.name}
                                                    />
                                                )}
                                                <div className="text-left leading-5">
                                                    <p className="font-bold text-[12px]">
                                                        {item.product.name}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="py-8 text-center">
                                                <div
                                                    className={twMerge(
                                                        "inline-flex items-center border border-[#ddd] bg-white",
                                                    )}
                                                >
                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.id,
                                                                item.quantity -
                                                                    1,
                                                            )
                                                        }
                                                        className="w-7 h-7 flex items-center justify-center hover:bg-gray-50"
                                                    >
                                                        −
                                                    </button>
                                                    <span className="w-9 text-center border-x border-[#ddd] leading-7">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.id,
                                                                item.quantity +
                                                                    1,
                                                            )
                                                        }
                                                        className="w-7 h-7 flex items-center justify-center hover:bg-gray-50"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="text-center">
                                                {formatPrice(
                                                    item.product.price,
                                                )}
                                            </td>
                                            <td className="text-center">
                                                - {formatPrice(0)}
                                            </td>
                                            <td className="text-center text-[#999]">
                                                {shippingFee === 0
                                                    ? "무료"
                                                    : "기본배송"}
                                            </td>
                                            <td className="text-right pr-10 font-bold">
                                                {formatPrice(
                                                    item.product.price *
                                                        item.quantity,
                                                )}
                                            </td>
                                            <td className="text-center">
                                                <button
                                                    onClick={() =>
                                                        removeItem(item.id)
                                                    }
                                                    className="text-[#ccc] hover:text-black transition-colors text-lg"
                                                >
                                                    ✕
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* 우측 정렬된 최종 금액 섹션 */}
                        <div
                            className={twMerge(
                                ["flex", "justify-end", "border-black"],
                                ["pr-10", "mb-5", "border-b", "pb-5"],
                            )}
                        >
                            <div
                                className={twMerge(
                                    "w-[280px] text-[12px] space-y-3",
                                )}
                            >
                                <div className="flex justify-between items-center text-[#757575]">
                                    <span>총 상품금액</span>
                                    <span className="text-black font-medium">
                                        {formatPrice(productTotal)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-[#757575]">
                                    <span>할인금액</span>
                                    <span className="text-black font-medium">
                                        - {formatPrice(0)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-[#757575]">
                                    <span>배송비</span>
                                    <span className="text-black font-medium">
                                        + {formatPrice(shippingFee)}
                                    </span>
                                </div>
                                <div
                                    className={twMerge(
                                        "flex justify-between items-center pt-5 border-t border-[#eee] mt-4",
                                    )}
                                >
                                    <span className="text-[14px] font-bold">
                                        TOTAL
                                    </span>
                                    <span className="text-[18px] font-bold text-black">
                                        {formatPrice(finalPrice)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* 하단 버튼 */}
                        <div
                            className={twMerge([
                                "flex",
                                "justify-between",
                                "items-center",
                            ])}
                        >
                            <button
                                className={twMerge(
                                    ["px-6", "py-2", "text-xs"],
                                    ["border", "border-[#ddd]"],
                                    ["hover:border-black", "transition-colors"],
                                )}
                            >
                                선택삭제
                            </button>
                            <div className="flex gap-1.5">
                                <button
                                    onClick={handleOrder}
                                    className={twMerge(
                                        ["w-[160px]", " h-[44px]"],
                                        ["border", " border-black", " text-sm"],
                                        ["font-medium"],
                                        ["hover:bg-gray-50", "transition-all"],
                                    )}
                                >
                                    선택상품주문
                                </button>
                                <button
                                    className={twMerge(
                                        ["w-[160px]", " h-[44px]", " text-sm"],
                                        ["border", " border-black"],
                                        ["font-medium"],
                                        ["text-white", "bg-black"],
                                        ["hover:bg-black/80", "transition-all"],
                                    )}
                                    onClick={handleOrder}
                                >
                                    전체상품주문
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </section>
        </div>
    );
}

export default CartPage;
