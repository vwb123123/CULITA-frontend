export type InquiryType =
    | "DELIVERY"
    | "PRODUCT"
    | "EXCHANGE_RETURN"
    | "MEMBER"
    | "OTHER";

export type InquiryStatus = "PENDING" | "ANSWERED";

export interface InquiryImage {
    id: number;
    url: string;
}

export interface Inquiry {
    id: number;
    type: InquiryType;
    title: string;
    content: string;
    status: InquiryStatus;
    answer: string | null;
    answeredAt: string | null;
    createdAt: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
    images: InquiryImage[];
}

export interface Pagination {
    total: number;
    totalPages: number;
    currentPage: number;
    limit: number;
}

export interface InquiriesResponse {
    data: Inquiry[];
    pagination: Pagination;
}

// 1:1 문의 등록 요청
export interface CreateInquiryRequest {
    type: InquiryType;
    title: string;
    content: string;
    imageUrls?: string[];
}

// 문의 수정 요청 데이터
export interface UpdateInquiryRequest extends CreateInquiryRequest {
    id: number;
}

// 문의 목록 조회
export interface InquiryQueryParams {
    type?: InquiryType;
    status?: InquiryStatus;
    page?: number;
    limit?: number;
}

// 상세 조회 응답 전용 인터페이스
export interface InquiryDetailResponse {
    message: string;
    data: Inquiry;
}
