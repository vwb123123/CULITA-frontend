import type { ProductDetail } from "../../types/product.ts";

interface Props {
    product: ProductDetail;
}

function ProductImageGallery({ product }: Props) {
    const detailImages = product.images
        .filter((img) => img.type === "DETAIL")
        .sort((a, b) => a.order - b.order);

    const mainImage = detailImages[0];
    const gridImages = detailImages.slice(1, 5);

    if (detailImages.length === 0) return null;

    return (
        <div className="w-full">
            {/* 1. 메인 이미지 섹션 */}
            <div className="w-full h-full">
                <img src={mainImage?.url || ""} alt="Main product" />
            </div>

            {/* 2. 하단 2x2 그리드 섹션 */}
            <div className="grid grid-cols-2 gap-[10px] mt-[10px]">
                {gridImages.map((img) => (
                    <div key={img.id}>
                        <img
                            src={img.url}
                            alt="Sub product"
                            className="w-full"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
export default ProductImageGallery;
