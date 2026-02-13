import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import {
    getAdminInquiries,
    deleteAdminInquiry,
} from "../../../api/admin.inquiries.api";
import type { AdminInquiry } from "../../../types/admin.inquiries";
import {
    FiRefreshCw,
    FiChevronLeft,
    FiChevronRight,
    FiTrash2,
    FiEye,
} from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import * as React from "react";

function AdminInquiryList() {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const [inquiries, setInquiries] = useState<AdminInquiry[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        total: 0,
        totalPages: 0,
        currentPage: 1,
    });

    const page = Number(searchParams.get("page")) || 1;
    const status = searchParams.get("status") || "";

    useEffect(() => {
        const loadInquiries = async () => {
            setLoading(true);
            try {
                const res = await getAdminInquiries({
                    page,
                    limit: 10,
                    status: (status as "PENDING" | "ANSWERED") || undefined,
                });
                setInquiries(res.data);
                setPagination(res.pagination);
            } catch (error) {
                console.error("문의 목록 로드 실패:", error);
            } finally {
                setLoading(false);
            }
        };

        loadInquiries().then(() => {});
    }, [page, status]);

    const handleDelete = async (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        if (!confirm("해당 문의를 삭제하시겠습니까?")) return;
        try {
            await deleteAdminInquiry(id);
            alert("삭제되었습니다.");
        } catch (error) {
            console.log(error);
            alert("삭제에 실패했습니다.");
        }
    };

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", String(newPage));
        setSearchParams(params);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        1:1 문의 관리
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        고객들의 문의 사항을 확인하고 답변을 등록하세요.
                    </p>
                </div>

                <div className="flex gap-3">
                    <select
                        value={status}
                        onChange={(e) =>
                            setSearchParams({
                                status: e.target.value,
                                page: "1",
                            })
                        }
                        className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#ff4600] bg-white"
                    >
                        <option value="">모든 상태</option>
                        <option value="PENDING">답변 대기</option>
                        <option value="ANSWERED">답변 완료</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-xs text-gray-500 uppercase font-semibold">
                            <th className="py-4 px-6">상태</th>
                            <th className="py-4 px-6">문의 제목 / 내용</th>
                            <th className="py-4 px-6">작성자</th>
                            <th className="py-4 px-6">작성일</th>
                            <th className="py-4 px-6 text-right">관리</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-[13px]">
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="py-20 text-center">
                                    <FiRefreshCw className="animate-spin mx-auto text-2xl text-gray-300" />
                                </td>
                            </tr>
                        ) : inquiries.length > 0 ? (
                            inquiries.map((inquiry) => (
                                <tr
                                    key={inquiry.id}
                                    className="hover:bg-orange-50/30 transition-colors cursor-pointer"
                                    onClick={() =>
                                        navigate(
                                            `/admin/inquiries/${inquiry.id}`,
                                            {
                                                state: {
                                                    userName: inquiry.user.name,
                                                },
                                            },
                                        )
                                    }
                                >
                                    {/* 상태 배지 */}
                                    <td className="py-4 px-6">
                                        <span
                                            className={twMerge(
                                                "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase",
                                                inquiry.status === "PENDING"
                                                    ? "bg-orange-100 text-[#ff4600]"
                                                    : "bg-gray-100 text-gray-500",
                                            )}
                                        >
                                            {inquiry.status === "PENDING"
                                                ? "답변 대기"
                                                : "답변 완료"}
                                        </span>
                                    </td>

                                    {/* 제목 및 본문 요약 */}
                                    <td className="py-4 px-6 max-w-xs">
                                        <div className="font-bold text-gray-900 truncate mb-0.5">
                                            {inquiry.title}
                                        </div>
                                        <div className="text-gray-400 text-[12px] truncate">
                                            {inquiry.content.replace(
                                                /<[^>]*>?/gm,
                                                "",
                                            )}
                                        </div>
                                    </td>

                                    {/* 작성자 정보 */}
                                    <td className="py-4 px-6">
                                        <div className="font-medium text-gray-800">
                                            {inquiry.user.name}
                                        </div>
                                        <div className="text-[11px] text-gray-400">
                                            @{inquiry.user.username}
                                        </div>
                                    </td>

                                    {/* 작성일 */}
                                    <td className="py-4 px-6 text-gray-400">
                                        {new Date(
                                            inquiry.createdAt,
                                        ).toLocaleDateString()}
                                    </td>

                                    {/* 액션 버튼 */}
                                    <td className="py-4 px-6 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                                                title="상세 보기"
                                            >
                                                <FiEye size={18} />
                                            </button>
                                            <button
                                                onClick={(e) =>
                                                    handleDelete(e, inquiry.id)
                                                }
                                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                                title="삭제"
                                            >
                                                <FiTrash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="py-20 text-center text-gray-400"
                                >
                                    문의 내역이 없습니다.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* 페이지네이션 */}
                {pagination.totalPages > 0 && (
                    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/50">
                        <div className="text-xs text-gray-500">
                            Page {pagination.currentPage} of{" "}
                            {pagination.totalPages}
                        </div>
                        <div className="flex gap-2">
                            <button
                                disabled={page <= 1}
                                onClick={() => handlePageChange(page - 1)}
                                className="p-2 rounded-lg bg-white border border-gray-200 hover:text-[#ff4600] disabled:opacity-50"
                            >
                                <FiChevronLeft />
                            </button>
                            <button
                                disabled={page >= pagination.totalPages}
                                onClick={() => handlePageChange(page + 1)}
                                className="p-2 rounded-lg bg-white border border-gray-200 hover:text-[#ff4600] disabled:opacity-50"
                            >
                                <FiChevronRight />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminInquiryList;
