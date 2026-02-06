import { twMerge } from "tailwind-merge";

export interface ProductDetail {
    productName: string;
    volume: string;
    efficacyEffects: string;
    ingredients: string;
    manufacturer: string;
    brandCompany: string;
    precautions: string;
}

interface Props {
    data: ProductDetail;
}

const ProductInfoSection = ({ data }: Props) => {
    // 화면에 노출할 항목 설정
    const infoRows = [
        { label: "Product Name", value: data.productName },
        { label: "Volume", value: data.volume },
        { label: "Efficacy & Effects", value: data.efficacyEffects },
        { label: "Ingredients", value: data.ingredients, isSmall: true },
        { label: "Manufacturer", value: data.manufacturer },
        { label: "Brand Company", value: data.brandCompany },
        { label: "Precautions", value: data.precautions, isSmall: true },
    ];

    return (
        <div
            className={twMerge(
                ["mt-10", "py-30", "px-10", "bg-[#F5F5F3]"],
                ["w-[calc(100%-80px)]", "ml-10", "rounded-[20px]", "mb-5"],
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
                {/* 리스트 시작 */}
                <dl className="border-t border-black">
                    {infoRows.map((row) => (
                        <div
                            key={row.label}
                            className="flex flex-row py-7 border-b border-[#B2B2B2]"
                        >
                            <dt className="w-full md:w-[350px] font-medium text-lg text-black shrink-0">
                                {row.label}
                            </dt>

                            <dd className="flex-1 text-[15px] leading-[24px] mt-4 md:mt-0">
                                {row.label === "Efficacy & Effects" ? (
                                    row.value
                                        .split("-")
                                        .map((item) => item.trim())
                                        .filter((item) => item !== "")
                                        .map((text, index) => (
                                            <p
                                                key={index}
                                                className={
                                                    index > 0 ? "mt-1" : ""
                                                }
                                            >
                                                - {text}
                                            </p>
                                        ))
                                ) : (
                                    <span className="whitespace-pre-wrap">
                                        {row.value || "-"}
                                    </span>
                                )}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    );
};

export default ProductInfoSection;
