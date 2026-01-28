import { useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";
import img1 from "../../../assets/EVENT Page/CULITA 5월의 선물/key_visual_1.png";
import img2 from "../../../assets/EVENT Page/CULITA 5월의 선물/object.png";
import img3 from "../../../assets/EVENT Page/CULITA 5월의 선물/key_visual_2.png";
import influencer1 from "../../../assets/EVENT Page/CULITA 5월의 선물/influencer_1.png";
import img4 from "../../../assets/EVENT Page/CULITA 5월의 선물/keyvisual_3.png";
import influencer2 from "../../../assets/EVENT Page/CULITA 5월의 선물/influencer2.png";
import img5 from "../../../assets/EVENT Page/CULITA 5월의 선물/keyvisual_4.png";
import influencer3 from "../../../assets/EVENT Page/CULITA 5월의 선물/influencer3.png";
import gift1 from "../../../assets/EVENT Page/CULITA 5월의 선물/gift_1.png";
import gift2 from "../../../assets/EVENT Page/CULITA 5월의 선물/gift_2.png";
import gift3 from "../../../assets/EVENT Page/CULITA 5월의 선물/gift_3.png";

function CulitaSeason3() {
    const navigate = useNavigate();

    return (
        <div
            className={twMerge(
                ["pt-[209px]", "px-10", "pb-[180px]"],
                ["max-w-[860px]", "mx-auto"],
            )}
        >
            {/* 상단 제목 영역 */}
            <div>
                <h2
                    className={twMerge(
                        ["text-[36px]", "font-medium"],
                        ["text-center", "text-[#111]"],
                    )}
                >
                    이벤트
                </h2>
                <p
                    className={twMerge(
                        ["text-center", "text-[16px]"],
                        ["leading-6", "pt-8", "pb-4"],
                        ["border-b", "border-[#d5d5d5]"],
                        ["font-semibold"],
                    )}
                >
                    쿨리타스 3기 모집
                </p>
            </div>

            {/* 본문 이미지 영역 */}
            <div className={twMerge(["mt-4"])}>
                <div>
                    <img src={img1} alt="mainImg" />
                    <div
                        className={twMerge(
                            ["w-full", "h-auto"],
                            ["bg-[#ff4600]"],
                            ["py-15", "px-30"],
                            ["text-center"],
                        )}
                    >
                        <p
                            className={twMerge(
                                ["text-[40px]"],
                                ["font-semibold"],
                            )}
                        >
                            CULITA 5월의 선물
                        </p>
                        <p className={twMerge(["my-6", "leading-[1.8]"])}>
                            설레는 계절, 선물하기 좋은 지금, 망설이고 있다면,
                            여기 주목해보세요
                            <br /> 감각적인 디자인과 향으로 일상을 바꾸는
                            프리미엄 마우스워시 쿨리타가
                            <br /> 5월을 위한 특별한 GIFT IDEA를 제안합니다.
                        </p>
                        <p className={twMerge(["text-lg", "font-semibold"])}>
                            이벤트 기간 : 2025/5/2(금)~2025/5/15(목)
                        </p>
                        <div
                            className={twMerge(
                                ["flex", "justify-center"],
                                ["items-center", "mt-6"],
                            )}
                        >
                            <img
                                src={img2}
                                alt="object"
                                className={twMerge(["w-15", "h-15"])}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <p
                        className={twMerge(
                            ["text-[28px]", "font-semibold"],
                            ["text-center", "my-[24px]"],
                        )}
                    >
                        쿨리타 프리미엄 마우스 워시 레몬러쉬 | LEMON LUSH
                    </p>
                    <div className={"relative"}>
                        <img
                            src={img3}
                            alt="lemonLush"
                            className={twMerge(["w-full"])}
                        />
                        <div
                            className={twMerge(
                                ["absolute", "max-w-[300px]"],
                                ["top-6", "left-6", "text-white"],
                            )}
                        >
                            <img
                                src={influencer1}
                                alt="influencer1"
                                className={twMerge(["w-30", "h-30"])}
                            />
                            <p className={twMerge(["font-medium", "my-2"])}>
                                리빙 인플루언서 Hyemeee | 헴님
                            </p>
                            <p className={twMerge(["text-[12px]"])}>
                                "싱그러운 시트러스 향에 감각적인 디자인으로
                                <br /> 인테리어 효과까지, 색다른 선물로 기억되고
                                싶다면
                                <br /> 쿨리타가 정답이에요."
                            </p>
                        </div>
                    </div>
                    <div
                        className={twMerge(["w-full", "my-12", "text-center"])}
                    >
                        <p className={twMerge(["text-xl", "leading-[1.8]"])}>
                            산뜻한 산도와 은은한 당도가 균형을 이루며, 우아한
                            상쾌함이 느껴지는
                            <br /> 시트러스와 바질향은 지중해 포지타노의
                            아침처럼 맑고 싱그럽습니다.
                            <br /> 상쾌한 응원이 필요한 하루의 시작, 기분 좋은
                            오늘을 선물하세요.
                        </p>
                        <div
                            className={twMerge(
                                ["flex", "w-full"],
                                ["justify-center", "gap-6"],
                            )}
                        >
                            <div
                                className={twMerge(["mt-12", "flex", "gap-2"])}
                            >
                                <strong>TOP</strong>
                                레몬 / 라임
                            </div>
                            <div
                                className={twMerge(["mt-12", "flex", "gap-2"])}
                            >
                                <strong>Middle</strong>
                                청포도 / 아카시아 / 배꽃
                            </div>
                            <div
                                className={twMerge(["mt-12", "flex", "gap-2"])}
                            >
                                <strong>Base</strong>
                                그린 올리브 / 바질
                            </div>
                        </div>
                    </div>
                </div>
                <div className={twMerge(["py-6", "bg-[#f5f5f3]"])}>
                    <p
                        className={twMerge(
                            ["text-[28px]", "font-semibold"],
                            ["text-center", "mb-6"],
                        )}
                    >
                        쿨리타 프리미엄 마우스 워시 에메랄드비치 | EMERALD BEACH
                    </p>
                    <div className={"relative"}>
                        <img
                            src={img4}
                            alt="EMERALD BEACH"
                            className={"w-full"}
                        />{" "}
                        <div
                            className={twMerge(
                                ["absolute", "max-w-[300px]"],
                                ["top-6", "left-6", "text-[#222]"],
                            )}
                        >
                            <img
                                src={influencer2}
                                alt="influencer2"
                                className={twMerge(["w-30", "h-30"])}
                            />
                            <p className={twMerge(["font-medium", "my-2"])}>
                                쿨리타스 1기 지연님
                            </p>
                            <p className={twMerge(["text-[12px]"])}>
                                "블루베리와 라벤더가 어우러진 청량한 향으로
                                <br /> 감각적인 인상을 남기는 에메랄드 비치.
                                <br /> 선물로 받는 순간부터 리추얼이 되는 가글"
                            </p>
                        </div>
                    </div>
                    <div
                        className={twMerge(["w-full", "my-12", "text-center"])}
                    >
                        <p className={twMerge(["text-xl", "leading-[1.8]"])}>
                            은은한 민트 위로 녹색 사과와 블루베리, 흰 꽃의 향이
                            스며듭니다.
                            <br /> 입 안 가득 퍼지는 에메랄드비치의 청량함은
                            오후의 피로를 씻어냅니다.
                            <br /> 하루의 중간, 작은 휴식이 필요한 당신께 한
                            모금의 활력을 선물하세요.
                        </p>
                        <div
                            className={twMerge(
                                ["flex", "w-full"],
                                ["justify-center", "gap-6"],
                            )}
                        >
                            <div
                                className={twMerge(["mt-12", "flex", "gap-2"])}
                            >
                                <strong>TOP</strong>
                                바나나 / 메론
                            </div>
                            <div
                                className={twMerge(["mt-12", "flex", "gap-2"])}
                            >
                                <strong>Middle</strong>
                                청사과 / 블루베리 / 배꽃
                            </div>
                            <div
                                className={twMerge(["mt-12", "flex", "gap-2"])}
                            >
                                <strong>Base</strong>
                                제스트 / 구운 빵 / 라벤더
                            </div>
                        </div>
                    </div>
                </div>
                <div className={twMerge(["py-6"])}>
                    <p
                        className={twMerge(
                            ["text-[28px]", "font-semibold"],
                            ["text-center", "mb-6"],
                        )}
                    >
                        쿨리타 프리미엄 마우스 워시 선셋로맨스 | SUNSET ROMANCE
                    </p>
                    <div className={"relative"}>
                        <img
                            src={img5}
                            alt="SUNSET ROMANCE"
                            className={twMerge(["w-full"])}
                        />
                        <div
                            className={twMerge(
                                ["absolute", "max-w-[300px]"],
                                ["top-6", "left-6", "text-[#222]"],
                            )}
                        >
                            <img
                                src={influencer3}
                                alt="influencer3"
                                className={twMerge(["w-30", "h-30"])}
                            />
                            <p className={twMerge(["font-medium", "my-2"])}>
                                쇼호스트 예본 님
                            </p>
                            <p className={twMerge(["text-[12px]"])}>
                                "딸기와 체리의 달콤함으로 시작해
                                <br /> 민트로 산뜻하게 마무리되는 향,
                                <br /> 예쁜 패키지까지 더해져 하루의 끝을
                                <br /> 감성으로 채우는 선물이 돼요."
                            </p>
                        </div>
                    </div>
                    <div
                        className={twMerge(["w-full", "my-12", "text-center"])}
                    >
                        <p className={twMerge(["text-xl", "leading-[1.8]"])}>
                            해질녘의 따스함을 닮은 시트러스 향이 부드럽게
                            퍼지고,
                            <br /> 딸기, 체리, 자두 등 붉은 과일의 조화가 입 안
                            가득 잔잔한 여운을 남깁니다.
                            <br /> 하루 끝, 사랑하는 당신을 더욱 기분 좋게
                            만들어줄 작지만 특별한 낭만을 건네보세요.
                        </p>
                        <div
                            className={twMerge(
                                ["flex", "w-full"],
                                ["justify-center", "gap-6"],
                            )}
                        >
                            <div
                                className={twMerge(["mt-12", "flex", "gap-2"])}
                            >
                                <strong>TOP</strong>
                                딸기 / 체리
                            </div>
                            <div
                                className={twMerge(["mt-12", "flex", "gap-2"])}
                            >
                                <strong>Middle</strong>
                                자두 / 살구 / 꿀
                            </div>
                            <div
                                className={twMerge(["mt-12", "flex", "gap-2"])}
                            >
                                <strong>Base</strong>
                                오렌지 / 스피아민트 / 타임
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={twMerge(
                        ["py-6", "w-full"],
                        ["bg-[#f5f5f3]", "text-center"],
                    )}
                >
                    <p
                        className={twMerge(
                            ["text-[28px]", "font-semibold"],
                            ["leading-[1.5]", "mb-6"],
                        )}
                    >
                        5월의 선물을 고르는 당신에게,
                        <br /> 그 순간이 더 특별해지도록 쿨리타가 준비했습니다.
                    </p>
                    <div
                        className={twMerge(
                            ["w-full", "flex", "gap-2"],
                            ["justify-center", "items-center"],
                            ["items-start", "px-4", "text-center"],
                        )}
                    >
                        <div
                            className={twMerge(
                                ["flex-1", "h-auto"],
                                ["max-w-[calc((100%-16px)/3)]"],
                                ["flex", "justify-center", "flex-col"],
                            )}
                        >
                            <img
                                src={gift1}
                                alt="gift1"
                                className={twMerge(
                                    ["w-full", "h-auto"],
                                    ["object-contain"],
                                )}
                            />
                            <p
                                className={twMerge(
                                    ["text-xl"],
                                    ["leading-[1.2]", "font-light"],
                                    ["mt-12", "mb-6"],
                                )}
                            >
                                마일리지
                                <br />
                                적립혜택
                            </p>
                            <p
                                className={twMerge(
                                    ["text-[10px]"],
                                    ["font-extralight"],
                                )}
                            >
                                *신규가입시, 3000원 적립
                            </p>
                        </div>
                        <div
                            className={twMerge(
                                ["flex-1", "h-auto"],
                                ["max-w-[calc((100%-16px)/3)]"],
                                ["flex", "justify-center", "flex-col"],
                            )}
                        >
                            <img
                                src={gift2}
                                alt="gift2"
                                className={twMerge(
                                    ["w-full", "h-auto"],
                                    ["object-contain"],
                                )}
                            />
                            <p
                                className={twMerge(
                                    ["text-xl"],
                                    ["leading-[1.2]", "font-light"],
                                    ["mt-12", "mb-6"],
                                )}
                            >
                                5만원 이상 구매 시,
                                <br />
                                CULITA X TWB 페이셜타월 증정
                            </p>
                            <p
                                className={twMerge(
                                    ["text-[10px]"],
                                    ["font-extralight"],
                                )}
                            >
                                *주문번호당 1개 증정
                            </p>
                        </div>
                        <div
                            className={twMerge(
                                ["flex-1", "h-auto"],
                                ["max-w-[calc((100%-16px)/3)]"],
                                ["flex", "justify-center", "flex-col"],
                            )}
                        >
                            <img
                                src={gift3}
                                alt="gift3"
                                className={twMerge(
                                    ["w-full", "h-auto"],
                                    ["object-contain"],
                                )}
                            />
                            <p
                                className={twMerge(
                                    ["text-xl"],
                                    ["leading-[1.2]", "font-light"],
                                    ["mt-12", "mb-6"],
                                )}
                            >
                                쿨리타 베스트 리뷰어 대상
                                <br />
                                쿨리타 본품 증정(10명)
                            </p>
                            <p
                                className={twMerge(
                                    ["text-[10px]"],
                                    ["font-extralight"],
                                )}
                            >
                                * 향 랜덤발송 / ID당 1회 참여 (이벤트 종료후
                                추첨 및 일괄 발송)
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={twMerge(
                    ["w-full", "border-b", "border-[#d5d5d5]"],
                    ["mt-20", "mb-5"],
                )}
            />
            <div className={twMerge(["flex", "justify-center"])}>
                <button
                    onClick={() => navigate(-1)}
                    className={twMerge(
                        ["border", "border-[#ddd]"],
                        ["box-border", "py-2", "px-3"],
                    )}
                >
                    목록보기
                </button>
            </div>
        </div>
    );
}

export default CulitaSeason3;
