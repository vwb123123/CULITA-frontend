import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import useCartStore from "../../store/useCartStore.ts";

function CartPage() {
    const { items, fetchCart, removeItem, updateQuantity } = useCartStore();

    const [checkedIds, setCheckedIds] = useState<number[]>([]);

    useEffect(() => {
        fetchCart();
    }, []);

    /* ======================
        체크박스 로직
    ====================== */

    const isAllChecked = items.length > 0 && checkedIds.length === items.length;

    const toggleAllChecked = () => {
        setCheckedIds(isAllChecked ? [] : items.map((item) => item.id));
    };

    const toggleChecked = (id: number) => {
        setCheckedIds((prev) =>
            prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
        );
    };

    /* ======================
        가격 계산
    ====================== */

    const productTotal = items.reduce((acc, item) => acc + item.totalPrice, 0);

    const selectedItems = items.filter((item) => checkedIds.includes(item.id));

    const selectedTotal = selectedItems.reduce(
        (acc, item) => acc + item.totalPrice,
        0,
    );

    const shippingFee = productTotal >= 30000 ? 0 : 3000;
    const finalPrice = productTotal + shippingFee;

    const formatPrice = (price: number) => `KRW ${price.toLocaleString()}`;

    /* ======================
        삭제 기능
    ====================== */

    const removeSelectedItems = async () => {
        for (const id of checkedIds) {
            await removeItem(id);
        }
        setCheckedIds([]);
    };

    const removeAllItems = async () => {
        for (const item of items) {
            await removeItem(item.id);
        }
        setCheckedIds([]);
    };

    return (
        <div className={twMerge(["pt-[170px]", "px-10", "pb-50"])}>
            <section className={twMerge(["max-w-[1168px]", "mx-auto"])}>
                <h2 className="text-[36px] font-medium text-center mb-10 uppercase">
                    CART
                </h2>

                {/* 헤더 */}
                <div className="flex justify-center border-b border-black mb-6">
                    <div className="pb-5 text-lg font-medium">
                        장바구니 ({items.length})
                    </div>
                </div>

                {/* 테이블 */}
                <table className="w-full text-[12px] mb-10">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="py-3 px-4 w-10">
                                <input
                                    type="checkbox"
                                    checked={isAllChecked}
                                    onChange={toggleAllChecked}
                                />
                            </th>
                            <th>상품정보</th>
                            <th>수량</th>
                            <th>상품금액</th>
                            <th>배송비</th>
                            <th>합계</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {items.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="py-20 text-center text-gray-400"
                                >
                                    장바구니가 비어 있습니다.
                                </td>
                            </tr>
                        ) : (
                            items.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-b border-gray-100"
                                >
                                    <td className="py-6 px-4">
                                        <input
                                            type="checkbox"
                                            checked={checkedIds.includes(
                                                item.id,
                                            )}
                                            onChange={() =>
                                                toggleChecked(item.id)
                                            }
                                        />
                                    </td>

                                    <td className="py-6 flex items-center gap-4">
                                        <img
                                            src={
                                                item.product.thumbnail ??
                                                "/placeholder.png"
                                            }
                                            alt={item.product.name}
                                            className="w-20 h-20 object-cover border"
                                        />
                                        <span className="font-medium">
                                            {item.product.name}
                                        </span>
                                    </td>

                                    <td className="py-6 text-center">
                                        <div className="inline-flex border">
                                            <button
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.id,
                                                        item.quantity - 1,
                                                    )
                                                }
                                                className="px-2"
                                            >
                                                −
                                            </button>
                                            <span className="px-4 border-x">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.id,
                                                        item.quantity + 1,
                                                    )
                                                }
                                                className="px-2"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>

                                    <td className="text-center">
                                        {formatPrice(item.product.price)}
                                    </td>

                                    <td className="text-center">무료</td>

                                    <td className="text-center font-medium">
                                        {formatPrice(item.totalPrice)}
                                    </td>

                                    <td className="text-center">
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-gray-400 hover:text-black"
                                        >
                                            ✕
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {/* 금액 요약 */}
                <div className="flex justify-end mb-10">
                    <div className="w-[300px] text-[13px] space-y-2">
                        <div className="flex justify-between">
                            <span>총 상품금액</span>
                            <span>{formatPrice(productTotal)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>배송비</span>
                            <span>
                                {shippingFee === 0
                                    ? "무료"
                                    : formatPrice(shippingFee)}
                            </span>
                        </div>
                        <div
                            className={twMerge(
                                ["flex", "justify-between"],
                                ["pt-4", "font-semibold"],
                                ["text-[16px]"],
                            )}
                        >
                            <span>TOTAL</span>
                            <span className="text-[#ff4600]">
                                {formatPrice(finalPrice)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* 하단 버튼 */}
                <div className="flex justify-between items-center border-t pt-5">
                    <div className="flex gap-2">
                        <button
                            onClick={removeSelectedItems}
                            disabled={checkedIds.length === 0}
                            className="px-6 py-2 border text-xs disabled:opacity-40"
                        >
                            선택삭제
                        </button>
                        <button
                            onClick={removeAllItems}
                            disabled={items.length === 0}
                            className="px-6 py-2 border text-xs disabled:opacity-40"
                        >
                            전체삭제
                        </button>
                    </div>

                    <div className="flex gap-2">
                        <button
                            disabled={checkedIds.length === 0}
                            onClick={() =>
                                console.log(
                                    "부분 주문",
                                    selectedItems,
                                    selectedTotal,
                                )
                            }
                            className="px-10 py-3 border text-xs disabled:opacity-40"
                        >
                            선택상품주문
                        </button>
                        <button
                            disabled={items.length === 0}
                            onClick={() => console.log("전체 주문", items)}
                            className="px-10 py-3 bg-black text-white text-xs  disabled:opacity-40"
                        >
                            전체상품주문
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default CartPage;
