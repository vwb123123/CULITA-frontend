import { twMerge } from "tailwind-merge";
import warning from "../../assets/SHOP Page/warning.svg";
import function1 from "../../assets/SHOP Page/function_01.jpg";
import function2 from "../../assets/SHOP Page/function_02.jpg";
import function3 from "../../assets/SHOP Page/function_03.jpg";
import ScrollReveal from "../common/ScrollReveal.tsx";

const ProductEffectStats = () => {
    return (
        <div>
            <div
                className={twMerge(
                    ["rounded-[20px]", "mt-[210px]"],
                    ["mb-10", "px-[10%]"],
                )}
            >
                <ul className="flex justify-between">
                    <li className="text-center w-1/3 flex flex-col">
                        <ScrollReveal delay={300}>
                            <p className="text-[160px] font-semibold flex items-end justify-center">
                                <em className="not-italic">99.9</em>
                                <span className="text-[80px] leading-[115px]">
                                    %
                                </span>
                            </p>
                            <span className="text-[26px] font-medium mt-6 block">
                                입냄새 제거
                            </span>
                            <span className="text-[15px] leading-[24px] mt-4.5">
                                입냄새 원인균까지 99.9% 제거*
                            </span>
                        </ScrollReveal>
                    </li>

                    <li className="text-center w-1/3 flex flex-col">
                        <ScrollReveal delay={300} className={"flex flex-col"}>
                            <p className="text-[160px] font-semibold flex items-end justify-center">
                                <em className="not-italic">59</em>
                                <span className="text-[80px] leading-[115px]">
                                    s
                                </span>
                            </p>
                            <span className="text-[26px] font-medium mt-6">
                                구강세균 살균
                            </span>
                            <span className="text-[15px] leading-[24px] mt-4.5">
                                사용 후 60초,
                                <br />입 속 유해균을 99.99% 살균*
                            </span>
                        </ScrollReveal>
                    </li>

                    <li className="text-center w-1/3 flex flex-col">
                        <ScrollReveal delay={300} className={"flex flex-col"}>
                            <p className="text-[160px] font-semibold flex items-end justify-center">
                                Safe
                            </p>
                            <span className="text-[26px] font-medium mt-6">
                                안심할 수 있는 성분
                            </span>
                            <span className="text-[15px] leading-[24px] mt-4.5">
                                자연유래성분 7종 배합
                                <br />
                                10가지 유해성분 제외
                                <br />
                                치아 착색물질 제외
                            </span>
                        </ScrollReveal>
                    </li>
                </ul>
            </div>
            <div>
                <p
                    className={twMerge(
                        ["text-xs", "leading-[1.62]", "tracking-[-0.26px]"],
                        ["text-center", "text-[#888]", "mb-22"],
                    )}
                >
                    *시험번호: TBK-2022-001759
                </p>
            </div>
            <div
                className={twMerge(
                    ["flex", "flex-col", "text-center"],
                    ["justify-center", "items-center"],
                )}
            >
                <img
                    src={warning}
                    alt={"warning"}
                    className={twMerge(["mb-5"])}
                />
                <p
                    className={twMerge([
                        "text-lg",
                        "leading-[1.62]",
                        "tracking-[-0.26px]",
                    ])}
                >
                    쿨리타는 음료나 술이 아닙니다.
                    <br />
                    기분 좋은 맛을 경험하고, 가글링을 즐기세요.
                </p>
            </div>
            <div className={twMerge(["mt-20", "px-10"])}>
                <ScrollReveal delay={300}>
                    <p
                        className={twMerge(
                            ["text-5xl", "font-medium"],
                            ["mb-15", "text-center"],
                        )}
                    >
                        순한 사용감과 강력한 성능을 위해 설계되었습니다.
                    </p>
                </ScrollReveal>
                <ul className={"flex gap-5"}>
                    <li className={twMerge(["w-full"])}>
                        <ScrollReveal delay={300}>
                            <img src={function1} alt="funtion1" />
                            <p
                                className={twMerge(
                                    ["text-[26px]", "font-medium"],
                                    ["leading-[36px]", "mt-7.5"],
                                )}
                            >
                                부드러운 사용감
                            </p>
                            <span
                                className={twMerge(
                                    ["block", "text-[15px]"],
                                    ["leading-[24px]", "mt-2.5"],
                                )}
                            >
                                상쾌함을 간직한, 부드러운 저알코올 제품입니다.
                                <br />
                                입이 촉촉하게 유지되며 유해균의 증식을
                                방지합니다.
                            </span>
                        </ScrollReveal>
                    </li>
                    <li className={twMerge(["w-full"])}>
                        <ScrollReveal delay={300}>
                            <img src={function2} alt="funtion2" />
                            <p
                                className={twMerge(
                                    ["text-[26px]", "font-medium"],
                                    ["leading-[36px]", "mt-7.5"],
                                )}
                            >
                                안심할 수 있는 성분
                            </p>
                            <span
                                className={twMerge(
                                    ["block", "text-[15px]"],
                                    ["leading-[24px]", "mt-2.5"],
                                )}
                            >
                                자연 유래 성분 7종을 활용하고, 10가지 유해
                                성분을 배제했습니다.
                                <br />
                                치아 착색 유발 물질도 제거하여 안전하게 사용할
                                수 있습니다
                            </span>
                        </ScrollReveal>
                    </li>
                    <li className={twMerge(["w-full"])}>
                        <ScrollReveal delay={300}>
                            <img src={function3} alt="funtion3" />
                            <p
                                className={twMerge(
                                    ["text-[26px]", "font-medium"],
                                    ["leading-[36px]", "mt-7.5"],
                                )}
                            >
                                믿을 수 있는 기술력
                            </p>
                            <span
                                className={twMerge(
                                    ["block", "text-[15px]"],
                                    ["leading-[24px]", "mt-2.5"],
                                )}
                            >
                                20년 경력의 가글 전문가들이 개발한 제품입니다.
                                <br />
                                모든 제조 과정은 국내에서 진행되어 엄격한 품질을
                                유지하고 있습니다
                            </span>
                        </ScrollReveal>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ProductEffectStats;
