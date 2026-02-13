import { useState, useEffect, useRef } from "react";
import { FiChevronUp } from "react-icons/fi";
import { twMerge } from "tailwind-merge";

function TopButton() {
    const [showButton, setShowButton] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const handleShowButton = () => {
            if (window.scrollY > 500) {
                setShowButton(true);
                if (timerRef.current) {
                    clearTimeout(timerRef.current);
                }
                timerRef.current = setTimeout(() => {
                    setShowButton(false);
                }, 5000);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener("scroll", handleShowButton);
        return () => {
            window.removeEventListener("scroll", handleShowButton);
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button
            onClick={scrollToTop}
            className={twMerge([
                "fixed z-50 right-8 bottom-8 transition-all duration-500",
                "w-12 h-12 rounded-full bg-[#ff4600]/70 backdrop-blur-sm",
                "flex items-center justify-center hover:bg-[#ff4600] shadow-md",
                showButton
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-10 pointer-events-none",
            ])}
        >
            <FiChevronUp size={30} className="text-black" />
        </button>
    );
}
export default TopButton;
