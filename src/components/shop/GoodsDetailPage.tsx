import { useEffect, useState } from "react";
import type { ProductDetail } from "../../types/product.ts";
import { useParams } from "react-router";
import { fetchProductDetail } from "../../api/product.api.ts";
import Spinner from "../common/Spinner.tsx";
import { twMerge } from "tailwind-merge";
import MainVideo from "../../assets/mainPage/CULITA_DTC_PC_23s.mp4";
import washCupMain from "../../assets/SHOP Page/Washcup/MouthwashMain.jpg";

function GoodsDetailPage() {
    const [product, setProduct] = useState<ProductDetail | null>(null);
    const { id } = useParams();

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

    const washCup = product.productName === "쿨리타 마우스워시 컵";

    return (
        <>
            {washCup ? (
                <div className={"relative"}>
                    <div
                        className={twMerge(
                            ["my-30", "mx-auto", "text-center"],
                            ["w-[1080px]", "mb-45"],
                        )}
                    >
                        <p
                            className={twMerge(
                                ["text-4xl", "font-semibold"],
                                ["tracking-[-1.08px]"],
                            )}
                        >
                            일상의 새로운 리추얼을 경험하세요.
                        </p>
                        <p
                            className={twMerge(
                                ["text-lg", "leading-[1.56]", "mx-auto"],
                                ["tracking-[-0.36px]", "mt-8", "mb-15"],
                            )}
                        >
                            귀찮고 의무적이었던 가글을 즐거운 리추얼로
                            바꿔보세요.
                            <br />
                            소믈리에와 큐레이팅한 풍부한 맛과 향기로운
                            바디감으로,
                            <br />
                            지금까지 느껴보지 못한 상쾌한 마우스워시 경험을
                            선사합니다.
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
                        className={twMerge(
                            ["w-full", "h-auto"],
                            ["max-h-[1180px]", "object-cover"],
                        )}
                    >
                        <img src={washCupMain} alt={"washCupMain"} />
                    </div>
                </div>
            ) : (
                <div className={"relative"}>
                    <img
                        src={product.images[1].url}
                        alt={"goodsImg"}
                        className={twMerge(
                            ["block", "align-top"],
                            ["mx-auto", "text-center"],
                        )}
                    />
                </div>
            )}
        </>
    );
}
export default GoodsDetailPage;
