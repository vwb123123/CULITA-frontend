import { twMerge } from "tailwind-merge";
import gallery1 from "../../../assets/FILM Page/일상을 특별하게/august_1-1.png";
import gallery2 from "../../../assets/FILM Page/일상을 특별하게/august_1-2.png";
import gallery3 from "../../../assets/FILM Page/일상을 특별하게/august_2.png";
import gallery4 from "../../../assets/FILM Page/일상을 특별하게/august_3.png";
import gallery5 from "../../../assets/FILM Page/일상을 특별하게/august_4.png";
import gallery6 from "../../../assets/FILM Page/일상을 특별하게/august_5.png";
import gallery7 from "../../../assets/FILM Page/일상을 특별하게/DTC_Brandvisual_5_5.jpg";
import gallery8 from "../../../assets/FILM Page/일상을 특별하게/august_6.png";
import gallery9 from "../../../assets/FILM Page/일상을 특별하게/august_7.png";
import gallery10 from "../../../assets/FILM Page/일상을 특별하게/august_8.png";
import gallery11 from "../../../assets/FILM Page/일상을 특별하게/august_9.png";
import gallery12 from "../../../assets/FILM Page/일상을 특별하게/august_10.png";
import gallery13 from "../../../assets/FILM Page/일상을 특별하게/august_11.png";
import gallery14 from "../../../assets/FILM Page/일상을 특별하게/august_12.png";
import gallery15 from "../../../assets/FILM Page/일상을 특별하게/august_13.png";
import gallery16 from "../../../assets/FILM Page/일상을 특별하게/august_14.png";
import gallery17 from "../../../assets/FILM Page/일상을 특별하게/august_15.png";
import gallery18 from "../../../assets/FILM Page/일상을 특별하게/august_16.png";
import gallery19 from "../../../assets/FILM Page/일상을 특별하게/august_17.png";
import gallery20 from "../../../assets/FILM Page/일상을 특별하게/august_18.png";
import gallery21 from "../../../assets/FILM Page/일상을 특별하게/august_19.png";
import gallery22 from "../../../assets/FILM Page/일상을 특별하게/august_20.png";
import gallery23 from "../../../assets/FILM Page/일상을 특별하게/august_21.png";

import { useNavigate } from "react-router";

interface ImageItem {
    id: number;
    image: string;
}

const IMAGE_LIST: ImageItem[] = [
    { id: 1, image: gallery1 },
    { id: 2, image: gallery2 },
    { id: 3, image: gallery3 },
    { id: 4, image: gallery4 },
    { id: 5, image: gallery5 },
    { id: 6, image: gallery6 },
    { id: 7, image: gallery7 },
    { id: 8, image: gallery8 },
    { id: 9, image: gallery9 },
    { id: 10, image: gallery10 },
    { id: 11, image: gallery11 },
    { id: 12, image: gallery12 },
    { id: 13, image: gallery13 },
    { id: 14, image: gallery14 },
    { id: 15, image: gallery15 },
    { id: 16, image: gallery16 },
    { id: 17, image: gallery17 },
    { id: 18, image: gallery18 },
    { id: 19, image: gallery19 },
    { id: 20, image: gallery20 },
    { id: 21, image: gallery21 },
    { id: 22, image: gallery22 },
    { id: 24, image: gallery23 },
];

function CulitaEveryday() {
    const navigate = useNavigate();

    return (
        <div className={twMerge(["pt-[209px]", "px-10", "pb-[180px]"])}>
            {/* 상단 제목 영역 */}
            <div>
                <h2
                    className={twMerge(
                        ["text-[36px]", "font-medium"],
                        ["text-center", "text-[#111]"],
                    )}
                >
                    일상을 특별하게
                </h2>
                <h2
                    className={twMerge(
                        ["text-center", "text-[15px]"],
                        ["leading-[24px]", "pt-8"],
                    )}
                >
                    쿨리타와 함께한 일상의 특별한 순간들
                </h2>
            </div>

            {/* 본문 이미지 영역 */}
            <div className={twMerge(["py-5", "w-full"])}>
                <div className={twMerge(["text-center"])}>
                    <div
                        className={twMerge(
                            ["flex", "flex-wrap"],
                            ["w-[calc(100%+20px)]"],
                            ["mt-[50px]", "mx-[-10px]"],
                        )}
                    >
                        {IMAGE_LIST.map((item) => (
                            <img
                                key={item.id}
                                src={item.image}
                                alt={`gallery-${item.id}`}
                                className={twMerge(
                                    ["w-[calc(25%-20px)]"],
                                    ["aspect-[1080/1380]"],
                                    ["m-2.5", "max-w-full"],
                                    ["h-auto", "align-top"],
                                )}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* 하단 버튼 영역 */}
            <div className={twMerge(["mt-[50px]", "flex", "justify-center"])}>
                <button
                    onClick={() => navigate(-1)}
                    className={twMerge(
                        ["w-20", "h-10", "text-[15px]"],
                        ["leading-[40px]", "px-4", "text-[#222]"],
                        ["border", "border-[#ddd]"],
                    )}
                >
                    목록
                </button>
            </div>
        </div>
    );
}
export default CulitaEveryday;
