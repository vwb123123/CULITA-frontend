import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { twMerge } from "tailwind-merge";
import "swiper/css";
import "swiper/css/navigation";
import EmeraldGift from "../../../../SHOP Page/EmeraldGift.jpg";
import EmeraldGiftHover from "../../../../SHOP Page/EmeraldGiftHover.jpg";
import LemonGift from "../../../../SHOP Page/LemonGift.jpg";
import LemonGiftHover from "../../../../SHOP Page/LemonGiftHover.jpg";
import LoveEdition from "../../../../SHOP Page/LoveEdition1.jpg";
import LoveEditionHover from "../../../../SHOP Page/LoveEditionHover.jpg";
import Sunset from "../../../../SHOP Page/Sunset RomanceGift.jpg";
import SunsetHover from "../../../../SHOP Page/Sunset RomanceGiftHover.jpg";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useState } from "react";
import { Link } from "react-router";

type Product = {
    id: number;
    image: string;
    imageHover?: string;
    name: string;
    scent: string;
    price: string;
};

const products: Product[] = [
    {
        id: 1,
        image: LoveEdition,
        imageHover: LoveEditionHover,
        name: "쿨리타X그라플렉스 한정판 러브 에디션 마우스워시 500ml + 컵",
        scent: "붉은 과실향의 달콤함이 입 안을 감싸며 사랑의 포근함을 전합니다.",
        price: "KRW 32,000",
    },
    {
        id: 2,
        image: LemonGift,
        imageHover: LemonGiftHover,
        name: "쿨리타 선물세트 레몬러쉬 마우스워시 500ml + 컵",
        scent: "레몬 향, 그린 올리브, 바질향",
        price: "KRW 32,000",
    },
    {
        id: 3,
        image: EmeraldGift,
        imageHover: EmeraldGiftHover,
        name: "쿨리타 선물세트 에메랄드비치 마우스워시 500ml + 컵",
        scent: "바나나, 멜론의 트로피칼 프루츠 향, 블루베리, 라벤더향",
        price: "KRW 32,000",
    },
    {
        id: 4,
        image: Sunset,
        imageHover: SunsetHover,
        name: "쿨리타 선물세트 선셋로맨스 마우스워시 500ml + 컵",
        scent: "딸기, 체리, 자두의 붉은 과실향, 오렌지, 스피아민트향",
        price: "KRW 32,000",
    },
];

function BestProductsSwiper() {
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    return (
        <section className="py-20">
            <Swiper
                modules={[Navigation]}
                navigation={{
                    prevEl: ".custom-prev",
                    nextEl: ".custom-next",
                }}
                loop
                spaceBetween={25}
                slidesPerView={3}
                breakpoints={{
                    0: { slidesPerView: 1.2 },
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
            >
                {products.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div
                            className={twMerge(
                                ["rounded-2xl"],
                                ["p-6"],
                                ["flex", "flex-col", "items-center"],
                                ["transition-transform", "duration-300"],
                                ["hover:-translate-y-1"],
                            )}
                        >
                            {/* 이미지 */}
                            <Link to={"/shop/loveEdition"}>
                                <img
                                    src={
                                        hoveredId === item.id && item.imageHover
                                            ? item.imageHover
                                            : item.image
                                    }
                                    alt={item.name}
                                    onMouseEnter={() => setHoveredId(item.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                    className={twMerge(
                                        ["w-full", "object-contain"],
                                        ["mb-6", "rounded-2xl"],
                                        ["transition-all", "duration-300"],
                                    )}
                                />
                            </Link>

                            {/* 상품명 */}
                            <Link to={"/shop/loveEdition"}>
                                <h3 className="font-semibold text-base text-center">
                                    {item.name}
                                </h3>
                            </Link>

                            {/* 향 설명 */}
                            <p className="text-sm text-gray-500 mt-1 text-center">
                                {item.scent}
                            </p>

                            {/* 가격 */}
                            <p className="mt-3 font-medium">{item.price}</p>
                        </div>
                    </SwiperSlide>
                ))}
                <button
                    className={twMerge([
                        "custom-prev",
                        "absolute z-10 left-4 top-1/2 -translate-y-1/2",
                        "w-12 h-12 rounded-full",
                        "bg-white/70 backdrop-blur",
                        "flex items-center justify-center",
                    ])}
                >
                    <FiChevronLeft size={30} className="text-black" />
                </button>

                <button
                    className={twMerge([
                        "custom-next",
                        "absolute z-10 right-4 top-1/2 -translate-y-1/2",
                        "w-12 h-12 rounded-full",
                        "bg-white/70 backdrop-blur",
                        "flex items-center justify-center",
                    ])}
                >
                    <FiChevronRight size={30} className="text-black" />
                </button>
            </Swiper>
        </section>
    );
}

export default BestProductsSwiper;
