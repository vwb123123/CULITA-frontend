import { useNavigate, useParams } from "react-router";
import useCartStore from "../../store/useCartStore.ts";
import useAuthStore from "../../store/useAuthStore.ts";
import { type ReactNode, useEffect, useState } from "react";
import type { ProductDetail } from "../../types/product.ts";
import Spinner from "../../components/common/Spinner.tsx";
import { twMerge } from "tailwind-merge";
import useOrderStore from "../../store/useOrderStore.ts";
import {
    fetchProductDetail,
    getScentByProductName,
} from "../../api/product.api.ts";
import type { CartItem } from "../../types/cart.ts";
import ProductImageGallery from "../../components/shop/ProductImageGallery.tsx";
import { FiChevronDown } from "react-icons/fi";
import ImageMarquee from "../../components/shop/ImageMarquee.tsx";
import GiftSetDetailPage from "../../components/shop/GiftSetDetailPage.tsx";
import MouthwashDetailPage from "../../components/shop/MouthwashDetailPage.tsx";
import GoodsDetailPage from "../../components/shop/GoodsDetailPage.tsx";
import ProductFeatureSwiper from "../../components/shop/ProductFeatureSwiper.tsx";
import ProductEffectStats from "../../components/shop/ProductEffectStats.tsx";
import ProductFaQ from "../../components/shop/ProductFaQ.tsx";
import ProductInfoSection from "../../components/shop/ProductInfoSection.tsx";
import ProductReviewSection from "../../components/shop/ProductReviewSection.tsx";
import ScrollReveal from "../../components/common/ScrollReveal.tsx";

function ProductDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { addItem } = useCartStore();
    const { isLoggedIn } = useAuthStore();
    const { setOrderItems } = useOrderStore();

    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState<ProductDetail | null>(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;

            try {
                const result = await fetchProductDetail(Number(id));
                setProduct(result);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchData().then(() => {});
    }, [id]);

    const handleAddToCart = async () => {
        if (!isLoggedIn) {
            const confirmLogin = window.confirm(
                "로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까?",
            );
            if (confirmLogin) {
                navigate("/login");
            }
            return;
        }
        if (!product) return;

        if (product.stock <= 0) {
            alert("품절된 상품입니다.");
            return;
        }

        try {
            await addItem(product.id, quantity);
            if (
                window.confirm(
                    "장바구니에 상품을 담았습니다. 장바구니로 이동하시겠습니까?",
                )
            ) {
                navigate("/cart");
            }
        } catch (e) {
            console.log(e);
            alert("장바구니 담기에 실패했습니다.");
        }
    };

    const handleBuyNow = () => {
        if (!isLoggedIn) {
            const confirmLogin = window.confirm(
                "로그인이 필요한 서비스입니다. 로그인 페이지로 이동하시겠습니까?",
            );
            if (confirmLogin) {
                navigate("/login");
            }
            return;
        }
        if (!quantity) {
            alert("수량을 선택해주세요.");
            return;
        }

        if (!product) return;
        if (product.stock <= 0) {
            alert("품절된 상품입니다.");
            return;
        }

        const orderItem: CartItem = {
            id: -1,
            quantity: quantity,
            product: {
                id: product.id,
                name: product.name,
                price: product.price,
                thumbnail:
                    product.images.find((img) => img.type === "MAIN")?.url ||
                    "",
            },
            totalPrice: product.price * quantity,
        };
        setOrderItems([orderItem]);
        navigate("/orders");
    };

    const incrementQuantity = () => {
        if (!product) return;
        if (quantity < product.stock) {
            setQuantity(quantity + 1);
        }
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    useEffect(() => {
        if (window.location.hash === "#review") {
            const timer = setTimeout(() => {
                const element = document.getElementById("review");
                if (element) {
                    const headerOffset = 100;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition =
                        elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth",
                    });
                }
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [product]);

    if (loading) return <Spinner full />;
    if (!product)
        return (
            <div className={twMerge(["py-40", "text-center"])}>
                상품 정보가 없습니다.
            </div>
        );

    const bothCategory =
        product.category.name === "GIFT SET" ||
        product.category.name === "MOUTHWASH";

    const giftSetCategory = product.category.name === "GIFT SET";
    const mouthwashCategory = product.category.name === "MOUTHWASH";
    const goodsCategory = product.category.name === "GOODS";

    const scentInfo = getScentByProductName(product.name);

    return (
        <div className="mt-[82px]">
            <div className="w-full flex items-start">
                <div className="w-[calc(1200/1920*100vw)]">
                    <ProductImageGallery product={product} />
                </div>

                <div
                    className={twMerge(
                        ["w-[calc(400/1920*100vw)]"],
                        ["min-w-[400px]", "flex-1"],
                        ["flex", "items-start"],
                        ["sticky", "top-24"],
                    )}
                >
                    <div
                        className={twMerge(
                            ["w-full", "max-w-[400px]", "pt-15"],
                            ["min-h-0", "mx-auto", "h-auto"],
                            ["float-right", "text-left"],
                        )}
                    >
                        <div className={"pb-5"}>
                            <div className={"pb-5"}>
                                {product.isBest && (
                                    <span
                                        className={twMerge(
                                            ["bg-[#b3e8bc]", "text-gray-800"],
                                            ["text-xs", " rounded-[5px]"],
                                            ["px-3", "py-1"],
                                        )}
                                    >
                                        Best
                                    </span>
                                )}
                                {product.isNew && (
                                    <span
                                        className={twMerge(
                                            ["bg-[#e3c7ff]", "text-gray-800"],
                                            ["text-xs", " rounded-[5px]"],
                                            ["px-3", "py-1"],
                                        )}
                                    >
                                        New
                                    </span>
                                )}
                            </div>
                            <h2
                                className={twMerge([
                                    "text-[26px]",
                                    "font-medium",
                                    "mb-1",
                                    "leading-[28px]",
                                ])}
                            >
                                {product.name}
                            </h2>

                            <div className="mt-5 mb-5">
                                <p className="text-xl font-semibold leading-5">
                                    KRW {product.price.toLocaleString()}
                                </p>
                            </div>

                            {bothCategory && scentInfo && (
                                <div className="mb-2">
                                    <p className="text-sm">{scentInfo}</p>
                                </div>
                            )}

                            {product.description && (
                                <div className="text-sm leading-[22px] mt-2.5">
                                    <p>{product.description}</p>
                                </div>
                            )}

                            <div
                                className={twMerge(
                                    ["text-sm", "text-[#666]"],
                                    ["mt-2.5", "mb-5"],
                                )}
                            >
                                <p>
                                    배송비{" "}
                                    <span className="font-medium">
                                        KRW 3,000
                                    </span>{" "}
                                    (KRW 30,000 이상 구매 시 무료)
                                </p>
                            </div>
                        </div>
                        <div className="mt-5 flex items-center">
                            <div
                                className={twMerge(
                                    ["text-xs"],
                                    ["text-[#353535]", "leading-[18px]"],
                                    ["p-4", "w-1/3"],
                                )}
                            >
                                {product.name}
                            </div>
                            <div
                                className={twMerge(
                                    ["flex", "items-center", "h-7"],
                                    ["border", "border-gray-300", "w-1/3"],
                                    ["min-w-30", "max-w-30", "justify-center"],
                                    ["items-center"],
                                )}
                            >
                                <button
                                    onClick={decrementQuantity}
                                    className={twMerge(
                                        ["w-6", "h-6", "flex"],
                                        ["items-center", "justify-center"],
                                        [
                                            "hover:bg-gray-100",
                                            "transition-colors",
                                        ],
                                    )}
                                    disabled={quantity <= 1}
                                >
                                    <span className="text-xs">−</span>
                                </button>
                                <div
                                    className={twMerge(
                                        ["h-6", "flex-1", "flex"],
                                        ["items-center", "justify-center"],
                                        ["border-gray-300", "border-x"],
                                    )}
                                >
                                    <span className="font-medium">
                                        {quantity}
                                    </span>
                                </div>
                                <button
                                    onClick={incrementQuantity}
                                    className={twMerge(
                                        ["w-6", "h-6", "flex"],
                                        ["items-center", "justify-center"],
                                        [
                                            "hover:bg-gray-100",
                                            "transition-colors",
                                        ],
                                    )}
                                    disabled={quantity >= product.stock}
                                >
                                    <span className="text-xs">+</span>
                                </button>
                            </div>
                            <div
                                className={twMerge(
                                    ["w-1/3", "flex"],
                                    ["justify-center", "items-center"],
                                )}
                            >
                                KRW &nbsp;
                                {(product.price * quantity).toLocaleString()}
                            </div>
                        </div>

                        <div
                            className={twMerge(
                                ["pt-4", "pb-6", "flex", "border-b"],
                                ["items-center", "justify-between"],
                            )}
                        >
                            <span className="text-lg font-medium">
                                총 상품금액
                            </span>
                            <span className="text-2xl font-bold">
                                KRW &nbsp;
                                {(product.price * quantity).toLocaleString()}
                            </span>
                        </div>

                        <div className="space-y-3 pt-4">
                            <button
                                onClick={handleBuyNow}
                                disabled={product.stock <= 0}
                                className={`
                                        w-full h-14 font-bold uppercase transition-colors
                                        ${
                                            product.stock <= 0
                                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                : "bg-black text-white hover:bg-zinc-800"
                                        }
                                    `}
                            >
                                {product.stock <= 0 ? "SOLD OUT" : "BUY NOW"}
                            </button>

                            <button
                                onClick={handleAddToCart}
                                disabled={product.stock <= 0}
                                className={twMerge(
                                    ["w-full", "h-14", "font-bold"],
                                    ["uppercase", "transition-colors"],
                                    ["border-2", "mb-3"],
                                    `
                                        ${
                                            product.stock <= 0
                                                ? "border-gray-300 text-gray-400 cursor-not-allowed"
                                                : "border-black text-black hover:bg-black hover:text-white"
                                        }
                                `,
                                )}
                            >
                                ADD TO CART
                            </button>
                        </div>
                        <div>
                            <Accordion
                                title={"배송 안내"}
                                className={"font-medium text-sm"}
                            >
                                <p className={twMerge(["text-[11px]"])}>
                                    - 평일 오후 10시 & 주말 오후 8시 이전
                                    주문건에 한하여 당일 출고
                                    <br />
                                    - 산간벽지나 도서지방은 별도의 추가금액을
                                    지불하셔야 하는 경우가 있습니다.
                                    <br />
                                    고객님께서 주문하신 상품은 입금 확인후
                                    배송해 드립니다. <br /> 다만, 상품종류에
                                    따라서 상품의 배송이 다소 지연될 수
                                    있습니다.
                                </p>
                            </Accordion>
                            <Accordion
                                title={"교환 안내"}
                                className={"font-medium text-sm"}
                            >
                                <span className={twMerge(["text-[11px]"])}>
                                    <strong>
                                        <span className={"text-sm"}>
                                            교환 및 반품이 가능한 경우
                                        </span>
                                    </strong>
                                    <br />- 상품을 공급 받으신 날로부터 7일이내
                                    단, 제품의
                                    <br />
                                    포장을 개봉하였거나 포장이 훼손되어
                                    상품가치가 상실된 경우에는 교환/반품이
                                    불가능합니다.
                                    <br />
                                    &nbsp;
                                    <br />- 공급받으신 상품 및 용역의 내용이
                                    표시. 광고 내용과
                                    <br />
                                    다르게 이행된 경우에는 공급받은 날로부터
                                    3월이내, 그 사실을 알게 된 날로부터 30일이내
                                    <br />
                                    &nbsp;
                                    <br />
                                    <strong>
                                        <span className={"text-sm"}>
                                            교환 및 반품이 불가능한 경우
                                        </span>
                                    </strong>
                                    <br />- 포장을 개봉하였거나 포장이 훼손되어
                                    상품가치가 상실된 경우
                                    <br />
                                    &nbsp;
                                    <br />- 고객님의 책임 있는 사유로 상품등이
                                    멸실 또는 훼손된 경우
                                    <br />
                                    액상류 제품이 날카로운 것에 노출되거나 소지
                                    방법에 따라 터지거나 찢어질 수 있으며 해당
                                    경우는 불량의 사유에서 제외 합니다.
                                    <br />
                                    &nbsp;
                                    <br />- 고객님의 사용 또는 일부 소비에
                                    의하여 상품의 가치가 현저히 감소한 경우.
                                    <br />
                                    &nbsp;
                                    <br />
                                    <strong>
                                        <span className={twMerge(["text-sm"])}>
                                            교환/반품 배송비는 동봉이 불가하며
                                            배송비 입금 혹은 환불금액에서 배송비
                                            차감으로 진행됩니다.
                                        </span>
                                    </strong>
                                    <br />
                                    - 고객 변심 및 사유의 경우 :교환 왕복 배송비
                                    6,000원 , 반품 회수 비 3,000원
                                    <br />- 상품 불량 및 오배송 사유 : 배송비
                                    없음
                                </span>
                            </Accordion>
                            <Accordion
                                title={"환불 규정"}
                                className={"font-medium text-sm"}
                            >
                                <p className={twMerge(["text-[11px]"])}>
                                    환불시 반품 확인여부를 확인한 후 3영업일
                                    이내에 결제 금액을 환불해 드립니다.
                                    <br />
                                    신용카드로 결제하신 경우는 신용카드 승인을
                                    취소하여 결제 대금이 청구되지 않게 합니다.
                                    <br />
                                    (단, 신용카드 결제일자에 맞추어 대금이 청구
                                    될수 있으면 이경우 익월 신용카드 대금청구시
                                    카드사에서 환급처리 됩니다.)
                                </p>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
            <div className={twMerge(["flex", "mt-35", "mb-20"])}>
                <ImageMarquee />
            </div>
            <div>
                {bothCategory && (
                    <p
                        className={twMerge(
                            ["text-lg", "leading-[1.56]"],
                            ["text-center", "my-10"],
                        )}
                    >
                        쿨리타는 음료나 술이 아닙니다.
                        <br /> 기분 좋은 맛을 경험하고, 가글링을 즐기세요.
                    </p>
                )}
            </div>
            <div>{giftSetCategory && <GiftSetDetailPage />}</div>
            <div>{mouthwashCategory && <MouthwashDetailPage />}</div>
            <div>{goodsCategory && <GoodsDetailPage />}</div>
            <div>
                {bothCategory ? (
                    <div>
                        <ScrollReveal delay={300}>
                            <p
                                className={twMerge(
                                    ["mt-45", "mb-15", "font-medium"],
                                    ["text-center", "text-[80px]"],
                                )}
                            >
                                소믈리에와 함께 맛과 향을 디자인했습니다.
                            </p>
                        </ScrollReveal>
                        <div className={twMerge(["flex", "h-auto", "px-10"])}>
                            <ProductFeatureSwiper />
                        </div>
                        <div className={"px-10"}>
                            <ProductEffectStats />
                        </div>
                        <div>
                            <ProductFaQ />
                        </div>
                        <div>
                            <ProductInfoSection data={product} />
                        </div>
                    </div>
                ) : (
                    <div
                        className={twMerge(
                            ["mt-10", "py-30", "px-10", "bg-[#F5F5F3]"],
                            ["w-[calc(100%-80px)]", "ml-10"],
                            ["rounded-[20px]", "mb-5"],
                        )}
                    >
                        <div className={twMerge(["max-w-[1280px]", "mx-auto"])}>
                            <p
                                className={twMerge(
                                    ["text-[80px]", "font-medium"],
                                    ["w-full", "mb-5"],
                                )}
                            >
                                Product Information
                            </p>
                            <div className={"border-t border-black"}>
                                <div className={"flex"}>
                                    <div
                                        className={twMerge(
                                            ["flex", "py-10", "w-full"],
                                            ["border-b", "border-[#B2B2B2]"],
                                        )}
                                    >
                                        <dt
                                            className={twMerge(
                                                ["pr-50", "text-lg"],
                                                ["font-medium"],
                                            )}
                                        >
                                            Product Name
                                        </dt>
                                        <dd>{product.productName}</dd>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div>
                <ProductReviewSection productId={product.id} />
            </div>
        </div>
    );
}

export default ProductDetailPage;

interface AccordionProps {
    title: string;
    children: ReactNode;
    defaultOpen?: boolean;
    className?: string;
}

function Accordion({
    title,
    children,
    defaultOpen = false,
    className = "",
}: AccordionProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className={twMerge(["w-full"], className)}>
            <button
                type={"button"}
                className={twMerge(
                    ["w-full", "flex", "justify-between", "items-center"],
                    ["py-4", "transition-all", "px-5"],
                    ["border-b", "border-gray-200"],
                    isOpen ? "bg-[#f2f2f2]" : "bg-transparent",
                )}
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className={twMerge(["font-bold", "text-gray-900"])}>
                    {title}
                </h3>
                <FiChevronDown
                    className={twMerge(
                        ["w-6", "h-6", "transition-transform", "duration-300"],
                        isOpen && "rotate-180",
                    )}
                />
            </button>

            <div
                className={twMerge(
                    ["overflow-hidden", "transition-all", "duration-600"],
                    isOpen ? ["max-h-250"] : "max-h-0",
                )}
            >
                <div
                    className={twMerge(
                        ["pb-4", "pt-2"],
                        ["text-sm", "text-gray-600"],
                    )}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}
