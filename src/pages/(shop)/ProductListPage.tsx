import { twMerge } from "tailwind-merge";
import { useEffect, useMemo, useState } from "react";
import ProductCard from "../../components/shop/ProductCard.tsx";
import type { ProductListItem } from "../../types/product.ts";
import { fetchProducts } from "../../api/product.api.ts";
import shopCenterItem from "../../assets/SHOP Page/ShopCenterItem.jpg";

type ListSlot =
    | { type: "product"; product: ProductListItem }
    | { type: "banner"; imageUrl: string };

const TABS = ["ALL", "GIFT SET", "MOUTHWASH", "GOODS"];

function ProductListPage() {
    const [activeTab, setActiveTab] = useState("ALL");

    const [products, setProducts] = useState<ProductListItem[]>([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await fetchProducts({ limit: 20 });
                setProducts(res.data);
            } catch (e) {
                console.log("데이터를 가져오는데 실패했습니다.", e);
            }
        };
        loadData().then(() => {});
    }, [activeTab]);

    const slots = useMemo((): ListSlot[] => {
        if (products.length === 0) return [];

        const result: ListSlot[] = [];

        const reversedProducts = [...products].reverse();

        reversedProducts.forEach((item, index) => {
            result.push({ type: "product", product: item });

            if (index === 0) {
                result.push({ type: "banner", imageUrl: shopCenterItem });
            }
        });

        return result;
    }, [products]);

    return (
        <div className={twMerge(["pt-[80px]", "px-10", "pb-50"])}>
            <div className={twMerge(["mx-auto", "mb-[25px]"])}>
                <ul
                    className={twMerge(
                        ["mt-15", "mb-7.5"],
                        ["h-[50px]", "block"],
                        ["text-left", "flex"],
                        ["items-center"],
                    )}
                >
                    {TABS.map((tab) => (
                        <li
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={twMerge(
                                ["text-[15px]", "text-center"],
                                ["mr-2.5", "py-3", "px-[25px]"],
                                ["rounded-[50px]", "h-auto"],
                                ["hover:bg-[#FF4600]", "hover:text-white"],
                                ["transition-all", "duration-200"],
                                activeTab === tab
                                    ? [
                                          "bg-[#FF4600]",
                                          "text-white",
                                          "font-medium",
                                      ]
                                    : ["bg-[#F2F2F2]"],
                            )}
                        >
                            {tab}
                        </li>
                    ))}
                </ul>
            </div>
            {/* 상품 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-0">
                {slots.map((slot, index) => {
                    if (slot.type === "product") {
                        return (
                            <ProductCard key={index} product={slot.product} />
                        );
                    }
                    if (slot.type === "banner") {
                        return (
                            <div key={`banner-${index}`} className="mb-[80px]">
                                <div className="rounded-[30px] overflow-hidden aspect-[1/1.2]">
                                    <img
                                        src={slot.imageUrl}
                                        className={twMerge(
                                            ["w-full", "h-full"],
                                            ["object-cover", "transition-all"],
                                            ["duration-500", "hover:scale-102"],
                                        )}
                                        alt="shop banner"
                                    />
                                </div>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
}
export default ProductListPage;
