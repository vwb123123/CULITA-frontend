import { twMerge } from "tailwind-merge";
import { useScrollReveal } from "../../store/useScrollReveal.ts";
import { motion, type Variants } from "framer-motion";
import mainFilm1 from "../../assets/mainPage/MainFilm.jpg";
import mainFilm2 from "../../assets/mainPage/MainFilm2.jpg";
import mainFilm3 from "../../assets/mainPage/MainFilm3.jpg";
import mainFilm4 from "../../assets/mainPage/MainFilm4.jpg";
import mainFilm5 from "../../assets/mainPage/MainFilm5.jpg";
import mainFilm6 from "../../assets/mainPage/MainFilm6.jpg";
import mainFilm7 from "../../assets/mainPage/MainFilm7.jpg";
import mainFilm8 from "../../assets/mainPage/MainFilm8.jpg";
import mainFilm9 from "../../assets/mainPage/MainFilm9.gif";
import mainFilm10 from "../../assets/mainPage/MainFilm10.jpg";
import mainFilm11 from "../../assets/mainPage/MainFilm11.jpg";
import mainFilm12 from "../../assets/mainPage/MainFilm12.jpg";
import ForCulita from "../../assets/mainPage/for-me-culita.svg";
import { Link } from "react-router";

const FILM_PHOTO = [
    { image: mainFilm1 },
    { image: mainFilm2 },
    { image: mainFilm3 },
    { image: mainFilm4 },
    { image: mainFilm5 },
    { image: mainFilm6 },
    { image: mainFilm7 },
    { image: mainFilm8 },
    { image: mainFilm9 },
    { image: mainFilm10 },
    { image: mainFilm11 },
    { image: mainFilm12 },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
            duration: 0.6,
        },
    },
};

function MainFilm() {
    const { ref, isVisible } = useScrollReveal();

    return (
        <>
            <section>
                <p
                    ref={ref}
                    className={twMerge(
                        ["text-[calc(80/1920*100vw)]"],
                        ["font-medium", "text-center"],
                        ["w-full", "ease-out", "mt-[160px]"],
                        ["transition-all", "duration-600"],
                        ["will-change-transform", "delay-200"],
                        isVisible
                            ? ["opacity-100", "translate-y-0"]
                            : ["opacity-0", "translate-y-[117%]"],
                    )}
                >
                    CULITAS Film
                </p>
                <p
                    className={twMerge(
                        ["text-xs", "mt-[15px]", "text-center"],
                        ["leading-5", "tracking-[0.5px]"],
                        ["w-full", "ease-out", "mt-2"],
                        ["transition-all", "duration-600"],
                        ["will-change-transform", "delay-200"],
                        isVisible
                            ? ["opacity-100", "translate-y-0"]
                            : ["opacity-0", "translate-y-[117%]"],
                    )}
                >
                    쿨리타와 함께하는 시간은 마치 선물 같습니다.
                    <br />
                    일상의 특별한 순간들을 태그해 주세요 <br />
                    “Cheers to me!”와 함께 새로운 나의 일상을 기념해요!
                </p>
                <div className="mt-15 w-full px-4">
                    <motion.ul
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        className={twMerge(
                            ["columns-1", "md:columns-2", "lg:columns-3"],
                            ["gap-6", "max-w-[1920px]"],
                            ["space-y-6", "mx-auto"],
                        )}
                    >
                        {FILM_PHOTO.map((item, index) => (
                            <motion.li
                                key={index}
                                variants={itemVariants}
                                className={twMerge(["break-inside-avoid"])}
                            >
                                <img
                                    src={item.image}
                                    alt={`Film ${index + 1}`}
                                    className={twMerge(
                                        ["rounded-[20px]", " cursor-pointer"],
                                        ["transition-transform"],
                                        ["duration-300", "hover:scale-[1.05]"],
                                    )}
                                />
                            </motion.li>
                        ))}
                    </motion.ul>
                </div>
            </section>
            <div
                className={twMerge(
                    ["items-center", "mt-[180px]"],
                    ["flex", "flex-col", "pb-[160px]"],
                )}
            >
                <img
                    src={ForCulita}
                    alt="ForMeCulita"
                    className={twMerge(
                        ["max-w-full", "object-contain"],
                        ["inline-block"],
                    )}
                />
                <p
                    className={twMerge(
                        ["text-[15px]", "mt-[15px]"],
                        ["tracking-[0.5px]"],
                        ["w-full", "ease-out"],
                        ["text-center", "text-[#ff4600]"],
                        ["transition-all", "duration-600"],
                        ["will-change-transform", "delay-200"],
                        isVisible
                            ? ["opacity-100", "translate-y-0"]
                            : ["opacity-0", "translate-y-[117%]"],
                    )}
                >
                    새로운 일상과 설레는 첫 만남, 쿨리타로 경험해보세요
                </p>
                <span className={twMerge(["mt-15", "py-[15px]"])}>
                    <Link
                        to={"/shop"}
                        className={twMerge(
                            ["relative"],
                            ["flex", "justify-center", "items-center"],
                            ["mx-auto", "my-[10px]"],
                            ["h-10", "w-[174px]"],
                            ["rounded-[100px]"],
                            ["font-medium", "text-center", "text-white"],
                            ["text-lg", "z-10"],
                            ["will-change-transform"],
                            ["transition-all", "duration-500", "delay-200"],
                            isVisible
                                ? ["opacity-100", "translate-y-0"]
                                : ["opacity-0", "-translate-y-[117%]"],
                            ["before:content-['']", "before:absolute"],
                            ["before:inset-0", "before:-z-10"],
                            ["before:bg-[#ff4600e6]", "before:blur-[4px]"],
                            ["before:rounded-[100px]"],
                            [
                                "before:shadow-[0_4px_15px_10px_rgba(255,70,0,0.8)]",
                            ],
                        )}
                    >
                        <span className={twMerge("pt-2")}>경험하기</span>
                    </Link>
                </span>
            </div>
        </>
    );
}
export default MainFilm;
