import { twMerge } from "tailwind-merge";
import gallery1 from "../../../assets/FILM Page/Cheers To ME/DTC_Brandvisual_1.jpg";
import gallery2 from "../../../assets/FILM Page/Cheers To ME/DTC_Brandvisual_2.jpg";
import gallery3 from "../../../assets/FILM Page/Cheers To ME/DTC_Brandvisual_3.jpg";
import gallery4 from "../../../assets/FILM Page/Cheers To ME/DTC_Brandvisual_4.jpg";
import gallery5 from "../../../assets/FILM Page/Cheers To ME/DTC_Brandvisual_5.jpg";
import gallery6 from "../../../assets/FILM Page/Cheers To ME/DTC_Brandvisual_5_5.jpg";
import gallery7 from "../../../assets/FILM Page/Cheers To ME/DTC_Brandvisual_6.jpg";
import gallery8 from "../../../assets/FILM Page/Cheers To ME/DTC_Brandvisual_7.jpg";
import gallery9 from "../../../assets/FILM Page/Cheers To ME/DTC_Brandvisual_8.jpg";
import gallery10 from "../../../assets/FILM Page/Cheers To ME/DTC_Brandvisual_9.jpg";
import gallery11 from "../../../assets/FILM Page/Cheers To ME/DTC_Brandvisual_10.jpg";
import gallery12 from "../../../assets/FILM Page/Cheers To ME/DTC_Brandvisual_11.jpg";
import gallery13 from "../../../assets/FILM Page/Cheers To ME/DTC_Brandvisual_12.jpg";
import gallery14 from "../../../assets/FILM Page/Cheers To ME/DTC_Brandvisual_13.jpg";
import gallery15 from "../../../assets/FILM Page/Cheers To ME/DTC_Brandvisual_14.jpg";
import gallery16 from "../../../assets/FILM Page/Cheers To ME/DTC_Brandvisual_15.jpg";
import gallery17 from "../../../assets/FILM Page/Cheers To ME/DTC_Brandvisual_16.jpg";
import gallery18 from "../../../assets/FILM Page/Cheers To ME/DTC_Brandvisual_17.jpg";
import gallery19 from "../../../assets/FILM Page/Cheers To ME/DTC_Brandvisual_19.jpg";
import gallery20 from "../../../assets/FILM Page/Cheers To ME/DTC_Brandvisual_20.jpg";
import gallery21 from "../../../assets/FILM Page/Cheers To ME/DTC_Brandvisual_21.jpg";
import gallery22 from "../../../assets/FILM Page/Cheers To ME/DTC_Brandvisual_22.jpg";
import gallery23 from "../../../assets/FILM Page/Cheers To ME/DTC_Brandvisual_23.jpg";
import gallery24 from "../../../assets/FILM Page/Cheers To ME/DTC_Brandvisual_24.jpg";
import gallery25 from "../../../assets/FILM Page/Cheers To ME/DTC_Brandvisual_25.jpg";
import gallery26 from "../../../assets/FILM Page/Cheers To ME/DTC_Brandvisual_26.jpg";
import gallery27 from "../../../assets/FILM Page/Cheers To ME/DTC_Brandvisual_27.jpg";
import gallery28 from "../../../assets/FILM Page/Cheers To ME/DTC_Brandvisual_28.jpg";
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
    { id: 23, image: gallery23 },
    { id: 24, image: gallery24 },
    { id: 25, image: gallery25 },
    { id: 26, image: gallery26 },
    { id: 27, image: gallery27 },
    { id: 28, image: gallery28 },
];

function CheersToMe() {
    {
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
                        Cheers To ME
                    </h2>
                    <p
                        className={twMerge(
                            ["text-center", "text-[15px]"],
                            ["leading-[24px]", "pt-8"],
                        )}
                    >
                        일상을 특별하게 만드는 선물, 쿨리타 런칭
                    </p>
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
                <div
                    className={twMerge(["mt-[50px]", "flex", "justify-center"])}
                >
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
}
export default CheersToMe;
