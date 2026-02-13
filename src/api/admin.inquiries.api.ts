import { httpClient } from "./axios";
import type {
    AdminInquiryListResponse,
    AdminInquiryDetailResponse,
    AdminInquiryQueryParams,
    AdminInquiryAnswerRequest,
} from "../types/admin.inquiries";

// [관리자] 문의 목록 조회
export const getAdminInquiries = async (params?: AdminInquiryQueryParams) => {
    const response = await httpClient.get<AdminInquiryListResponse>(
        "/admin/inquiries",
        {
            params,
        },
    );
    return response.data;
};

// [관리자] 문의 상세 조회
export const getAdminInquiryById = async (id: number) => {
    const response = await httpClient.get<AdminInquiryDetailResponse>(
        `/admin/inquiries/${id}`,
    );
    return response.data;
};

// [관리자] 문의 삭제

export const deleteAdminInquiry = async (id: number) => {
    const response = await httpClient.delete<{ message: string }>(
        `/admin/inquiries/${id}`,
    );
    return response.data;
};

// [관리자] 문의 답변 등록/수정
export const updateAdminInquiryAnswer = async (
    id: number,
    data: AdminInquiryAnswerRequest,
) => {
    const response = await httpClient.patch<AdminInquiryDetailResponse>(
        `/admin/inquiries/${id}/answer`,
        data,
    );
    return response.data;
};
