import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import {
    FiTrash2,
    FiStar,
    FiRefreshCw,
    FiChevronLeft,
    FiChevronRight,
} from "react-icons/fi";
import {
    deleteAdminReview,
    getAdminReviews,
} from "../../../api/admin.review.api.ts";
import type {
    AdminReviewsResponse,
    Review,
} from "../../../types/admin.review.ts";
import { twMerge } from "tailwind-merge";

function AdminReviewList() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        total: 0,
        totalPages: 0,
        currentPage: 1,
    });

    const page = Number(searchParams.get("page")) || 1;

    useEffect(() => {
        const loadReviews = async () => {
            setLoading(true);
            try {
                const res: AdminReviewsResponse = await getAdminReviews({
                    page,
                    limit: 10,
                });
                setReviews(res.data);
                setPagination(res.pagination);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadReviews().then(() => {});
    }, [page]);

    const handleDelete = async (id: number) => {
        if (
            !confirm(
                "해당 리뷰를 정말 삭제하시겠습니까? 삭제 후 복구가 불가능합니다.",
            )
        )
            return;
        try {
            await deleteAdminReview(id);
            alert("삭제되었습니다.");
        } catch (error) {
            console.log(error);
            alert("삭제에 실패했습니다.");
        }
    };

    const handlePageChange = (newPage: number) => {
        setSearchParams({ page: String(newPage) });
    };

    return (
        <div className="space-y-6">
            {/* 상단 헤더 */}
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        리뷰 관리
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        총 {pagination.total}건의 고객 리뷰가 있습니다.
                    </p>
                </div>
            </div>

            {/* 테이블 영역 */}
            <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-xs text-gray-500 uppercase font-semibold">
                            <th className="py-4 px-6">상품 정보</th>
                            <th className="py-4 px-6">작성자</th>
                            <th className="py-4 px-6">평점 및 내용</th>
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
                        ) : reviews.length > 0 ? (
                            reviews.map((review) => (
                                <tr
                                    key={review.id}
                                    className="hover:bg-orange-50/30 transition-colors"
                                >
                                    {/* 상품 정보 */}
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={twMerge(
                                                    ["w-10", "h-10", "rounded"],
                                                    ["bg-gray-50", "shrink-0"],
                                                    ["overflow-hidden", "flex"],
                                                    [
                                                        "border-gray-100",
                                                        "border",
                                                    ],
                                                    [
                                                        "items-center",
                                                        "justify-center",
                                                    ],
                                                )}
                                            >
                                                <span className="text-[10px] text-gray-400 font-bold">
                                                    {review.product.name.substring(
                                                        0,
                                                        1,
                                                    )}
                                                </span>
                                            </div>
                                            <div className="font-medium text-gray-900 truncate max-w-[150px]">
                                                {review.product.name}
                                            </div>
                                        </div>
                                    </td>

                                    {/* 작성자 */}
                                    <td className="py-4 px-6">
                                        <div className="text-gray-900 font-medium">
                                            {review.user.name}
                                        </div>
                                    </td>

                                    {/* 평점 및 내용 */}
                                    <td className="py-4 px-6 max-w-md">
                                        <div className="flex items-center gap-1 text-orange-400 mb-1">
                                            {[...Array(5)].map((_, i) => (
                                                <FiStar
                                                    key={i}
                                                    size={12}
                                                    fill={
                                                        i < review.rating
                                                            ? "currentColor"
                                                            : "none"
                                                    }
                                                    className={
                                                        i < review.rating
                                                            ? ""
                                                            : "text-gray-200"
                                                    }
                                                />
                                            ))}
                                        </div>
                                        <div className="text-gray-600 line-clamp-2 leading-relaxed">
                                            {/* content가 null일 경우 처리 */}
                                            {review.content || (
                                                <span className="text-gray-300 italic">
                                                    내용 없음
                                                </span>
                                            )}
                                        </div>
                                        {review.images &&
                                            review.images.length > 0 && (
                                                <div className="flex gap-2 mt-2">
                                                    {review.images.map(
                                                        (img, index) => (
                                                            <img
                                                                key={`${review.id}-img-${index}`}
                                                                src={img.url}
                                                                alt="리뷰 이미지"
                                                                className="w-10 h-10 object-cover rounded"
                                                            />
                                                        ),
                                                    )}
                                                </div>
                                            )}
                                    </td>

                                    {/* 작성일 */}
                                    <td className="py-4 px-6 text-gray-400 text-[12px]">
                                        {new Date(
                                            review.createdAt,
                                        ).toLocaleDateString()}
                                    </td>

                                    {/* 관리 버튼 */}
                                    <td className="py-4 px-6 text-right">
                                        <button
                                            onClick={() =>
                                                handleDelete(review.id)
                                            }
                                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                            title="리뷰 삭제"
                                        >
                                            <FiTrash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="py-20 text-center text-gray-400"
                                >
                                    등록된 리뷰가 없습니다.
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

export default AdminReviewList;
