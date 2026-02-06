import { twMerge } from "tailwind-merge";
import { type ReactNode, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

function ProductFaQ() {
    return (
        <div
            className={twMerge(
                ["mt-[144px]", "py-30", "px-10", "bg-[#F5F5F3]"],
                ["w-[calc(100%-80px)]", "ml-10", "rounded-[20px]"],
            )}
        >
            <div className={twMerge(["max-w-[1280px]", "mx-auto", "flex"])}>
                <p
                    className={twMerge(
                        ["text-[80px]", "font-medium"],
                        ["w-full", "flex-1"],
                    )}
                >
                    FAQ
                </p>
                <div className={"flex-1"}>
                    <Accordion title={"쿨리타는 언제 사용하면 좋나요?"}>
                        아침 , 점심 , 저녁 양치질 하신 후 1일 3회 사용하시는
                        것을 추천드리지만, 하루 중 리프레쉬 하고 싶은 순간
                        언제든 사용하셔도 좋습니다. 쿨리타 가글은 타사 제품 대비
                        소량의 알코올(5%)이 들어있기 때문에 건조함 없이 사용하실
                        수 있으시지만, 혹 사용하시다가 건조함이 느껴지신다면,
                        하루 2회정도로만 사용을 줄여주시고 사용해주시면 좋을 것
                        같습니다. <br />
                        편안하게 목을 뒤로 젖혀서 ＇아~＇소리를 내시면서 30초간
                        가글을 해주시면 편도 안쪽 깊숙히 가글이 되어 보다
                        효과적으로 사용하실 수 있습니다. 즐거운 가글 되시기
                        바랍니다.
                    </Accordion>
                    <Accordion title={"임산부/어린이가 사용해도 되나요?"}>
                        에탄올 함유량이 5% 들어있어 임산부 및 수유부
                        고객님들께서도 사용이 가능하며, 이 5%는 미생물의 발생을
                        방지하기 위한 최소한의 함유량입니다! <br />
                        어린이도 사용가능하나, 사용 시에는 보호자의 지도하에
                        사용하는 것을 적극 권장드립니다.
                    </Accordion>
                    <Accordion title={"양치 후 바로 가글 해도 되나요?"}>
                        일반적으로 시중에서 볼 수있는 가글에는 치약성분과 만나면
                        치아착색을 유발하는 성분이 들어있어 양치 후 30분 혹은
                        가글 후 30분 뒤 양치를 하는 것을 권장드리지만, 저희
                        쿨리타에는 치아착색을 유발하는 성분(CPC)이 들어있지 않아
                        양치 직후 바로 사용하셔도 무방합니다.
                    </Accordion>
                    <Accordion title={"치아에 착색될 걱정은 없나요?"}>
                        없습니다! 색상이 있는 가글이지만 인체에 전혀 영향이
                        없고, 색소 착색의 우려가 없는 미량만 함유되어 있습니다.
                        CPC 성분* 역시 없기 때문에 치아 착색의 걱정 없이
                        사용하셔도 됩니다.
                        <br /> *CPC : 치아착색유발물질
                    </Accordion>
                    <Accordion title={"혹시 삼켰을 경우 어떻게 해야하나요?"}>
                        일반적으로 가글을 삼켰다고 해서 심각한 문제가 발생하지는
                        않지만, 만약 가글에 알레르기 반응이 나타나거나 심한
                        통증이 발생된다면 의료 조치가 필요할 수 있습니다.
                        <br /> <br /> 단, 소아(6세 이하)의 경우 다량으로 가글을
                        삼킨경우에는 문제가 될 수 있기에 만 6세 이하의 어린이가
                        사용시 보호자 지도하에 사용을 해야하며, 많은 양을 삼켰을
                        경우 즉시 의사 또는 치과의사와 상의할 것으로 안내하고
                        있습니다.
                        <br />
                        <br />
                        아무리 맛있어도 마시지 않고, 맛과 향을 즐기시고
                        뱉으시기를 바립니다.
                    </Accordion>
                    <Accordion
                        title={
                            "패키지 접힘 부분에 하얗게 보이는 현상은 무엇인가요?"
                        }
                    >
                        쿨리타 패키지는 FSC 인증을 받아 사회적·환경적 책임을
                        준수하고 있습니다. 또한 식물성 유분을 사용해 생분해성이
                        우수하며, 환경과 건강에 안전한 SOI INK 인증을 받은
                        제품입니다.
                        <br /> 패키지 접히는 부분 등의 하얀 마모상태는 재질의
                        특성상 자연스러운 현상이고,제품에는 문제가 없음을 알려
                        드립니다.
                    </Accordion>
                    <Accordion title={"교환/반품 안내"}>
                        <span>
                            <strong>교환 및 반품이 가능한 경우</strong>
                        </span>
                        <br />
                        <br />
                        <span>
                            - 상품을 공급 받으신 날로부터 7일이내 단, 제품의
                            포장을 개봉하였거나 포장이 훼손되어 상품가치가
                            상실된 경우에는 교환/반품이 불가능합니다.
                        </span>
                        <br />
                        <span>
                            - 공급받으신 상품 및 용역의 내용이 표시. 광고 내용과
                            다르게 이행된 경우에는 공급받은 날로부터 3월이내, 그
                            사실을 알게 된 날로부터 30일이내.
                        </span>
                        <br />
                        <br />
                        <span>
                            <strong>교환 및 반품이 불가능한 경우</strong>
                        </span>
                        <br />
                        <br />
                        <span>
                            - 포장을 개봉하였거나 포장이 훼손되어 상품가치가
                            상실된 경우.
                        </span>
                        <br />

                        <span>
                            - 고객님의 책임 있는 사유로 상품등이 멸실 또는
                            훼손된 경우.
                        </span>
                        <br />

                        <span>
                            - 고객님의 사용 또는 일부 소비에 의하여 상품의
                            가치가 현저히 감소한 경우.
                        </span>
                        <br />
                        <br />
                        <span>
                            <strong>
                                교환/반품 배송비는 동봉이 불가하며 배송비 입금
                                혹은 환불금액에서 배송비 차감으로 진행됩니다.
                            </strong>
                        </span>
                        <br />
                        <br />

                        <span>
                            - 고객 변심 및 사유의 경우 :교환 왕복 배송비 6,000원
                            , 반품 회수 비 3,000원
                        </span>

                        <span>- 상품 불량 및 오배송 사유 : 배송비 없음</span>
                    </Accordion>
                </div>
            </div>
        </div>
    );
}
export default ProductFaQ;

interface AccordionProps {
    title: string;
    children: ReactNode;
    defaultOpen?: boolean;
    className?: string;
}

function Accordion({
    title,
    children,
    defaultOpen = false,
    className = "",
}: AccordionProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className={twMerge(["w-full"], className)}>
            <button
                type={"button"}
                className={twMerge(
                    ["w-full", "flex", "justify-between", "items-center"],
                    ["transition-all", "px-5"],
                    ["border-b", "border-gray-200"],
                    isOpen ? "bg-[#f2f2f2]" : "bg-transparent",
                )}
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3
                    className={twMerge(
                        ["font-light", "text-2xl", "py-7.5"],
                        ["leading-[34px]", "h-auto"],
                    )}
                >
                    {title}
                </h3>
                <FiChevronDown
                    className={twMerge(
                        ["w-6", "h-6", "transition-transform", "duration-300"],
                        isOpen && "rotate-180",
                    )}
                />
            </button>

            <div
                className={twMerge(
                    ["overflow-hidden", "transition-all", "duration-600"],
                    isOpen ? ["max-h-250"] : "max-h-0",
                )}
            >
                <div
                    className={twMerge(
                        ["pb-4", "pt-2"],
                        ["text-sm", "leading-[25px]"],
                    )}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}
