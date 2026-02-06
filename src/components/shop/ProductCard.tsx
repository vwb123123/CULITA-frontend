import { useState } from "react";
import type { ProductListItem } from "../../types/product";
import { twMerge } from "tailwind-merge";
import { Link } from "react-router";

interface ProductCardProps {
    product: ProductListItem;
}

function ProductCard({ product }: ProductCardProps) {
    const [isHover, setIsHover] = useState(false);

    return (
        <Link to={`/products/${product.id}`}>
            <div
                className="mb-[80px] text-center group cursor-pointer"
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            >
                {/* 이미지 영역 */}
                <div className="relative overflow-hidden rounded-[20px] aspect-[1/1.2]">
                    {product.thumbnail && (
                        <img
                            src={
                                isHover && product.hoverImage
                                    ? product.hoverImage
                                    : product.thumbnail
                            }
                            alt={product.name}
                            className="w-full transition-all duration-300"
                        />
                    )}
                    {/* 뱃지 영역 */}
                    <div className="absolute top-4 left-4 flex flex-col gap-1">
                        {product.isBest && (
                            <span className="bg-[#b3e8bc] text-gray-800 text-xs px-3 py-1 rounded-[5px]">
                                Best
                            </span>
                        )}
                        {product.isNew && (
                            <span className="bg-[#e3c7ff] text-gray-800 text-xs px-3 py-1 rounded-[5px]">
                                New
                            </span>
                        )}
                    </div>
                </div>

                {/* 정보 영역 */}
                <div className="pt-7 text-lg text-left font-medium">
                    <div className={twMerge(["mb-2.5"])}>{product.name}</div>
                    <div className="text-lg">
                        KRW {product.price.toLocaleString()}원
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;
