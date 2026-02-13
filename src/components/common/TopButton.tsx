import { useState, useEffect } from "react";
import { FiChevronUp } from "react-icons/fi";
import { twMerge } from "tailwind-merge";

function TopButton() {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleShowButton = () => {
            if (window.scrollY > 500) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener("scroll", handleShowButton);
        return () => window.removeEventListener("scroll", handleShowButton);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return showButton ? (
        <button
            onClick={scrollToTop}
            className={twMerge([
                "fixed z-50 right-8 bottom-8 animate-bounce-in",
                "w-12 h-12 rounded-full bg-[#ff4600]/70 backdrop-blur-sm",
                "flex items-center justify-center hover:bg-[#ff4600] transition-all shadow-md",
            ])}
        >
            <FiChevronUp size={30} className="text-black" />
        </button>
    ) : null;
}
export default TopButton;
