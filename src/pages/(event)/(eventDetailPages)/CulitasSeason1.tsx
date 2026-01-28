import { useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";
import img1 from "../../../assets/EVENT Page/쿨리타스 1기 모집copy.jpg";

function CulitasSeason1() {
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
                    쿨리타스 1기 모집
                </p>
            </div>

            {/* 본문 이미지 영역 */}
            <div className={twMerge(["mt-4"])}>
                <img src={img1} alt="img1" />
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
export default CulitasSeason1;
