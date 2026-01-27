import { twMerge } from "tailwind-merge";
import gallery1 from "../../../assets/FILM Page/쿨리타스 1기를 소개합니다/쿨리타스 1기를 소개합니다.png";
import gallery2 from "../../../assets/FILM Page/쿨리타스 1기를 소개합니다/12.png";
import gallery3 from "../../../assets/FILM Page/쿨리타스 1기를 소개합니다/13.png";
import gallery4 from "../../../assets/FILM Page/쿨리타스 1기를 소개합니다/14.png";
import gallery5 from "../../../assets/FILM Page/쿨리타스 1기를 소개합니다/copy-1744263675-1.png";
import gallery6 from "../../../assets/FILM Page/쿨리타스 1기를 소개합니다/25360ad2760e294c786b5880d6d5542f.png";
import gallery7 from "../../../assets/FILM Page/쿨리타스 1기를 소개합니다/copy-1744263684-2.png";
import gallery8 from "../../../assets/FILM Page/쿨리타스 1기를 소개합니다/copy-1744263833-3.png";
import gallery9 from "../../../assets/FILM Page/쿨리타스 1기를 소개합니다/copy-1744263838-4.png";
import gallery10 from "../../../assets/FILM Page/쿨리타스 1기를 소개합니다/copy-1744263842-5.png";
import gallery11 from "../../../assets/FILM Page/쿨리타스 1기를 소개합니다/copy-1744263853-6.png";
import gallery12 from "../../../assets/FILM Page/쿨리타스 1기를 소개합니다/copy-1744263916-7.png";
import gallery13 from "../../../assets/FILM Page/쿨리타스 1기를 소개합니다/copy-1744263929-8.png";
import gallery14 from "../../../assets/FILM Page/쿨리타스 1기를 소개합니다/copy-1744263936-9.png";
import gallery15 from "../../../assets/FILM Page/쿨리타스 1기를 소개합니다/copy-1744263941-10.png";
import gallery16 from "../../../assets/FILM Page/쿨리타스 1기를 소개합니다/copy-1744263945-11.png";
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
];

function CulitaSeason1() {
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
                    쿨리타스 1기를 소개합니다
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

export default CulitaSeason1;
