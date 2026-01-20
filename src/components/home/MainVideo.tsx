import mainVideo from "../../../../mainPage/CULITA_DTC_PC_23s.mp4";
import { twMerge } from "tailwind-merge";

function MainVideo() {
    return (
        <section className="relative w-full h-screen overflow-hidden">
            <video
                autoPlay
                loop
                muted
                playsInline
                className={twMerge(
                    ["absolute", "top-0", "left-0"],
                    ["w-full", "h-full", "object-cover"],
                    ["will-change-transform"],
                )}
            >
                <source src={mainVideo} type={"video/mp4"} />
            </video>
        </section>
    );
}
export default MainVideo;
