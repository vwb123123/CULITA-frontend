import { httpClient } from "./axios.ts";
import type {
    CreateInquiryRequest,
    Inquiry,
    InquiryDetailResponse,
    UpdateInquiryRequest,
} from "../types/Inquiries.ts";

// 내 문의 내역 조회
export const getInquiries = async (params: { page: number; limit: number }) => {
    const response = await httpClient.get("/inquiries", {
        params: {
            page: Number(params.page),
            limit: Number(params.limit),
        },
    });
    return response.data;
};

// 1:1 문의 등록
export const createInquiry = async (data: CreateInquiryRequest) => {
    const response = await httpClient.post<Inquiry>("/inquiries", data);
    return response.data;
};

// 문의 상세 조회
export const getInquiryById = async (id: number) => {
    const response = await httpClient.get<InquiryDetailResponse>(
        `/inquiries/${id}`,
    );
    return response.data;
};

// 문의 수정 (PENDING 상태일 때만 가능)
export const updateInquiry = async (id: number, data: UpdateInquiryRequest) => {
    const response = await httpClient.put<Inquiry>(`/inquiries/${id}`, data);
    return response.data;
};

// 문의 삭제 (PENDING 상태일 때만 가능)
export const deleteInquiry = async (id: number) => {
    const response = await httpClient.delete<void>(`/inquiries/${id}`);
    return response.data;
};
