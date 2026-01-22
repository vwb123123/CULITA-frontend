import main1 from "../../../../mainPage/Main1.jpg";
import main2 from "../../../../mainPage/Main2.jpg";
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
            </section>
        </>
    );
}
export default MainVisual;
