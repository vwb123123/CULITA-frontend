import type { ReactNode } from "react";
import { useScrollReveal } from "../../store/useScrollReveal.ts";
import { twMerge } from "tailwind-merge";

interface Props {
    children: ReactNode;
    delay?: number;
    className?: string;
}
function ScrollReveal({ children, delay, className }: Props) {
    const { ref, isVisible } = useScrollReveal();
    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${delay}ms` }}
            className={twMerge(
                ["transition-all", "duration-300", "ease-out"],
                isVisible
                    ? ["opacity-100", "translate-y-0"]
                    : ["opacity-0", "translate-y-20"],
                className,
            )}
        >
            {children}
        </div>
    );
}
export default ScrollReveal;
