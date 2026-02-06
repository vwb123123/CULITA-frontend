import drinkImg from "../../assets/SHOP Page/DoNotDrink.png";

function ImageMarquee() {
    return (
        <div className="w-full overflow-hidden">
            <div className="flex flex-nowrap overflow-hidden">
                {/* 첫 번째 이미지 그룹 */}
                <div className="animate-marquee-img flex items-center">
                    <img
                        src={drinkImg}
                        alt="Drink"
                        className="h-[167px] max-w-none px-4"
                    />
                    <img
                        src={drinkImg}
                        alt="Drink"
                        className="h-[167px] max-w-none px-4"
                    />
                    <img
                        src={drinkImg}
                        alt="Drink"
                        className="h-[167px] max-w-none px-4"
                    />
                </div>

                {/* 두 번째 이미지 그룹 */}
                <div className="animate-marquee-img flex items-center">
                    <img
                        src={drinkImg}
                        alt="Drink"
                        className="h-[167px] max-w-none px-4"
                    />
                    <img
                        src={drinkImg}
                        alt="Drink"
                        className="h-[167px] max-w-none px-4"
                    />
                    <img
                        src={drinkImg}
                        alt="Drink"
                        className="h-[167px] max-w-none px-4"
                    />
                </div>
            </div>
        </div>
    );
}

export default ImageMarquee;
