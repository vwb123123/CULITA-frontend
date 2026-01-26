import { twMerge } from "tailwind-merge";
import useCartStore from "../../store/useCartStore.ts";

function CartPage() {
    const items = useCartStore((state) => state.items) || [];
    const removeItem = useCartStore((state) => state.removeItem);
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const getTotalPrice = useCartStore((state) => state.getTotalPrice);

    const totalPrice =
        typeof getTotalPrice === "function" ? getTotalPrice() : 0;

    const formatPrice = (price: number | undefined) => {
        const safePrice = price ?? 0;
        return `KRW ${safePrice.toLocaleString()}`;
    };

    return (
        <div className={twMerge(["pt-[170px]", "px-10", "pb-50"])}>
            <section className={twMerge(["max-w-[1168px]", "mx-auto"])}>
                <h2
                    className={twMerge([
                        "text-[36px]",
                        "font-medium",
                        "text-center",
                        "mb-10",
                        "tracking-widest",
                        "uppercase",
                        "mt-[35px]",
                    ])}
                >
                    CART
                </h2>

                <div
                    className={twMerge(
                        ["flex", "border-b", "border-black"],
                        ["justify-center", "items-center"],
                    )}
                >
                    <div
                        className={twMerge(
                            ["pb-5"],
                            ["text-lg", "font-medium"],
                        )}
                    >
                        장바구니 ({items.length})
                    </div>
                </div>

                <table className={twMerge(["w-full", "text-[12px]", "mb-10"])}>
                    <thead
                        className={twMerge([
                            "bg-gray-50",
                            "border-b",
                            "border-gray-200",
                        ])}
                    >
                        <tr>
                            <th className="py-3 px-4 text-left w-10">
                                <input type="checkbox" checked readOnly />
                            </th>
                            <th className="py-3 font-normal">상품정보</th>
                            <th className="py-3 font-normal">수량</th>
                            <th className="py-3 font-normal">가격</th>
                            <th className="py-3 font-normal">할인가격</th>
                            <th className="py-3 font-normal">배송비</th>
                            <th className="py-3 font-normal">상품금액</th>
                            <th className="py-3 w-10"></th>
                        </tr>
                    </thead>
                    <tbody className="border-b border-gray-100">
                        {items.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={8}
                                    className="py-20 text-center text-gray-400"
                                >
                                    장바구니가 비어 있습니다.
                                </td>
                            </tr>
                        ) : (
                            items.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-b border-gray-50 last:border-0"
                                >
                                    <td className="py-6 px-4">
                                        <input
                                            type="checkbox"
                                            checked
                                            readOnly
                                        />
                                    </td>
                                    <td className="py-6 flex items-center gap-4">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-20 h-20 object-cover border border-gray-100"
                                        />
                                        <span className="font-medium">
                                            {item.name}
                                        </span>
                                    </td>
                                    <td className="py-6 text-center">
                                        <div className="inline-flex items-center border border-gray-200">
                                            <button
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.id,
                                                        item.quantity - 1,
                                                    )
                                                }
                                                className="px-2 py-1 hover:bg-gray-50"
                                            >
                                                －
                                            </button>
                                            <span className="px-4 py-1 border-x border-gray-200">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.id,
                                                        item.quantity + 1,
                                                    )
                                                }
                                                className="px-2 py-1 hover:bg-gray-50"
                                            >
                                                ＋
                                            </button>
                                        </div>
                                    </td>
                                    <td className="py-6 text-center">
                                        {formatPrice(item.price)}
                                    </td>
                                    <td className="py-6 text-center">
                                        - KRW 0
                                    </td>
                                    <td className="py-6 text-center">무료</td>
                                    <td className="py-6 text-center font-medium">
                                        {formatPrice(
                                            (item.price || 0) *
                                                (item.quantity || 0),
                                        )}
                                    </td>
                                    <td className="py-6 text-center">
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-gray-400 text-lg hover:text-black"
                                        >
                                            ✕
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                <div className={twMerge(["flex", "justify-end", "mb-10"])}>
                    <div
                        className={twMerge([
                            "w-[300px]",
                            "text-[13px]",
                            "space-y-2",
                        ])}
                    >
                        <div className="flex justify-between">
                            <span className="text-gray-500">총 상품금액</span>
                            <span>{formatPrice(totalPrice)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">할인금액</span>
                            <span>- KRW 0</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">배송비</span>
                            <span>+ KRW 0</span>
                        </div>
                        <div className="flex justify-between pt-4 font-bold text-base">
                            <span>TOTAL</span>
                            <span className="text-[#ff4600]">
                                {formatPrice(totalPrice)}
                            </span>
                        </div>
                    </div>
                </div>

                <div
                    className={twMerge(
                        ["flex", "justify-between", "items-center"],
                        ["mt-10", "border-t", "border-black"],
                        ["pt-5"],
                    )}
                >
                    <button className="px-6 py-2 border border-gray-300 text-xs">
                        선택삭제
                    </button>
                    <div className="flex gap-2">
                        <button className="px-10 py-3 border border-black text-xs font-medium uppercase">
                            선택상품주문
                        </button>
                        <button className="px-10 py-3 bg-black text-white text-xs font-medium uppercase">
                            전체상품주문
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default CartPage;
