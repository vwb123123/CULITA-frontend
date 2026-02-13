import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { Inquiry } from "../../../../types/Inquiries.ts";
import {
    deleteInquiry,
    getInquiryById,
} from "../../../../api/Inquiries.api.ts";
import { updateAdminInquiryAnswer } from "../../../../api/admin.inquiries.api.ts"; // 관리자 API
import Spinner from "../../../../components/common/Spinner.tsx";
import useAuthStore from "../../../../store/useAuthStore.ts";

function MyInquiryDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuthStore();

    const [inquiry, setInquiry] = useState<Inquiry | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [isEditMode, setIsEditMode] = useState(false);
    const [answerContent, setAnswerContent] = useState("");

    useEffect(() => {
        const fetchDetail = async () => {
            if (!id) return;
            try {
                const response = await getInquiryById(Number(id));
                if (response && response.data) {
                    setInquiry(response.data);
                    setAnswerContent(response.data.answer || "");
                }
            } catch (error) {
                console.error("상세 조회 실패:", error);
                alert("게시글을 불러올 수 없습니다.");
                navigate("/mypage/customer-center");
            } finally {
                setIsLoading(false);
            }
        };
        fetchDetail();
    }, [id, navigate]);

    const handleDelete = async () => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;
        try {
            await deleteInquiry(Number(id));
            alert("삭제되었습니다.");
            navigate("/mypage/customer-center");
        } catch (error) {
            console.log(error);
            alert("삭제에 실패했습니다. (답변 완료된 글은 삭제 불가)");
        }
    };

    const handleAnswerSubmit = async () => {
        if (!answerContent.trim()) return alert("답변 내용을 입력해주세요.");
        setIsSubmitting(true);
        try {
            await updateAdminInquiryAnswer(Number(id), {
                answer: answerContent,
            });
            alert("답변이 저장되었습니다.");
            setIsEditMode(false);
            window.location.reload();
        } catch (error) {
            console.log(error);
            alert("답변 등록에 실패했습니다.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatDate = (dateString: string | null | undefined) => {
        if (!dateString) return "";
        return dateString.split("T")[0].replace(/-/g, ".");
    };

    if (isLoading) return <Spinner full />;
    if (!inquiry)
        return (
            <div className="text-center py-5">데이터를 찾을 수 없습니다.</div>
        );

    const isAdmin = user?.role === "ADMIN";

    return (
        <div className="max-w-[1168px] mx-auto px-4 py-10 font-pretendard">
            {/* 제목 영역 */}
            <div className="border-t-2 border-black pt-8">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-[24px] font-bold">
                            {inquiry.title}
                        </h2>
                    </div>
                    <div className="text-right text-[13px] text-gray-400">
                        <p className="text-black font-medium mb-1">
                            {user?.name || "작성자"}
                        </p>
                        <p>{formatDate(inquiry.createdAt)}</p>
                    </div>
                </div>
            </div>

            {/* 본문 영역 */}
            <div className="border-t border-gray-100 py-12">
                <div
                    className="prose prose-sm max-w-none min-h-[200px] text-[15px] leading-relaxed"
                    dangerouslySetInnerHTML={{
                        __html: inquiry.content || "<p>내용이 없습니다.</p>",
                    }}
                />

                {inquiry.images && inquiry.images.length > 0 && (
                    <div className="mt-10 flex flex-wrap gap-4">
                        {inquiry.images.map((img) => (
                            <img
                                key={img.id}
                                src={img.url}
                                alt="첨부"
                                className="w-40 h-40 object-cover border border-gray-100 rounded-sm"
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* 답변 영역 */}
            <div
                className={`mt-10 p-8 rounded-sm ${inquiry.answer ? "bg-[#f9f9f9]" : "bg-white border border-dashed border-gray-200"}`}
            >
                <div className="flex items-center gap-2 mb-4">
                    <span
                        className={`w-6 h-6 flex items-center justify-center text-[11px] font-bold rounded-full ${inquiry.answer ? "bg-black text-white" : "bg-gray-200 text-gray-500"}`}
                    >
                        A
                    </span>
                    <span className="font-bold text-[14px]">관리자 답변</span>
                    {isAdmin && inquiry.answer && !isEditMode && (
                        <button
                            onClick={() => setIsEditMode(true)}
                            className="text-[12px] text-blue-500 ml-2 underline"
                        >
                            수정하기
                        </button>
                    )}
                </div>

                {/* 관리자 답변 입력/수정 창 */}
                {isAdmin && (!inquiry.answer || isEditMode) ? (
                    <div className="space-y-4">
                        <textarea
                            value={answerContent}
                            onChange={(e) => setAnswerContent(e.target.value)}
                            className="w-full h-32 p-4 border border-gray-200 outline-none focus:border-black resize-none text-[14px] bg-white"
                            placeholder="답변을 작성해주세요."
                        />
                        <div className="flex justify-end gap-2">
                            {isEditMode && (
                                <button
                                    onClick={() => setIsEditMode(false)}
                                    className="px-4 py-2 text-[13px] border border-gray-200 bg-white"
                                >
                                    취소
                                </button>
                            )}
                            <button
                                onClick={handleAnswerSubmit}
                                disabled={isSubmitting}
                                className="bg-black text-white px-6 py-2 text-[13px] font-bold hover:bg-gray-800 disabled:bg-gray-400"
                            >
                                {isSubmitting ? "저장 중..." : "답변 저장"}
                            </button>
                        </div>
                    </div>
                ) : inquiry.answer ? (
                    <div className="text-[14px] leading-relaxed text-gray-700 whitespace-pre-wrap">
                        {inquiry.answer}
                        <p className="mt-4 text-[11px] text-gray-400 font-mono">
                            {formatDate(inquiry.answeredAt)}
                        </p>
                    </div>
                ) : (
                    <div className="text-[13px] text-gray-400 italic">
                        담당자가 내용을 확인 중입니다.
                    </div>
                )}
            </div>

            {/* 하단 버튼 */}
            <div className="flex justify-center gap-3 mt-16 border-t border-gray-100 pt-10">
                <button
                    onClick={() => navigate("/mypage/customer-center")}
                    className="w-40 py-4 border border-gray-200 text-[13px] hover:bg-gray-50 uppercase"
                >
                    목록으로
                </button>

                {/* 일반 유저: PENDING일 때만 수정/삭제 | 관리자: 언제든 삭제 가능 */}
                {(inquiry.status === "PENDING" || isAdmin) && (
                    <>
                        <button
                            onClick={() =>
                                navigate(`/mypage/inquiry/edit/${id}`)
                            }
                            className="w-40 py-4 border border-gray-200 text-[13px] hover:bg-gray-50 uppercase"
                        >
                            수정
                        </button>
                        <button
                            onClick={handleDelete}
                            className="w-40 py-4 border border-gray-200 text-[13px] text-red-500 hover:bg-red-50 uppercase"
                        >
                            삭제
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default MyInquiryDetail;
