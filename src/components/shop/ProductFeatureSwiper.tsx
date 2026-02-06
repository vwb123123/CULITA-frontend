import slideImg1 from "../../assets/SHOP Page/slide1.jpg";
import slideImg2 from "../../assets/SHOP Page/slide2.jpg";
import slideImg3 from "../../assets/SHOP Page/slide3.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import { Autoplay, Controller } from "swiper/modules";
import "swiper/swiper-bundle.css";
import type { Swiper as SwiperClass } from "swiper/types";

const SLIDE_DATA = [
    {
        id: 1,
        image: slideImg1,
    },
    {
        id: 2,
        image: slideImg2,
    },
    {
        id: 3,
        image: slideImg3,
    },
];

function ProductFeatureSwiper() {
    const [firstSwiper, setFirstSwiper] = useState<SwiperClass | null>(null);
    const [secondSwiper, setSecondSwiper] = useState<SwiperClass | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="relative w-full py-10 flex md:flex-row gap-5">
            {/* [왼쪽 이미지 영역] */}
            <div className="w-full md:w-2/3 rounded-[20px] overflow-hidden relative">
                <Swiper
                    modules={[Autoplay, Controller]}
                    onSwiper={setFirstSwiper}
                    controller={{ control: secondSwiper }}
                    loop={true}
                    speed={1000}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    onSlideChange={(s) => setActiveIndex(s.realIndex)}
                    className="w-full h-full"
                >
                    {SLIDE_DATA.map((slide) => (
                        <SwiperSlide key={`img-${slide.id}`}>
                            <img
                                src={slide.image}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* [오른쪽 텍스트] */}
            <div className="w-[650px] bg-[#EBEAE6] rounded-[20px] flex flex-col items-center overflow-hidden relative">
                <span className="text-lg font-medium underline pt-15 z-20">
                    개발 노트
                </span>

                <div className="flex-1 w-full overflow-hidden">
                    <Swiper
                        modules={[Controller]}
                        onSwiper={setSecondSwiper}
                        controller={{ control: firstSwiper }}
                        loop={true}
                        speed={1000}
                        allowTouchMove={false}
                        className="h-full"
                    >
                        {SLIDE_DATA.map((slide) => (
                            <SwiperSlide
                                key={`text-${slide.id}`}
                                className="flex flex-col justify-center text-center px-15"
                            >
                                <p className="text-[44px] font-semibold leading-[60px] my-16 ">
                                    전문가가 직접 큐레이팅한
                                    <br /> 세련된 맛과 향
                                </p>
                                <p className="text-[15px] leading-[24px] mb-12">
                                    우리는 물방울의 맛까지 깊게 탐구하는 워터
                                    소믈리에와 협업하여
                                    <br /> 세심하면서도 풍부하게 맛과 향을
                                    만들었습니다.
                                    <br />
                                    <br /> 최상의 퀄리티를 가진 프리미엄 가글로
                                    당신에게 어울리는
                                    <br /> 특별하고 품격있는 경험을 제공합니다.
                                </p>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* 고정 페이지네이션 */}
                <div className="flex gap-4 mt-auto mb-10 z-20">
                    {SLIDE_DATA.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => firstSwiper?.slideToLoop(index)}
                            className={`text-xl transition-all ${
                                activeIndex === index
                                    ? "font-bold text-black"
                                    : "text-gray-400"
                            }`}
                        >
                            0{index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default ProductFeatureSwiper;
