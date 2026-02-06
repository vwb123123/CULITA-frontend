import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import type { ProductDetail } from "../../types/product.ts";
import { fetchProductDetail } from "../../api/product.api.ts";
import { useParams } from "react-router";
import Spinner from "../common/Spinner.tsx";
import MainVideo from "../../assets/mainPage/CULITA_DTC_PC_23s.mp4";
import AOS from "aos";
import LoveEditionDetailPage from "./LoveEditionDetailPage.tsx";

function GiftSetDetailPage() {
    const [product, setProduct] = useState<ProductDetail | null>(null);
    const { id } = useParams();

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchProductDetail(Number(id));
                setProduct(result);
            } catch (e) {
                console.error(e);
            }
        };
        fetchData().then(() => {});
    }, [id]);

    if (!product) {
        return <Spinner full />;
    }

    const loveEdition = product.productName === "쿨리타 러브 에디션 마우스워시";

    return (
        <>
            {loveEdition ? (
                <LoveEditionDetailPage />
            ) : (
                <div className={twMerge(["flex", "flex-col", "mt-40"])}>
                    <div>
                        <p
                            className={twMerge(
                                ["text-4xl", "font-semibold"],
                                ["tracking-[-1.08px]", "text-center"],
                            )}
                        >
                            {product?.productName} 프리미엄 기프트 세트
                        </p>
                        <p
                            className={twMerge(
                                ["text-lg", "leading-[1.56]", "mt-[34px]"],
                                ["text-center", "tracking-[-0.36px]", "mb-15"],
                            )}
                        >
                            소중한 사람에게 선물하는 특별한 리추얼
                            <br />
                            쿨리타 가글 선물 세트로 마음을 전달하세요.
                        </p>
                    </div>
                    <div className={"flex flex-col"}>
                        {product.images && product.images.length > 7 ? (
                            <img
                                src={product.images[7].url}
                                alt={product.name}
                                className="w-full h-auto max-h-[1180px]"
                            />
                        ) : (
                            <p>
                                이미지가 존재하지 않거나 경로가 잘못되었습니다.
                            </p>
                        )}
                        <div
                            className={twMerge(
                                ["w-full", "h-[1030px]", "bg-[#f0eade]"],
                                ["flex", "justify-center", "items-center"],
                            )}
                        >
                            <img
                                src={product.images[8].url}
                                alt="product-gift-set"
                            />
                        </div>
                    </div>
                    <div
                        className={twMerge(
                            ["my-45", "mx-auto", "text-center"],
                            ["w-[1080px]"],
                        )}
                    >
                        <p
                            className={twMerge(
                                ["text-4xl", "font-semibold"],
                                ["tracking-[-1.08px]"],
                            )}
                        >
                            일상의 반복되는 경험을 새로운 즐거움으로
                        </p>
                        <p
                            className={twMerge(
                                ["text-lg", "leading-[1.56]", "mx-auto"],
                                ["tracking-[-0.36px]", "mt-8", "mb-15"],
                            )}
                        >
                            쿨리타는 오랄 케어를 넘어, 평범한 일상을
                            <br />
                            특별하게 변화시키는 새로운 라이프스타일을
                            제안합니다.
                        </p>
                        <div className={"pt-[56.25%] relative"}>
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                className={twMerge(
                                    ["absolute", "top-0", "left-0"],
                                    ["w-full", "h-full"],
                                    ["will-change-transform"],
                                )}
                            >
                                <source src={MainVideo} type={"video/mp4"} />
                            </video>
                        </div>
                    </div>
                    <div
                        className={twMerge([
                            "w-full",
                            "h-auto",
                            "object-cover",
                        ])}
                    >
                        <img src={product.images[9].url} alt="gift-set-Main" />
                    </div>
                    <div className={twMerge(["mt-50", "relative"])}>
                        <p
                            data-aos="fade-up"
                            data-aos-delay="300"
                            className={twMerge(
                                ["text-center", "text-3xl"],
                                ["mt-4", "block", "font-medium"],
                            )}
                        >
                            {product.productName} 선물세트
                        </p>
                        <div
                            data-aos="fade-up"
                            data-aos-delay="300"
                            className={twMerge(
                                ["relative", "flex", "items-center"],
                                ["justify-center", "w-[1400px]"],
                                ["py-20", "px-6", "mt-[90px]", "mx-auto"],
                            )}
                        >
                            <img
                                src={product.images[10].url}
                                alt="gift-set"
                                className={twMerge(["w-[516px]"])}
                            />
                            <div className={"left-0 top-0 absolute"}>
                                <p
                                    className={twMerge([
                                        "text-[44px]",
                                        "font-semibold",
                                    ])}
                                >
                                    특별한 향기로
                                    <br /> 시작하는 당신의 일상
                                </p>
                                <span
                                    className={twMerge(
                                        ["text-[15px]", "leading-[24px]"],
                                        ["block", "mt-5"],
                                    )}
                                >
                                    쿨리타의 세련된 향기로 하루를 시작해보세요.
                                    아침 일과를
                                    <br />
                                    더욱 특별하게 만들어 주며 마음의 여유를
                                    가져다 줍니다.
                                    <br />
                                    기분 좋은 향기가 당신의 하루를 돋보이게 만들
                                    것입니다.
                                </span>
                            </div>
                            <div className={"left-0 bottom-0 absolute"}>
                                <p
                                    className={twMerge([
                                        "text-[44px]",
                                        "font-semibold",
                                    ])}
                                >
                                    행복한 순간을
                                    <br /> 만들기 위한 최상의 선택
                                </p>
                                <span
                                    className={twMerge(
                                        ["text-[15px]", "leading-[24px]"],
                                        ["block", "mt-5"],
                                    )}
                                >
                                    쿨리타에게 마우스워시는 단순한 생활 용품이
                                    아닌 특별한 순간을
                                    <br />
                                    더욱 빛내 줄 완벽한 파트너입니다. 우리는
                                    우아함과 감동을 추구하는
                                    <br />
                                    사람들에게 완벽한 선물이 될 것입니다.
                                </span>
                            </div>
                            <div className={"ml-240 top-1/2 absolute"}>
                                <p
                                    className={twMerge([
                                        "text-[44px]",
                                        "font-semibold",
                                    ])}
                                >
                                    소믈리에가 엄선한
                                    <br /> 최적의 맛과 향
                                </p>
                                <p
                                    className={twMerge(
                                        ["text-[15px]", "leading-[24px]"],
                                        ["block", "mt-5"],
                                    )}
                                >
                                    쿨리타 마우스워시는 워터 소믈리에의 세심한
                                    테이스팅을 통해 최상의
                                    <br />
                                    맛과 품질을 구현합니다. 균형잡힌 저알코올
                                    함량으로 부드러운 사용감
                                    <br />과 은은한 향이 오랫동안 지속되며 입에
                                    감기는 깊은 맛이 당신을 매료시킬 것입니다
                                </p>
                            </div>
                        </div>
                    </div>
                    <div
                        className={twMerge(
                            ["w-full", "h-auto", "object-cover"],
                            ["mt-45"],
                        )}
                    >
                        <img
                            src={product.images[11].url}
                            alt={"gift-set-banner"}
                        />
                    </div>
                    <div className={"mt-35"}>
                        <p
                            className={twMerge(
                                ["block", "mt-6", "leading-[24px]"],
                                ["text-center", "text-[15px]"],
                            )}
                        >
                            쿨리타는 자신을 사랑하고 돌보는 특별한 시간을
                            선사합니다.
                            <br />
                            쿨리타 한 잔으로 자신을 가꾸고 리프레시하세요.
                        </p>
                        <div
                            className={twMerge(
                                [
                                    "mt-15",
                                    "overflow-hidden",
                                    "flex",
                                    "flex-nowrap",
                                ],
                                ["z-10", "relative", "w-full", "h-full"],
                            )}
                        >
                            <div
                                className={twMerge(
                                    ["flex", "flex-nowrap", "shrink-0"],
                                    "slide-img",
                                )}
                            >
                                {[12, 13, 14, 15].map((idx) => (
                                    <div
                                        key={`orig-${idx}`}
                                        className="ml-2.5 w-[600px] shrink-0"
                                    >
                                        <img
                                            src={product.images[idx].url}
                                            alt="imgSlide"
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                                {[12, 13, 14, 15].map((idx) => (
                                    <div
                                        key={`orig-${idx}`}
                                        className="ml-2.5 w-[600px] shrink-0"
                                    >
                                        <img
                                            src={product.images[idx].url}
                                            alt="imgSlide"
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
export default GiftSetDetailPage;
