import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import useCartStore from "../../store/useCartStore.ts";
import useAuthStore from "../../store/useAuthStore.ts";
import Spinner from "../../components/common/Spinner.tsx";
import { useNavigate } from "react-router";
import useOrderStore from "../../store/useOrderStore.ts";

function CartPage() {
    const navigate = useNavigate();
    const { items, fetchCart, removeItem, updateQuantity, loading } =
        useCartStore();
    const { setOrderItems } = useOrderStore();
    const { isLoggedIn } = useAuthStore();
    const [checkedIds, setCheckedIds] = useState<number[]>([]);

    useEffect(() => {
        fetchCart().then(() => {});
    }, [fetchCart]);

    const isAllChecked = items.length > 0 && checkedIds.length === items.length;

    const toggleAllChecked = () => {
        setCheckedIds(isAllChecked ? [] : items.map((item) => item.id));
    };

    const toggleChecked = (id: number) => {
        setCheckedIds((prev) =>
            prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
        );
    };

    const handleOrder = (isAll: boolean) => {
        if (!isLoggedIn) {
            const confirmLogin = window.confirm(
                "로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까?",
            );
            if (confirmLogin) navigate("/login");
            return;
        }

        let targetItems;
        if (isAll) {
            targetItems = items;
        } else {
            targetItems = items.filter((item) => checkedIds.includes(item.id));
        }

        if (targetItems.length === 0) {
            alert("주문할 상품을 선택해주세요.");
            return;
        }

        setOrderItems(targetItems);
        navigate("/orders/checkout");
    };

    const productTotal = items.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0,
    );
    const shippingFee = productTotal >= 30000 || productTotal === 0 ? 0 : 3000;
    const finalPrice = productTotal + shippingFee;

    const formatPrice = (price: number) => `KRW ${price.toLocaleString()}`;

    if (loading && items.length === 0) return <Spinner full />;

    return (
        <div className={twMerge("pt-[170px] px-10 pb-50 bg-white")}>
            <section className={twMerge("max-w-[1200px] mx-auto")}>
                <h1
                    className={twMerge("text-4xl font-medium text-center mb-8")}
                >
                    CART
                </h1>

                <div className={twMerge("flex border-b border-[#ddd]")}>
                    <div
                        className={twMerge(
                            "px-10 py-4 font-medium w-full text-center",
                        )}
                    >
                        장바구니 ({items.length})
                    </div>
                </div>

                {items.length === 0 ? (
                    <div className={twMerge("py-16 text-center")}>
                        <p className={twMerge(" text-[#757575] mb-6")}>
                            장바구니가 비어 있습니다.
                        </p>
                        <button
                            onClick={() => navigate("/products")}
                            className={twMerge(
                                "px-10 py-3 border border-black text-[12px] uppercase hover:bg-black hover:text-white transition-all duration-300",
                            )}
                        >
                            쇼핑하러가기
                        </button>
                    </div>
                ) : (
                    <>
                        <div className={twMerge("w-full mb-10")}>
                            <table className={twMerge("w-full")}>
                                <thead className={twMerge("bg-[#f2f2f2]")}>
                                    <tr
                                        className={twMerge(
                                            "h-12 text-xs text-[#222]",
                                        )}
                                    >
                                        <th className="w-[50px]">
                                            <input
                                                type="checkbox"
                                                checked={isAllChecked}
                                                onChange={toggleAllChecked}
                                                className="accent-[#ff4600]"
                                            />
                                        </th>
                                        <th className="font-normal pl-4 w-[450px] text-left">
                                            상품정보
                                        </th>
                                        <th className="font-normal">수량</th>
                                        <th className="font-normal">가격</th>
                                        <th className="font-normal">배송비</th>
                                        <th className="font-normal pl-12">
                                            상품금액
                                        </th>
                                        <th className="w-[50px]"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="border-b border-[#eee] text-[#222]"
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
                                                    className="accent-[#ff4600]"
                                                />
                                            </td>
                                            <td className="py-8 flex items-center gap-5 pl-4">
                                                {item.product.thumbnail && (
                                                    <img
                                                        src={
                                                            item.product
                                                                .thumbnail
                                                        }
                                                        alt={item.product.name}
                                                        onClick={() =>
                                                            navigate(
                                                                `/products/${item.id - 3}`,
                                                            )
                                                        }
                                                        className="w-[85px] h-[85px] object-cover border border-[#eee] cursor-pointer"
                                                    />
                                                )}
                                                <div className="text-left leading-5">
                                                    <p
                                                        className="font-bold text-[12px] cursor-pointer"
                                                        onClick={() =>
                                                            navigate(
                                                                `/products/${item.id - 3}`,
                                                            )
                                                        }
                                                    >
                                                        {item.product.name}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="py-8 text-center">
                                                <div className="inline-flex items-center">
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
                                                    <span className="w-9 text-center leading-7">
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
                                            <td className="text-center text-[#777]">
                                                {shippingFee === 0
                                                    ? "무료"
                                                    : "기본배송"}
                                            </td>
                                            <td className="text-right  font-bold">
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

                        <div className="flex justify-end border-b border-black pr-10 mb-5 pb-5">
                            <div className="w-[280px] text-[12px] space-y-3">
                                <div className="flex justify-between items-center text-[#757575]">
                                    <span>총 상품금액</span>
                                    <span className="text-black font-medium">
                                        {formatPrice(productTotal)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-[#757575]">
                                    <span>배송비</span>
                                    <span className="text-black font-medium">
                                        + {formatPrice(shippingFee)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center pt-5 border-t border-[#eee] mt-4 font-bold">
                                    <span className="text-[14px]">TOTAL</span>
                                    <span className="text-[18px] text-black">
                                        {formatPrice(finalPrice)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <button
                                onClick={() => {
                                    if (checkedIds.length === 0)
                                        return alert(
                                            "삭제할 상품을 선택해주세요.",
                                        );
                                    checkedIds.forEach((id) => removeItem(id));
                                    setCheckedIds([]);
                                }}
                                className="px-6 py-2 text-xs border border-[#ddd] hover:border-black transition-colors"
                            >
                                선택삭제
                            </button>
                            <div className="flex gap-1.5">
                                <button
                                    onClick={() => handleOrder(false)}
                                    className="w-[160px] h-[44px] border border-black text-sm font-medium hover:bg-gray-50 transition-all"
                                >
                                    선택상품주문
                                </button>
                                <button
                                    onClick={() => handleOrder(true)}
                                    className="w-[160px] h-[44px] border border-black text-sm font-medium text-white bg-black hover:bg-black/80 transition-all"
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
