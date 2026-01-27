import { twMerge } from "tailwind-merge";
import gallery1 from "../../../assets/FILM Page/CULITA X GRAFFLEX X Galleria/CULITA X GRAFFLEX X Galleria.jpg";
import gallery2 from "../../../assets/FILM Page/CULITA X GRAFFLEX X Galleria/graflex_1.png";
import gallery3 from "../../../assets/FILM Page/CULITA X GRAFFLEX X Galleria/graflex_2.png";
import gallery4 from "../../../assets/FILM Page/CULITA X GRAFFLEX X Galleria/graflex_3.png";
import gallery5 from "../../../assets/FILM Page/CULITA X GRAFFLEX X Galleria/graflex_4.png";
import gallery6 from "../../../assets/FILM Page/CULITA X GRAFFLEX X Galleria/graflex_5.png";
import gallery7 from "../../../assets/FILM Page/CULITA X GRAFFLEX X Galleria/쿨리타 3D 영상 1_4x5.mp4";
import gallery8 from "../../../assets/FILM Page/CULITA X GRAFFLEX X Galleria/graflex_7.png";
import gallery9 from "../../../assets/FILM Page/CULITA X GRAFFLEX X Galleria/graflex_8.png";
import gallery10 from "../../../assets/FILM Page/CULITA X GRAFFLEX X Galleria/graflex_9.png";
import gallery11 from "../../../assets/FILM Page/CULITA X GRAFFLEX X Galleria/graflex_10.png";
import gallery12 from "../../../assets/FILM Page/CULITA X GRAFFLEX X Galleria/쿨리타 3D 영상 2_4x5.mp4";
import gallery13 from "../../../assets/FILM Page/CULITA X GRAFFLEX X Galleria/graflex_12.png";
import gallery14 from "../../../assets/FILM Page/CULITA X GRAFFLEX X Galleria/graflex_13.png";
import gallery15 from "../../../assets/FILM Page/CULITA X GRAFFLEX X Galleria/graflex_14.png";
import gallery16 from "../../../assets/FILM Page/CULITA X GRAFFLEX X Galleria/graflex_15.png";
import gallery17 from "../../../assets/FILM Page/CULITA X GRAFFLEX X Galleria/쿨리타 3D 영상 3_4x5.mp4";
import gallery18 from "../../../assets/FILM Page/CULITA X GRAFFLEX X Galleria/graflex_16.png";
import gallery19 from "../../../assets/FILM Page/CULITA X GRAFFLEX X Galleria/graflex_17.png";
import gallery20 from "../../../assets/FILM Page/CULITA X GRAFFLEX X Galleria/graflex_18.png";
import gallery21 from "../../../assets/FILM Page/CULITA X GRAFFLEX X Galleria/graflex_19.png";
import gallery22 from "../../../assets/FILM Page/CULITA X GRAFFLEX X Galleria/graflex_20.png";
import gallery23 from "../../../assets/FILM Page/CULITA X GRAFFLEX X Galleria/graflex_11.png";
import gallery24 from "../../../assets/FILM Page/CULITA X GRAFFLEX X Galleria/graflex_6.png";

import { useNavigate } from "react-router";

interface MediaItem {
    id: number;
    src: string;
    type: "image" | "video";
}

const MEDIA_LIST: MediaItem[] = [
    { id: 1, src: gallery1, type: "image" },
    { id: 2, src: gallery2, type: "image" },
    { id: 3, src: gallery3, type: "image" },
    { id: 4, src: gallery4, type: "image" },
    { id: 5, src: gallery5, type: "image" },
    { id: 6, src: gallery6, type: "image" },
    { id: 7, src: gallery7, type: "video" },
    { id: 8, src: gallery8, type: "image" },
    { id: 9, src: gallery9, type: "image" },
    { id: 10, src: gallery10, type: "image" },
    { id: 11, src: gallery11, type: "image" },
    { id: 12, src: gallery12, type: "video" },
    { id: 13, src: gallery13, type: "image" },
    { id: 14, src: gallery14, type: "image" },
    { id: 15, src: gallery15, type: "image" },
    { id: 16, src: gallery16, type: "image" },
    { id: 17, src: gallery17, type: "video" },
    { id: 18, src: gallery18, type: "image" },
    { id: 19, src: gallery19, type: "image" },
    { id: 20, src: gallery20, type: "image" },
    { id: 21, src: gallery21, type: "image" },
    { id: 22, src: gallery22, type: "image" },
    { id: 23, src: gallery23, type: "image" },
    { id: 24, src: gallery24, type: "image" },
];

function CulitaCollaboration() {
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
                    CULITA X GRAFFLEX X Galleria
                </h2>
                <div className={twMerge(["min-h-auto", "mt-[60px]", "mb-10"])}>
                    <h2
                        className={twMerge(
                            ["text-center", "text-[21px]"],
                            ["my-[15.75px]", "font-bold", "uppercase"],
                        )}
                    >
                        Cheers To Love
                    </h2>
                    <p
                        className={twMerge(
                            ["leading-1.5", "text-sm"],
                            ["text-center"],
                        )}
                    >
                        당신의 감미로운 목소리가 설레임으로 기억되도록,
                        <br />
                        입술에 남은 촉감이 깊은 여운으로 기억되도록,
                        <br />
                        사랑에 빠지는 찰나, 러브 바이브가 되어줄 쿨리타 러브
                        에디션
                        <br />
                        쿨리타 X 그라플렉스 작가 X 갤러리아백화점 콜라보레이션
                        캠페인을 소개합니다.
                        <br />
                    </p>
                </div>
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
                        {MEDIA_LIST.map((item) =>
                            item.type === "video" ? (
                                <video
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    key={item.id}
                                    src={item.src}
                                    className={twMerge(
                                        ["w-[calc(25%-20px)]"],
                                        ["aspect-[1080/1380]"],
                                        ["m-2.5", "max-w-full"],
                                    )}
                                />
                            ) : (
                                <img
                                    key={item.id}
                                    src={item.src}
                                    alt={`gallery-${item.id}`}
                                    className={twMerge(
                                        ["w-[calc(25%-20px)]"],
                                        ["aspect-[1080/1380]"],
                                        ["m-2.5", "max-w-full"],
                                        ["h-auto", "align-top"],
                                    )}
                                />
                            ),
                        )}
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
export default CulitaCollaboration;
