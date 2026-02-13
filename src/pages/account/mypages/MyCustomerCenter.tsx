import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { InquiriesResponse, Inquiry } from "../../../types/Inquiries.ts";
import { getInquiries } from "../../../api/Inquiries.api.ts";
import Spinner from "../../../components/common/Spinner.tsx";
import { twMerge } from "tailwind-merge";

function MyCustomerCenter() {
    const navigate = useNavigate();
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchInquiries = async () => {
        setIsLoading(true);
        try {
            const params = {
                page: 1,
                limit: 10,
            };

            const response = (await getInquiries(params)) as InquiriesResponse;

            if (response && response.data) {
                setInquiries(response.data);
            } else {
                setInquiries(response as unknown as Inquiry[]);
            }
        } catch (error) {
            console.error("문의 로드 실패:", error);
            alert("목록을 불러오는 중 서버 오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchInquiries().then(() => {});
    }, []);

    if (isLoading) return <Spinner full />;

    return (
        <div className="max-w-[1168px] mx-auto px-4">
            {/* 상단 탭 */}
            <div className="flex justify-center border-b border-black pb-4 mb-20">
                <div className="relative">
                    <span className="text-lg font-medium text-black px-10">
                        게시글 {inquiries.length}
                    </span>
                </div>
            </div>

            {inquiries.length === 0 ? (
                <div className="py-10 text-center text-[#999]">
                    문의한 게시글이 없습니다.
                </div>
            ) : (
                <div className="w-full">
                    <table className="w-full text-[13px] border-t border-gray-200">
                        <thead className="bg-[#f9f9f9] border-b border-gray-200">
                            <tr>
                                <th className="py-4 w-[10%]">번호</th>
                                <th className="py-4 w-[15%]">유형</th>
                                <th className="py-4 text-left px-4">제목</th>
                                <th className="py-4 w-[15%]">작성자</th>
                                <th className="py-4 w-[15%]">작성일</th>
                                <th className="py-4 w-[10%]">답변여부</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inquiries.map((item, idx) => (
                                <tr
                                    key={item.id}
                                    className="border-b border-gray-100 text-center hover:bg-gray-50 cursor-pointer"
                                    onClick={() =>
                                        navigate(`/mypage/inquiry/${item.id}`)
                                    }
                                >
                                    <td className="py-5 text-gray-500">
                                        {inquiries.length - idx}
                                    </td>
                                    <td className="py-5">{item.type}</td>
                                    <td className="py-5 text-left px-4 font-medium">
                                        {item.title}
                                    </td>
                                    <td className="py-5 text-gray-600">
                                        이서연
                                    </td>
                                    <td className="py-5 text-gray-400 font-mono">
                                        2026.02.09
                                    </td>
                                    <td className="py-5 text-gray-300">
                                        {item.status === "ANSWERED" ? "O" : "X"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* 작성하기 버튼 */}
            <div className="mt-8 flex justify-end">
                <button
                    onClick={() => navigate("/mypage/inquiry/write")}
                    className={twMerge(
                        ["bg-black", "text-white", "text-xs"],
                        ["px-6", "py-3", "font-bold"],
                        ["hover:bg-[#ff4600]", "transition-colors"],
                    )}
                >
                    상품문의 작성하기
                </button>
            </div>
        </div>
    );
}

export default MyCustomerCenter;
