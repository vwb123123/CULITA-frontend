import { httpClient } from "./axios.ts";
import type {
    Review,
    ReviewsResponse,
    CreateReviewRequest,
    UpdateReviewRequest,
    ReviewQueryParams,
} from "../types/review.ts";

// 리뷰 작성 (DELIVERED 상태인 상품만 가능)
export const createReview = async (data: CreateReviewRequest) => {
    const response = await httpClient.post<Review>("/reviews", data);
    return response.data;
};

// 상품별 리뷰 목록 조회 (공개)
export const getProductReviews = async (params: ReviewQueryParams) => {
    const response = await httpClient.get<ReviewsResponse>("/reviews/product", {
        params,
    });
    return response.data;
};

// 내가 쓴 리뷰 조회
export const getMyReviews = async (params?: {
    page?: number;
    limit?: number;
}) => {
    const response = await httpClient.get<ReviewsResponse>("/reviews/me", {
        params,
    });
    return response.data;
};

// 리뷰 수정
export const updateReview = async (id: number, data: UpdateReviewRequest) => {
    const response = await httpClient.put<Review>(`/reviews/${id}`, data);
    return response.data;
};

// 리뷰 삭제
export const deleteReview = async (id: number) => {
    const response = await httpClient.delete<void>(`/reviews/${id}`);
    return response.data;
};
