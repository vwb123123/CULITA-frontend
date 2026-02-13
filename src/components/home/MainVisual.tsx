import main1 from "../../assets/mainPage/Main1.jpg";
import main2 from "../../assets/mainPage/Main2.jpg";
import main3 from "../../assets/mainPage/Main3.jpg";
import main4 from "../../assets/mainPage/Main4.jpg";
import { twMerge } from "tailwind-merge";
import { Link } from "react-router";
import BestProductsSwiper from "./BestProductsSwiper.tsx";
import ScrollReveal from "../common/ScrollReveal.tsx";

function MainVisual() {
    return (
        <>
            <div className={twMerge(["flex", "w-full"])}>
                <Link to={"/products"} className={twMerge(["w-1/2"])}>
                    <img
                        src={main1}
                        alt="main1"
                        className={twMerge(
                            ["max-w-full", "object-contain"],
                            ["inline-block", "align-top"],
                        )}
                    />
                </Link>
                <Link
                    to={"/products?category=gift-set"}
                    className={twMerge(["w-1/2"])}
                >
                    <img src={main2} alt="main2" />
                </Link>
            </div>
            <section className={twMerge(["mt-28", "px-10"])}>
                <ScrollReveal delay={300}>
                    <p
                        className={twMerge(
                            ["text-[80px]", "text-center"],
                            ["font-semibold", "w-full"],
                        )}
                    >
                        Find Your Flavor
                    </p>
                </ScrollReveal>

                <ScrollReveal delay={300}>
                    <p className={twMerge(["mt-4", "text-center", "text-sm"])}>
                        당신에게 어울리는 라이프스타일 한 잔을 선물하세요.
                    </p>
                </ScrollReveal>

                <BestProductsSwiper />

                <span className={twMerge(["mt-15", "mx-auto", "py-[15px]"])}>
                    <ScrollReveal delay={300}>
                        <Link
                            to={"/products"}
                            className={twMerge(
                                ["relative"],
                                ["flex", "justify-center", "items-center"],
                                ["mx-auto", "my-[10px]"],
                                ["h-10", "w-[174px]"],
                                ["rounded-[100px]"],
                                ["font-medium", "text-center", "text-white"],
                                ["text-lg", "z-10"],
                                ["before:content-['']", "before:absolute"],
                                ["before:inset-0", "before:-z-10"],
                                ["before:bg-[#ff4600e6]", "before:blur-[4px]"],
                                ["before:rounded-[100px]"],
                                [
                                    "before:shadow-[0_4px_15px_10px_rgba(255,70,0,0.8)]",
                                ],
                            )}
                        >
                            <span className={"pt-2"}>전체 상품 보기</span>
                        </Link>
                    </ScrollReveal>
                </span>
            </section>
            <div className={twMerge(["flex", "w-full", "mt-50"])}>
                <Link to={"/brand"} className={twMerge(["w-1/2"])}>
                    <img src={main3} alt="브랜드 스토리 보러가기" />
                </Link>
                <Link to={"/film/board_5"} className={twMerge(["w-1/2"])}>
                    <img src={main4} alt="브랜드 갤러리 보러가기" />
                </Link>
            </div>
        </>
    );
}
export default MainVisual;
