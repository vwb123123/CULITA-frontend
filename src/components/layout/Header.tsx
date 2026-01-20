import { Link, useNavigate } from "react-router";
import useCartStore from "../../store/useCartStore.ts";
import useAuthStore from "../../store/useAuthStore.ts"; // 추가
import { twMerge } from "tailwind-merge";
import { IoIosMenu } from "react-icons/io";
import logo from "../../../../mainPage/logo2.png";
import { type MouseEvent, useState } from "react";

interface MenuItem {
    name: string;
    path: string;
    action?: string;
}

const MENU: MenuItem[] = [
    { name: "SHOP", path: "/shop" },
    { name: "BRAND", path: "/brand" },
    { name: "FILM", path: "/film" },
    { name: "EVENT", path: "/event" },
    { name: "GIFT", path: "/gift" },
];

const ACCOUNT_MENU_LOGOUT: MenuItem[] = [
    { name: "로그인", path: "/login" },
    { name: "회원가입", path: "/signup" },
    { name: "주문조회", path: "/check-order" },
    { name: "자주 묻는 질문", path: "/faq" },
];

const ACCOUNT_MENU_LOGIN: MenuItem[] = [
    { name: "마이페이지", path: "/mypage" },
    { name: "자주 묻는 질문", path: "/faq" },
    { name: "로그아웃", path: "#", action: "logout" },
];

function Header() {
    const navigate = useNavigate();

    const { getTotalItems } = useCartStore();
    const { isLoggedIn, logout } = useAuthStore();

    const cartItemsCount = getTotalItems();

    const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
    const [isAccountMenuHovered, setIsAccountMenuHovered] = useState(false);
    const [isHeaderHovered, setIsHeaderHovered] = useState(false);

    const handleLogout = () => {
        const confirm = window.confirm("로그아웃 하시겠습니까?");
        if (confirm) {
            logout();
            setIsAccountMenuHovered(false); // 드롭다운 닫기
            alert("로그아웃 되었습니다.");
            navigate("/");
        }
    };

    const handleMenuClick = (
        item: MenuItem,
        e: MouseEvent<HTMLAnchorElement>,
    ) => {
        if (item.action === "logout") {
            e.preventDefault();
            handleLogout();
        }
    };

    // 로그인 상태에 따라 메뉴 선택
    const ACCOUNT_MENU = isLoggedIn ? ACCOUNT_MENU_LOGIN : ACCOUNT_MENU_LOGOUT;

    return (
        <header
            className={twMerge(
                ["transition-all", "duration-300"],
                isHeaderHovered || isAccountMenuHovered
                    ? "bg-white"
                    : "bg-transparent",
                ["fixed", "top-[30px]", "left-0", "w-full", "z-50"],
            )}
            onMouseEnter={() => setIsHeaderHovered(true)}
            onMouseLeave={() => setIsHeaderHovered(false)}
        >
            <div
                className={twMerge(
                    ["flex", "items-center", "justify-between"],
                    ["h-[70px]", "relative", "pr-[40px]", "pl-[30px]"],
                    [isAccountMenuHovered && "border-b", "border-gray-200"],
                )}
            >
                {/* 헤더 왼쪽 부분 */}
                <div
                    className={twMerge(
                        ["flex", "items-center", "gap-8"],
                        ["relative", "z-30"],
                    )}
                >
                    <div>
                        <button className={twMerge(["lg:hidden", "text-2xl"])}>
                            <IoIosMenu />
                        </button>
                        <Link
                            to={"/"}
                            className={"w-40 flex items-center justify-center"}
                        >
                            <img src={logo} alt={"Logo"} />
                        </Link>
                    </div>
                    {/* menu Items */}
                    <div className={twMerge(["h-[70px]"])}>
                        <nav
                            className={twMerge(
                                ["hidden", "lg:flex", "flex"],
                                ["items-center", "h-full"],
                                ["font-semibold", "gap-8"],
                            )}
                        >
                            {/* 메뉴 구성 */}
                            {MENU.map((menu) => (
                                <div
                                    onMouseEnter={() =>
                                        setHoveredMenu(menu.name)
                                    }
                                    key={menu.name}
                                    className={twMerge(
                                        ["relative", "justify-center"],
                                        ["h-full", "flex", "items-center"],
                                    )}
                                >
                                    <Link
                                        key={menu.name}
                                        to={menu.path}
                                        className={twMerge([
                                            "relative",
                                            "py-5",
                                        ])}
                                    >
                                        {menu.name}
                                    </Link>
                                </div>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* 헤더 오른쪽 부분 */}
                <div className={twMerge(["flex", "items-center", "gap-8"])}>
                    {/* ACCOUNT 부분 */}
                    <div
                        className={twMerge([
                            "relative",
                            "h-[70px]",
                            "flex",
                            "items-center",
                        ])}
                        onMouseEnter={() => setIsAccountMenuHovered(true)}
                        onMouseLeave={() => setIsAccountMenuHovered(false)}
                    >
                        <span
                            className={twMerge(
                                ["cursor-pointer", "font-semibold"],
                                ["z-10"],
                            )}
                        >
                            ACCOUNT
                        </span>
                    </div>

                    {/* 장바구니 부분 */}
                    <div className="h-[70px] flex items-center">
                        <Link
                            to={"/cart"}
                            className="cursor-pointer font-semibold"
                        >
                            CART({cartItemsCount})
                        </Link>
                    </div>
                </div>
            </div>

            {/* ACCOUNT 드롭다운 메뉴 영역 */}
            <div
                className={twMerge(
                    [
                        "overflow-hidden",
                        "transition-all",
                        "duration-300",
                        "bg-white",
                        "z-40",
                    ],
                    isAccountMenuHovered ? "max-h-[200px]" : "max-h-0",
                )}
                onMouseEnter={() => setIsAccountMenuHovered(true)}
                onMouseLeave={() => setIsAccountMenuHovered(false)}
            >
                <div className="pr-[40px] pl-[30px] py-4">
                    <div className="flex justify-end">
                        <div className="w-50">
                            {ACCOUNT_MENU.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    onClick={(e) => handleMenuClick(item, e)}
                                    className={twMerge([
                                        "block",
                                        "px-8",
                                        "py-1",
                                        "text-[13px]",
                                        "hover:font-bold",
                                    ])}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
export default Header;
