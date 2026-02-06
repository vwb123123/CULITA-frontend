import { twMerge } from "tailwind-merge";

interface SpinnerProps {
    className?: string;
    size?: "sm" | "md" | "lg";
    full?: boolean;
}

function Spinner({ className, size = "md", full = false }: SpinnerProps) {
    const sizeClasses = {
        sm: "w-5 h-5 border-2",
        md: "w-8 h-8 border-[3px]",
        lg: "w-12 h-12 border-4",
    };

    const spinner = (
        <div
            className={twMerge(
                ["rounded-full", "animate-spin"],
                ["border-gray-200", "border-t-[#FF4600]"],
                sizeClasses[size],
                className,
            )}
        />
    );

    if (full) {
        return (
            <div
                className={twMerge(
                    ["inset-0", "flex", "z-[9999]"],
                    ["pt-20"],
                    ["items-center", "justify-center"],
                    ["bg-white/30", "backdrop-blur-[2px]"],
                )}
            >
                {spinner}
            </div>
        );
    }

    return spinner;
}

export default Spinner;
