import main1 from "../../assets/mainPage/Main1.jpg";
import main2 from "../../assets/mainPage/Main2.jpg";
import main3 from "../../assets/mainPage/Main3.jpg";
import main4 from "../../assets/mainPage/Main4.jpg";
import { twMerge } from "tailwind-merge";
import { Link } from "react-router";
import { useScrollReveal } from "../../store/useScrollReveal.ts";
import BestProductsSwiper from "./BestProductsSwiper.tsx";

function MainVisual() {
    const { ref, isVisible } = useScrollReveal();

    return (
        <>
            <div className={twMerge(["flex", "w-full"])}>
                <Link to={"/shop"} className={twMerge(["w-1/2"])}>
                    <img
                        src={main1}
                        alt="main1"
                        className={twMerge(
                            ["max-w-full", "object-contain"],
                            ["inline-block", "align-top"],
                        )}
                    />
                </Link>
                <Link to={"/gift"} className={twMerge(["w-1/2"])}>
                    <img src={main2} alt="main2" />
                </Link>
            </div>
            <section className={twMerge(["mt-28", "px-10"])}>
                {/* 메인 텍스트 */}
                <p
                    ref={ref}
                    className={twMerge(
                        ["text-[80px]", "text-center"],
                        ["font-semibold"],
                        ["w-full", "ease-out"],
                        ["transition-all", "duration-600"],
                        ["will-change-transform", "delay-200"],
                        isVisible
                            ? ["opacity-100", "translate-y-0"]
                            : ["opacity-0", "translate-y-[117%]"],
                    )}
                >
                    Find Your Flavor
                </p>

                {/* 서브 텍스트 */}
                <p
                    className={twMerge(
                        ["mt-4", "text-center", "text-sm"],
                        ["transition-all", "duration-700", "delay-200"],
                        isVisible
                            ? ["opacity-100", "translate-y-0"]
                            : ["opacity-0", "-translate-y-[117%]"],
                    )}
                >
                    당신에게 어울리는 라이프스타일 한 잔을 선물하세요.
                </p>
                <BestProductsSwiper />
                <span className={twMerge(["mt-15", "mx-auto", "py-[15px]"])}>
                    <Link
                        to={"/shop"}
                        className={twMerge(
                            ["relative"],
                            ["flex", "justify-center", "items-center"],
                            ["mx-auto", "my-[10px]"],
                            ["h-10", "w-[174px]"],
                            ["rounded-[100px]"],
                            ["font-medium", "text-center", "text-white"],
                            ["text-lg", "z-10"],
                            ["will-change-transform"],
                            ["transition-all", "duration-500", "delay-200"],
                            isVisible
                                ? ["opacity-100", "translate-y-0"]
                                : ["opacity-0", "-translate-y-[117%]"],
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
                </span>
            </section>
            <div className={twMerge(["flex", "w-full", "mt-50"])}>
                <Link to={"/brand"} className={twMerge(["w-1/2"])}>
                    <img src={main3} alt="브랜드 스토리 보러가기" />
                </Link>
                <Link to={"/event/:id"} className={twMerge(["w-1/2"])}>
                    <img src={main4} alt="브랜드 갤러리 보러가기" />
                </Link>
            </div>
        </>
    );
}
export default MainVisual;
