import { useEffect } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { twMerge } from "tailwind-merge";
import BrandMain1 from "../../assets/BRAND Page/Brand_kv_pc.jpg";
import BrandMainCulita from "../../assets/BRAND Page/logo_w.png";
import BrandMain2 from "../../assets/BRAND Page/brand_1.png";
import BrandSub1 from "../../assets/BRAND Page/Brand_sub01_pc.jpg";
import BrandSub2 from "../../assets/BRAND Page/Brand_sub02_pc.jpg";
import BrandText1 from "../../assets/BRAND Page/brand_txt_1.png";
import BrandSub3 from "../../assets/BRAND Page/Brand_sub03_pc.jpg";
import BrandText2 from "../../assets/BRAND Page/brand_txt_2.png";
import BrandEnd from "../../assets/BRAND Page/Brand_end_pc.jpg";
import BrandText3 from "../../assets/BRAND Page/brand_txt_3.png";
import ScrollReveal from "../../components/common/ScrollReveal.tsx";

function BrandPage() {
    useEffect(() => {
        const scroll = new LocomotiveScroll();

        return () => {
            scroll.destroy();
        };
    }, []);

    return (
        <div className={twMerge(["bg-[#F5F0E6]", "min-w-0"])}>
            {/* 섹션 1: 메인 비주얼 */}
            <section
                className={twMerge(["relative", "w-full", "overflow-hidden"])}
            >
                <img
                    src={BrandMain1}
                    alt="Brand Main"
                    className="w-full h-auto"
                />
                <div
                    className={twMerge(
                        ["flex", "flex-col", "items-center"],
                        ["text-center", "absolute", "h-[calc(100%)]"],
                        ["w-full", "left-0", "top-0"],
                        ["pb-[calc(140/1920*100vw)]"],
                    )}
                    style={{ paddingTop: "calc(760 / 1920 * 100vw)" }}
                    data-scroll
                    data-scroll-speed="1"
                >
                    <ScrollReveal delay={200}>
                        <img
                            src={BrandMainCulita}
                            alt="Logo"
                            className={twMerge(
                                ["mt-0", "opacity-50"],
                                ["w-[calc(760/1920*100vw)]"],
                            )}
                        />
                    </ScrollReveal>
                    <ScrollReveal delay={500}>
                        <img
                            src={BrandMain2}
                            alt="Logo2"
                            className={twMerge(
                                ["opacity-50"],
                                ["w-[calc(760/1920*100vw)]"],
                                ["mt-[calc(1000/1920*100vw)]"],
                            )}
                        />
                    </ScrollReveal>
                </div>
            </section>

            {/* 섹션 2: Vision 섹션 */}
            <section className={twMerge(["flex", "w-full"])}>
                <div className={twMerge(["w-1/2", "relative", "leading-[0]"])}>
                    <img src={BrandSub1} alt="Sub1" className="w-full" />
                    <div
                        className={twMerge(
                            ["absolute", "left-0"],
                            ["bottom-[100px]", "w-full", "text-center"],
                        )}
                    >
                        <ScrollReveal>
                            <img
                                src={BrandText1}
                                alt="Txt1"
                                className="w-[calc(706/1920*100vw)] mx-auto"
                            />
                        </ScrollReveal>
                    </div>
                </div>
                <div
                    className={twMerge(
                        ["w-1/2", "flex", "flex-col"],
                        ["justify-center", "text-[#FF4600]"],
                        [
                            "px-[calc(100/1920*100vw)]",
                            "py-[calc(120/1920*100vw)]",
                        ],
                    )}
                >
                    <ScrollReveal>
                        <p className="text-[calc(44/1920*100vw)] font-semibold">
                            Our Vision
                        </p>
                    </ScrollReveal>
                    <ScrollReveal>
                        <p
                            className={twMerge(
                                ["text-[calc(18/1920*100vw)]", "font-normal"],
                                ["mt-10", "leading-[calc(28/1920*100vw)]"],
                            )}
                        >
                            우리는 당신의 일상을 풍요롭게 하고, 가치 있는
                            라이프스타일을 창조하는 브랜드입니다.
                            <br />
                            쿨리타의 여정은 셀프 케어 그 이상의 가치를
                            지향합니다.
                            <br />
                            우리는 일반적인 리추얼을 넘어, 일상의 모든 순간을
                            특별하게 만드는 비전을 담고 있습니다.
                        </p>
                    </ScrollReveal>
                    <ScrollReveal delay={300}>
                        <p
                            className={twMerge(
                                ["text-[calc(18/1920*100vw)]"],
                                ["font-normal", "mt-[46px]"],
                                ["leading-[calc(21/1920*100vw)]"],
                            )}
                        >
                            We are a brand dedicated to enhancing your daily
                            life and creating a valuable lifestyle.
                            <br />
                            Beginning with oral care, we aspire to offer much
                            more. Our mission is to make
                            <br />
                            every moment of your everyday life extraordinary.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* 섹션 3: Philosophy 섹션 */}
            <section
                data-scroll-section
                className={twMerge(["relative", "w-full", "leading-[0]"])}
            >
                <img src={BrandSub2} alt="Sub2" className="w-full" />
                <div
                    className={twMerge(
                        ["absolute", "left-0", "bottom-[95px]"],
                        ["w-full", "flex"],
                        ["px-[calc(150/1920*100vw)]", "text-white"],
                    )}
                >
                    <div className="mr-[calc(200/1920*100vw)]">
                        <ScrollReveal>
                            <p
                                className={twMerge(
                                    ["text-[calc(44/1920*100vw)]"],
                                    ["font-semibold"],
                                    ["leading-[calc(60/1920*100vw)]"],
                                )}
                            >
                                Brand
                                <br />
                                Philosophy
                            </p>
                        </ScrollReveal>
                    </div>
                    <div className="flex-1">
                        <ScrollReveal delay={300}>
                            <p
                                className={twMerge(
                                    ["text-[calc(18/1920*100vw)]"],
                                    [" leading-[calc(28/1920*100vw)]"],
                                )}
                            >
                                쿨리타는 자신감 넘치고 자신을 소중히 여기는
                                사람들을 위해 존재하며 평범함을 거부하고 개성을
                                존중합니다.
                                <br />
                                우리의 비전은 자신에게 솔직하고 개성적인
                                사람들이 매력적인 존재로 거듭나는 것입니다.
                                쿨리타는 당신의 자아와 개성을 자유롭게 표현하는
                                대담한 도전정신을 지향합니다.
                            </p>
                        </ScrollReveal>
                        <ScrollReveal delay={300}>
                            <p
                                className={twMerge(
                                    ["mt-10"],
                                    ["text-[calc(18/1920*100vw)]"],
                                    [" leading-[calc(28/1920*100vw)]"],
                                )}
                            >
                                Culita is designed for confident individuals who
                                value themselves and reject mediocrity while
                                embracing uniqueness. Our vision is to empower
                                honest and individualistic people to become
                                truly captivating.
                            </p>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* 섹션 4: Savoring 섹션 */}
            <section
                data-scroll-section
                className={twMerge(["flex", "w-full"])}
            >
                <div
                    className={twMerge(
                        ["flex", "w-1/2", " bg-[#F5F0E6]"],
                        ["justify-center", "items-center"],
                    )}
                >
                    <div className="px-[calc(100/1920*100vw)]">
                        <ScrollReveal>
                            <img
                                src={BrandText2}
                                alt="Txt2"
                                className={twMerge(
                                    ["w-[calc(514/1920*100vw)]"],
                                    [" mb-[calc(80/1920*100vw)]"],
                                )}
                            />
                        </ScrollReveal>

                        <div
                            className={twMerge(
                                ["text-[#E93118]", " space-y-8"],
                                [" text-[calc(18/1920*100vw)] "],
                                ["leading-[calc(28/1920*100vw)]"],
                            )}
                        >
                            <ScrollReveal delay={500}>
                                <p>
                                    CULITA는 ‘취하다’ 즉, 삶을 음미하는 동시에
                                    <br />
                                    그것을 온전히 포용한다는 의미의 이중적인
                                    매력을 구현합니다.
                                    <br />
                                    <br />
                                    깊고 풍미 가득한 향과 목 넘김이 따뜻한
                                    위스키를 음미하듯
                                    <br />
                                    평범한 리추얼마저도 특별해지는 상상을
                                    즐겨보세요.
                                    <br />
                                    <br />
                                    자기 관리의 매 순간은 당신의 열정에 대한
                                    축배가 되며, <br />
                                    당신의 소중한 삶을 축하하는 시간이 될
                                    것입니다.
                                </p>
                            </ScrollReveal>
                            <ScrollReveal delay={500}>
                                <p>
                                    Culita embodies a dual charm that
                                    encompasses both ‘savoring’
                                    <br />
                                    and fully embracing life. Enjoy imagining
                                    even the most ordinary rituals
                                    <br />
                                    become extraordinary, much like savoring a
                                    warm whiskey
                                    <br />
                                    with its rich and complex aroma.
                                    <br />
                                    <br />
                                    Each moment of self-care will serve as a
                                    toast to your passions,
                                    <br />
                                    transforming into a celebration of your
                                    cherished life.
                                </p>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 leading-[0]">
                    <img src={BrandSub3} alt="Sub3" className="w-full" />
                </div>
            </section>

            {/* 섹션 5: 엔딩 섹션 */}
            <section
                data-scroll-section
                className={twMerge(["relative", "w-full", "leading-[0]"])}
            >
                <img src={BrandEnd} alt="End" className="w-full" />
                <div
                    className={twMerge(
                        ["absolute", "left-0", "w-full"],
                        ["flex", "flex-col", "items-center"],
                        ["bottom-[calc(600/1920*100vw)]"],
                    )}
                >
                    <ScrollReveal delay={500}>
                        <img
                            src={BrandText3}
                            alt="Txt3"
                            className="h-[calc(204/1920*100vw)] "
                        />
                    </ScrollReveal>
                    <ScrollReveal delay={500}>
                        <svg
                            viewBox="0 0 37.123 44.886"
                            className="w-[37px] h-[45px] text-white fill-current"
                        >
                            <path
                                d="M152.268,22.4c-9.953-.732-17.919-10.361-18.524-22.4h-.076c-.6,12.034-8.571,21.663-18.524,22.4v.093c9.953.732,17.92,10.361,18.524,22.4l.038,0,.038,0c.6-12.034,8.571-21.663,18.524-22.4V22.4"
                                transform="translate(-115.145)"
                            />
                        </svg>
                    </ScrollReveal>
                    <ScrollReveal
                        delay={500}
                        className={twMerge(["flex", "items-center"])}
                    >
                        <span
                            className={twMerge(
                                ["text-[calc(26/1920*100vw)]"],
                                [" text-center", " text-white"],
                                [" leading-[calc(32/1920*100vw)]"],
                                ["mt-[calc(35/1920*100vw)]"],
                            )}
                        >
                            쿨리타와 함께하는 모든 순간이 당신의 열정과
                            <br />
                            소중한 삶에 건배가 되기를 바랍니다.
                        </span>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
}

export default BrandPage;
