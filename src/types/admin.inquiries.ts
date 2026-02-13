export interface InquiryUser {
    id: number;
    username: string;
    name: string;
}

export interface InquiryImage {
    id: number;
    url: string;
}

export interface AdminInquiry {
    id: number;
    title: string;
    content: string;
    status: "PENDING" | "ANSWERED";
    answer: string | null;
    answeredAt: string | null;
    createdAt: string;
    updatedAt: string;
    user: InquiryUser;
    images: InquiryImage[];
}

// 목록 조회 쿼리 파라미터
export interface AdminInquiryQueryParams {
    page?: number;
    limit?: number;
    status?: "PENDING" | "ANSWERED";
}

// 목록 조회 응답 구조
export interface AdminInquiryListResponse {
    data: AdminInquiry[];
    pagination: {
        total: number;
        totalPages: number;
        currentPage: number;
        limit: number;
    };
}

// 답변 등록/수정 요청 데이터 (PATCH)
export interface AdminInquiryAnswerRequest {
    answer: string;
}

// 상세 조회 응답 구조
export interface AdminInquiryDetailResponse {
    data: AdminInquiry;
}
