import { twMerge } from "tailwind-merge";
import { useState } from "react";
import img1 from "../../assets/EVENT Page/쿨리타X그라플렉스 러브에디션 런칭 EVENT.png";
import img2 from "../../assets/EVENT Page/CULITA 5월의 선물.png";
import img3 from "../../assets/EVENT Page/쿨리타스 3기 모집.png";
import img4 from "../../assets/EVENT Page/쿨리타스 2기 모집.png";
import img5 from "../../assets/EVENT Page/쿨리타스 1기 모집.png";
import { Link } from "react-router";

interface EventItem {
    title: string;
    image: string;
    path: string;
}

const EVENT_PAGE: EventItem[] = [
    {
        title: "쿨리타X그라플렉스 러브에디션 런칭 EVENT",
        image: img1,
        path: "/products/2",
    },
    { title: "CULITA 5월의 선물", image: img2, path: "/event/event-list1" },
    { title: "쿨리타스 3기 모집", image: img3, path: "/event/event-list2" },
    { title: "쿨리타스 2기 모집", image: img4, path: "/event/event-list3" },
    { title: "쿨리타스 1기 모집", image: img5, path: "/event/event-list4" },
];

const TABS = ["진행", "종료"];

function EventPage() {
    const [activeTab, setActiveTab] = useState("진행");

    return (
        <div className={twMerge(["pt-[170px]", "px-10", "pb-50"])}>
            <header>
                <h1
                    className={twMerge(
                        ["text-[44px]", "font-semibold"],
                        ["text-center"],
                    )}
                >
                    이벤트
                </h1>
                <nav
                    className={twMerge(["flex", "justify-center", "py-[75px]"])}
                >
                    <ul
                        className={twMerge([
                            "flex",
                            "justify-center",
                            "gap-[180px]",
                        ])}
                    >
                        {TABS.map((tab) => (
                            <li
                                key={tab}
                                onClick={() => {
                                    setActiveTab(tab);
                                }}
                                className={twMerge(
                                    ["text-[24px]", "font-bold"],
                                    activeTab === tab
                                        ? ["border-b-2", "border-b-[#FF4600]"]
                                        : ["border-none"],
                                )}
                            >
                                {tab}
                            </li>
                        ))}
                    </ul>
                </nav>

                {activeTab === "진행" ? (
                    <div
                        className={twMerge(
                            ["text-center", "text-lg"],
                            ["text-gray-800"],
                        )}
                    >
                        지금 진행 중인 이벤트가 없습니다.
                    </div>
                ) : (
                    <main className={twMerge(["max-w-[1340px]", "mx-auto"])}>
                        <section className={twMerge(["w-full", "mt-[10px]"])}>
                            <ul
                                className={twMerge(
                                    ["w-[calc(100%+20px)]", "min-w-[756px]"],
                                    ["ml-[-10px]", "flex", "flex-wrap"],
                                )}
                            >
                                {EVENT_PAGE.map((item) => (
                                    <li
                                        key={item.path}
                                        className={twMerge(
                                            ["w-1/2", "overflow-hidden"],
                                            ["px-[10px]", "mb-20"],
                                            ["relative", "align-top"],
                                        )}
                                    >
                                        <Link to={item.path}>
                                            <img
                                                src={item.image}
                                                alt={item.path}
                                                className={twMerge(
                                                    ["hover:opacity-75"],
                                                    ["rounded-[15px]"],
                                                    ["transition-all"],
                                                    ["duration-200"],
                                                    [
                                                        "max-h-[423px]",
                                                        "object-cover",
                                                    ],
                                                    ["max-w-full"],
                                                    ["w-full"],
                                                )}
                                            />
                                            <h2
                                                className={twMerge([
                                                    "pt-[28px]",
                                                    "font-normal",
                                                    "text-[18px]",
                                                ])}
                                            >
                                                {item.title}
                                            </h2>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </main>
                )}
            </header>
        </div>
    );
}
export default EventPage;
