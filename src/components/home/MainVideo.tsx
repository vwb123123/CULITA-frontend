import mainVideo from "../../assets/mainPage/CULITA_DTC_PC_23s.mp4";
import { twMerge } from "tailwind-merge";

function MainVideo() {
    return (
        <section className={twMerge(["relative", "w-full", "pb-[56.25%]"])}>
            <video
                autoPlay
                loop
                muted
                playsInline
                className={twMerge(
                    ["absolute", "top-0", "left-0"],
                    ["w-full", "h-full"],
                    ["will-change-transform"],
                )}
            >
                <source src={mainVideo} type={"video/mp4"} />
            </video>
        </section>
    );
}
export default MainVideo;
