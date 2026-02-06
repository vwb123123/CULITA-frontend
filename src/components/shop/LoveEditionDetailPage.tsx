import { twMerge } from "tailwind-merge";
import logo from "../../assets/SHOP Page/LoveEdition page/logo_pc.png";
import LoveEdition from "../../assets/SHOP Page/LoveEdition page/giftSet_pc.png";
import artist from "../../assets/SHOP Page/LoveEdition page/graflex.png";
import Sunset from "../../assets/SHOP Page/LoveEdition page/sunset romance_web.jpg";
import giftset from "../../assets/SHOP Page/LoveEdition page/packageSet.png";
import MainBanner from "../../assets/SHOP Page/LoveEdition page/banner.jpg";

function LoveEditionDetailPage() {
    return (
        <div className={"relative"}>
            <div
                className={twMerge(
                    ["w-full", "flex"],
                    ["mt-65", "justify-center"],
                )}
            >
                <img
                    src={logo}
                    alt={"logo"}
                    className={twMerge(["w-[780px]", "h-auto"])}
                />
            </div>
            <div
                className={twMerge(
                    ["pt-[55px]", "px-30", "pb-[170px]"],
                    ["relative", "w-full", "z-10"],
                )}
            >
                <div
                    className={twMerge(
                        ["absolute", "inset-0"],
                        ["bg-[#FF6C0030]", "-z-10"],
                    )}
                ></div>
                <img
                    src={LoveEdition}
                    alt="LoveEdition1"
                    className={"w-full"}
                />
                <div
                    className={twMerge(
                        ["absolute", "inset-0", "-z-10"],
                        [
                            "bg-[linear-gradient(to_bottom,white_0%,transparent_55px,transparent_calc(100%-170px),white_100%)]",
                        ],
                    )}
                ></div>
            </div>
            <div>
                <p
                    className={twMerge(
                        ["text-[70px]", "font-semibold"],
                        ["leading-[100%]", "text-center"],
                    )}
                >
                    Artist
                </p>
                <p
                    className={twMerge(
                        ["text-8xl", "font-extrabold"],
                        ["text-center", "leading-[100%]"],
                    )}
                >
                    GRAFFLEX
                </p>
                <div
                    className={twMerge(
                        ["pt-27", "px-[295px]", "pb-[62px]"],
                        ["flex", "justify-center"],
                    )}
                >
                    <img src={artist} alt={"artist"} className={"w-full"} />
                </div>
                <div className={twMerge(["w-[900px]", "mx-auto"])}>
                    <p
                        className={twMerge(
                            ["leading-[43px]", "text-[30px]", "text-center"],
                            ["text-[#4C1B00]"],
                        )}
                    >
                        쿨리타 LOVE EDITION 개발에 참여한 그라플렉스는 아시아,
                        유럽, 미국 등지에서 전시 활동을 펼치고, 다양한 글로벌
                        브랜드와 협업해 온 한국을 대표하는 아티스트입니다. 그는
                        캔버스는 물론 거리 곳곳을 자신만의 색 으로 물들이며,
                        무심코 지나치는 이들에게도 밝고 긍정적인 에너지를 전하는
                        작품 세계로 주목받고 있습니다. 사랑에 빠진 세상이
                        형형색색으로 물드는 감정을 시각화한 LOVE EDITION 협업은,
                        그라플렉스 특유의 감각과 ‘사랑을 향한 건배’라는 쿨리타의
                        메시지가 만나 설레임과 재미를 더하고 있습니다.
                    </p>
                </div>
            </div>
            <div className={twMerge(["mt-45", "w-full"])}>
                <p
                    className={twMerge(
                        ["font-semibold", "text-[70px]"],
                        ["text-center", "leading-[100%]"],
                    )}
                >
                    Flavour
                </p>
                <p
                    className={twMerge(
                        ["font-extrabold", "text-8xl"],
                        ["text-center", "leading-[100%]"],
                    )}
                >
                    Sunset Romance
                </p>
                <div
                    className={twMerge(
                        ["flex", "w-full", "mb-20", "relative"],
                        ["justify-center", "mt-[130px]"],
                    )}
                >
                    <div
                        className={twMerge(
                            ["w-[600px]", "h-[860px]", "relative"],
                            ["z-20", "rounded-[25px]", "mr-[-350px]"],
                            ["shadow-[30px_0px_56.2px_-16px_#E5630063]"],
                        )}
                    >
                        <img
                            src={Sunset}
                            alt={"sunset"}
                            className={twMerge(
                                ["w-full", "h-[860px]"],
                                ["rounded-[25px]", "object-cover"],
                            )}
                        />
                    </div>
                    <div
                        className={twMerge(
                            ["relative", "z-10", "pr-[30px]"],
                            ["my-[50px]", "w-[1000px]", "bg-[#FF6C001A]"],
                            ["flex", "justify-end", "rounded-[50px]"],
                        )}
                    >
                        <div
                            className={twMerge(
                                ["flex", "flex-col"],
                                ["justify-center", "gap-34"],
                            )}
                        >
                            <p
                                className={twMerge(
                                    ["text-3xl", "leading-[43px]"],
                                    ["mr-[50px]", "text-[#4C1B00]"],
                                )}
                            >
                                따스한 석양을 보며 낭만에 물드는 저녁,
                                <br /> 사랑이 무르익는 순간을 표현합니다.
                                <br /> 붉은 과실향의 달콤함이 입 안을 감싸며
                                <br /> 사랑의 포근함을 전합니다. 뒤이어 퍼지는
                                <br /> 시트러스와 스피아민트의 상쾌함은
                                <br /> 서서히 밀려오는 기분 좋은 설렘을
                                남깁니다.
                            </p>
                            <div
                                className={twMerge(
                                    ["mt-[136px]"],
                                    ["flex", "flex-col"],
                                )}
                            >
                                <div className={"flex items-center"}>
                                    <p
                                        className={twMerge(
                                            ["text-3xl", "leading-[43px]"],
                                            ["mr-[50px]", "text-[#4C1B00]"],
                                            ["w-[90px]"],
                                        )}
                                    >
                                        Top
                                    </p>
                                    <div
                                        className={twMerge(
                                            ["flex", "items-center"],
                                            ["bg-[#4C1B00]", "align-middle"],
                                            ["w-0.5", "h-5", "mx-2.5"],
                                        )}
                                    ></div>
                                    <p
                                        className={twMerge(
                                            ["text-3xl", "leading-[43px]"],
                                            ["mr-[50px]", "text-[#4C1B00]"],
                                        )}
                                    >
                                        딸기, 체리
                                    </p>
                                </div>
                                <div className={"flex items-center"}>
                                    <p
                                        className={twMerge(
                                            ["text-3xl", "leading-[43px]"],
                                            ["mr-[50px]", "text-[#4C1B00]"],
                                            ["w-[90px]"],
                                        )}
                                    >
                                        Middle
                                    </p>
                                    <div
                                        className={twMerge(
                                            ["flex", "items-center"],
                                            ["bg-[#4C1B00]", "align-middle"],
                                            ["w-0.5", "h-5", "mx-2.5"],
                                        )}
                                    ></div>
                                    <p
                                        className={twMerge(
                                            ["text-3xl", "leading-[43px]"],
                                            ["mr-[50px]", "text-[#4C1B00]"],
                                        )}
                                    >
                                        자두, 살구, 꿀
                                    </p>
                                </div>
                                <div className={"flex items-center"}>
                                    <p
                                        className={twMerge(
                                            ["text-3xl", "leading-[43px]"],
                                            ["mr-[50px]", "text-[#4C1B00]"],
                                            ["w-[90px]"],
                                        )}
                                    >
                                        Base
                                    </p>
                                    <div
                                        className={twMerge(
                                            ["flex", "items-center"],
                                            ["bg-[#4C1B00]", "align-middle"],
                                            ["w-0.5", "h-5", "mx-2.5"],
                                        )}
                                    ></div>
                                    <p
                                        className={twMerge(
                                            ["text-3xl", "leading-[43px]"],
                                            ["mr-[50px]", "text-[#4C1B00]"],
                                        )}
                                    >
                                        오렌지, 스피아민트, 라임
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"relative mt-50"}>
                <p
                    data-aos="fade-up"
                    data-aos-delay="300"
                    className={twMerge(
                        ["font-medium", "text-8xl"],
                        ["leading-[100%]", "text-center"],
                    )}
                >
                    LOVE Edition Mouthwash
                </p>
                <span
                    data-aos="fade-up"
                    data-aos-delay="300"
                    className={twMerge(
                        ["block", "mt-[14px]", "font-bold"],
                        ["text-[32px]", "leading-[100%]", "text-center"],
                    )}
                >
                    러브 에디션 마우스워시 선물세트
                </span>
                <div
                    data-aos="fade-up"
                    data-aos-delay="100"
                    className={twMerge(
                        ["relative", "flex", "items-center"],
                        ["justify-center", "w-[1400px]"],
                        ["py-20", "px-6", "mt-[90px]", "mx-auto"],
                    )}
                >
                    <img
                        src={giftset}
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
                            쿨리타의 세련된 향기로 하루를 시작해보세요. 아침
                            일과를
                            <br />
                            더욱 특별하게 만들어 주며 마음의 여유를 가져다
                            줍니다.
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
                            쿨리타에게 마우스워시는 단순한 생활 용품이 아닌
                            특별한 순간을
                            <br />
                            더욱 빛내 줄 완벽한 파트너입니다. 우리는 우아함과
                            감동을 추구하는
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
                            맛과 품질을 구현합니다. 균형잡힌 저알코올 함량으로
                            부드러운 사용감
                            <br />과 은은한 향이 오랫동안 지속되며 입에 감기는
                            깊은 맛이 당신을 매료시킬 것입니다
                        </p>
                    </div>
                </div>
            </div>
            <div
                className={twMerge(
                    ["relative", "z-10", "w-full"],
                    ["mt-[165px]", "mx-auto", "mb-45"],
                )}
            >
                <div
                    className={twMerge(
                        ["absolute", "top-[-165px]", "-z-10"],
                        ["bottom-[-180px]", "bg-[#FF6C0030]"],
                        ["inset-x-0"],
                    )}
                ></div>
                <img src={MainBanner} alt={"loveEdition"} />
                <div
                    className={twMerge(
                        ["absolute", "top-[-165px]", "-z-10"],
                        ["bottom-[-180px]", "inset-x-0"],
                        [
                            "bg-[linear-gradient(to_bottom,white_0%,transparent_55px,transparent_calc(100%-170px),white_100%)]",
                        ],
                    )}
                ></div>
            </div>
        </div>
    );
}

export default LoveEditionDetailPage;
