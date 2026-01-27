import { twMerge } from "tailwind-merge";
import culita_2 from "../../assets/FILM Page/쿨리타스 2기를 소개합니다/쿨리타스 2기를 소개합니다.png";
import culita_1 from "../../assets/FILM Page/쿨리타스 1기를 소개합니다/쿨리타스 1기를 소개합니다.png";
import CULITA from "../../assets/FILM Page/CULITA X GRAFFLEX X Galleria/CULITA X GRAFFLEX X Galleria.jpg";
import Special from "../../assets/FILM Page/일상을 특별하게/일상을 특별하게.png";
import Cheers from "../../assets/FILM Page/Cheers To ME/Cheers To ME.jpg";
import { Link } from "react-router";

interface FilmItem {
    id: number;
    image: string;
    title: string;
    path: string;
}

const FILM_PAGES: FilmItem[] = [
    {
        id: 1,
        title: "쿨리타스 2기를 소개합니다",
        image: culita_2,
        path: "/film/board_1",
    },
    {
        id: 2,
        title: "CULITA X GRAFFLEX X Galleria",
        image: CULITA,
        path: "/film/board_2",
    },
    {
        id: 3,
        title: "쿨리타스 1기를 소개합니다",
        image: culita_1,
        path: "/film/board_3",
    },
    {
        id: 4,
        title: "일상을 특별하게",
        image: Special,
        path: "/film/board_4",
    },
    {
        id: 5,
        title: "Cheers To ME",
        image: Cheers,
        path: "/film/board_5",
    },
];

function FilmPage() {
    return (
        <div className={twMerge(["px-10", "pt-[125px]", "pb-40"])}>
            <div>
                <div
                    className={twMerge(
                        ["mx-auto", "mt-[65px]", "mb-[60px]"],
                        ["text-center", "pt-0"],
                    )}
                >
                    <h2 className={twMerge(["text-[80px]", "font-medium"])}>
                        CULITAS Film
                    </h2>
                    <p
                        className={twMerge(
                            ["mt-[25px]", "text-[15px]"],
                            ["block", "relative"],
                        )}
                    >
                        쿨리타와 일상을 특별하게 만드는 사람들
                    </p>
                </div>
                <div>
                    <div
                        className={twMerge(
                            ["flex", "flex-wrap", "mt-[-160px]"],
                            ["w-[calc(100%*20px)]", "mx-[-10px]"],
                            ["min-w-[756px]", "leading-0"],
                        )}
                    >
                        {FILM_PAGES.map((page) => (
                            <div
                                key={page.id}
                                className={twMerge(
                                    ["block", "text-[13px]", "text-[#777]"],
                                    ["w-[calc(33.3%-20px)]", "text-center"],
                                    ["mx-[10px]", "mt-40", "mb-0"],
                                    ["leading-[18px]", "align-top"],
                                )}
                            >
                                <Link
                                    to={page.path}
                                    className={twMerge(
                                        ["block", "text-black"],
                                        ["text-lg", "font-normal"],
                                        ["leading-[24px]", "break-keep"],
                                        ["text-center"],
                                    )}
                                >
                                    <img
                                        src={page.image}
                                        alt={page.path}
                                        className={twMerge(
                                            ["w-full", "mx-auto"],
                                            ["mb-[30px]", "h-auto"],
                                            ["block", "hover:opacity-75"],
                                            ["transition-all", "duration-500"],
                                        )}
                                    />
                                    <p
                                        className={twMerge([
                                            "leading-[1.38]",
                                            "font-medium",
                                        ])}
                                    >
                                        {page.title}
                                    </p>
                                    <p
                                        className={twMerge(
                                            ["mt-[21px]"],
                                            ["text-[13px]"],
                                            ["underline"],
                                            ["will-change-transform"],
                                        )}
                                    >
                                        자세히보기
                                    </p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default FilmPage;
