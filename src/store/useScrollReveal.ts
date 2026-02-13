import { useEffect, useRef, useState } from "react";

export function useScrollReveal() {
    const ref = useRef<HTMLParagraphElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.3,
            },
        );

        observer.observe(ref.current);

        return () => observer.disconnect();
    }, []);

    return { ref, isVisible };
}
