import { twMerge } from "tailwind-merge";
import { Link } from "react-router";
import footerLogo from "../../assets/footer/footer_logos.png";
import footerLogo2 from "../../assets/footer/footer_logos.png";

function Footer() {
    return (
        <footer
            className={twMerge(
                ["py-[70px]", "h-auto", "text-center"],
                ["bg-[#ff4600]", "text-[#191919]"],
            )}
        >
            <div className={twMerge(["flex", "justify-center"])}>
                <Link
                    to={"/"}
                    className={twMerge(
                        ["font-medium", "text-xs"],
                        ["mx-5", "relative", "underline"],
                    )}
                >
                    Agreement
                </Link>
                <Link
                    to={"/"}
                    className={twMerge(
                        ["font-medium", "text-xs"],
                        ["mx-5", "relative", "underline"],
                    )}
                >
                    Privacy policy
                </Link>
                <Link
                    to={"/"}
                    className={twMerge(
                        ["font-medium", "text-xs"],
                        ["mx-5", "relative", "underline"],
                    )}
                >
                    Company
                </Link>
            </div>
            <div className={twMerge(["mt-[47px]"])}>
                <Link
                    to={"/"}
                    className={twMerge([
                        "flex",
                        "justify-center",
                        "items-center",
                    ])}
                >
                    <img
                        src={footerLogo}
                        alt={"footerLogo"}
                        className={twMerge(["max-w-[400px]"])}
                    />
                </Link>
            </div>
            <div className={twMerge(["mt-[70px]"])}>
                <p
                    className={twMerge([
                        "text-xs",
                        "text-center",
                        "mt-7.5",
                        "leading-7",
                    ])}
                >
                    <span>고객센터 : 1833-4202</span>
                    <br />
                    <span>상호명 : </span> 주식회사 에이피크 (A.Peak Co., Ltd.)
                    <br />
                    <span>사업자 등록번호 : </span>723-86-03292 &nbsp;|&nbsp;
                    <span>통신판매업 신고번호: </span>2025-서울강남-01141
                    <br />
                    <span>주소 : </span> 서울특별시 성동구 상원1길 26
                    611호(성수동1가, 서울숲A타워)
                    <br />
                    <span>대표자 : </span> 권영민 &nbsp;|&nbsp;
                    <span>메일 :</span>
                    <a href="mailto:security@apeak.kr">security@apeak.kr</a>
                    <br />
                    <span>제품 공급 문의 : </span> Sales@apeak.kr
                    <br />
                    <span>제휴 협찬 문의 : </span> bm@apeak.kr
                    <br />
                </p>
            </div>
            <div
                className={twMerge([
                    "mt-15",
                    "justify-center",
                    "flex",
                    "items-center",
                ])}
            >
                <img
                    src={footerLogo2}
                    alt={"footerLogo2"}
                    className={twMerge(["w-[378px]"])}
                />
            </div>
            <p className="text-xs mt-10">
                © 2024, CULITA. All rights reserved.
            </p>
        </footer>
    );
}
export default Footer;
