export interface ReviewUser {
    id: number;
    name: string;
}

export interface ReviewProduct {
    id: number;
    name: string;
}

export interface ReviewImage {
    id: number;
    url: string;
}

export interface Review {
    id: number;
    rating: number;
    content: string | null;
    createdAt: string;
    user: ReviewUser;
    product: ReviewProduct;
    images: ReviewImage[];
}

export interface Pagination {
    total: number;
    totalPages: number;
    currentPage: number;
    limit: number;
}

export interface ReviewsResponse {
    data: Review[];
    pagination: Pagination;
}

// 리뷰 작성 요청 데이터
export interface CreateReviewRequest {
    productId: number;
    rating: number;
    content: string;
    imageUrls?: string[];
}

// 리뷰 수정 요청 데이터
export interface UpdateReviewRequest {
    rating?: number;
    content?: string;
    imageUrls?: string[];
}

// 리뷰 목록 조회
export interface ReviewQueryParams {
    productId?: number;
    page?: number;
    limit?: number;
}
