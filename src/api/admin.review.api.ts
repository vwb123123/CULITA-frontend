import { httpClient } from "./axios.ts";
import type {
    AdminReviewQueryParams,
    AdminReviewsResponse,
} from "../types/admin.review.ts";

// [관리자] 리뷰 목록 조회
export const getAdminReviews = async (params?: AdminReviewQueryParams) => {
    const response = await httpClient.get<AdminReviewsResponse>(
        "/admin/reviews",
        {
            params,
        },
    );
    return response.data;
};

// [관리자] 리뷰 삭제
export const deleteAdminReview = async (id: number) => {
    const response = await httpClient.delete<{ message: string }>(
        `/admin/reviews/${id}`,
    );
    return response.data;
};
