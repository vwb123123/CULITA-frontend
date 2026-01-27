import { twMerge } from "tailwind-merge";
import { Link, useNavigate } from "react-router";
import { useState } from "react";

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
                                className={twMerge([])}
                            >
                                <Link to={"/"}>{tab}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </header>
        </div>
    );
}
export default EventPage;
