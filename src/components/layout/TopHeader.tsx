import { twMerge } from "tailwind-merge";
import { Link } from "react-router";

function TopHeader() {
    return (
        <Link
            to={"/shop"}
            className={twMerge(
                ["bg-black", "text-white", "text-center"],
                ["h-[30px]", "text-[11px]", "w-full"],
                ["font-medium", "leading-[30px]", "tracking-wide"],
                ["fixed", "top-0", "left-0", "w-full", "z-50"],
                ["overflow-wrap: break-word"],
            )}
        >
            지금 쿨리타를 만나보세요
        </Link>
    );
}
export default TopHeader;
