import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import {
    getAdminInquiryById,
    updateAdminInquiryAnswer,
} from "../../../api/admin.inquiries.api";
import type { AdminInquiry } from "../../../types/admin.inquiries";
import {
    FiChevronLeft,
    FiUser,
    FiClock,
    FiMessageSquare,
    FiSend,
} from "react-icons/fi";
import { twMerge } from "tailwind-merge";

function AdminInquiryDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const location = useLocation();

    const userName = location.state?.userName || "고객";

    const [inquiry, setInquiry] = useState<AdminInquiry | null>(null);
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const loadDetail = async () => {
            if (!id) return;
            try {
                const res = await getAdminInquiryById(Number(id));
                setInquiry(res.data);
                // 기존 답변이 있다면 상태에 세팅
                setAnswer(res.data.answer || "");
            } catch (error) {
                console.error("상세 정보 로드 실패:", error);
                alert("존재하지 않는 문의이거나 권한이 없습니다.");
                navigate("/admin/inquiries");
            } finally {
                setLoading(false);
            }
        };
        loadDetail();
    }, [id, navigate]);

    const handleSubmitAnswer = async () => {
        if (!answer.trim()) return alert("답변 내용을 입력해주세요.");
        if (!id) return;

        setSubmitting(true);
        try {
            await updateAdminInquiryAnswer(Number(id), { answer });
            alert("답변이 등록되었습니다.");
            setInquiry((prev) =>
                prev ? { ...prev, answer, status: "ANSWERED" } : null,
            );
        } catch (error) {
            console.error("답변 등록 실패:", error);
            alert("답변 등록 중 오류가 발생했습니다.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading)
        return (
            <div className="py-20 text-center text-gray-400">Loading...</div>
        );
    if (!inquiry) return null;

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-20">
            {/* 상단 네비게이션 */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-xl text-gray-500 hover:text-black transition-colors"
            >
                <FiChevronLeft />
            </button>

            {/* 문의 본문 카드 */}
            <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 space-y-6">
                    <div className="flex justify-between items-start">
                        <span
                            className={twMerge(
                                "px-3 py-1 rounded-full text-[11px] font-bold uppercase",
                                inquiry.status === "PENDING"
                                    ? "bg-orange-100 text-[#ff4600]"
                                    : "bg-gray-100 text-gray-500",
                            )}
                        >
                            {inquiry.status === "PENDING"
                                ? "답변 대기"
                                : "답변 완료"}
                        </span>
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                            <span className="flex items-center gap-1">
                                <FiUser /> {userName}
                            </span>
                            <span className="flex items-center gap-1">
                                <FiClock />{" "}
                                {new Date(inquiry.createdAt).toLocaleString()}
                            </span>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900">
                        {inquiry.title}
                    </h2>

                    <div
                        className="bg-gray-50 rounded-2xl p-6 text-gray-700 leading-relaxed whitespace-pre-wrap min-h-[150px]"
                        dangerouslySetInnerHTML={{
                            __html: inquiry.content || "",
                        }}
                    />
                </div>
            </div>

            {/* 답변 입력 영역 */}
            <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-8 space-y-6">
                <div className="flex items-center gap-2 font-bold text-gray-800">
                    <FiMessageSquare className="text-[#ff4600]" />
                    답변 등록
                </div>

                <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="고객님의 문의에 대한 답변을 작성해주세요."
                    className="w-full h-48 p-5 rounded-2xl border border-gray-200 outline-none focus:border-[#ff4600] focus:ring-4 focus:ring-orange-50 transition-all resize-none text-sm leading-relaxed"
                />

                <div className="flex justify-end">
                    <button
                        onClick={handleSubmitAnswer}
                        disabled={submitting}
                        className="flex items-center gap-2 bg-black text-white px-8 py-3.5 rounded-xl font-bold hover:bg-gray-800 transition-all disabled:bg-gray-300"
                    >
                        {submitting ? (
                            "등록 중..."
                        ) : (
                            <>
                                <FiSend />{" "}
                                {inquiry.answer
                                    ? "답변 수정하기"
                                    : "답변 완료하기"}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminInquiryDetail;
