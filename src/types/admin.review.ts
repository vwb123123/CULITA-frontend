export interface ReviewUser {
    id: number;
    name: string;
    email: string;
}

export interface ReviewProduct {
    id: number;
    name: string;
}

export interface ReviewImage {
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

export interface AdminReviewQueryParams {
    page?: number;
    limit?: number;
}

export interface AdminReviewsResponse {
    data: Review[];
    pagination: {
        total: number;
        totalPages: number;
        currentPage: number;
        limit: number;
    };
}
