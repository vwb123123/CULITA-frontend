import type { Category, BreadcrumbsItem } from "./category";

export interface MetaResponse {
    total: number;
    page: number;
    lastPage: number;
}

export interface Product {
    id: number;
    image: string;
    imageHover?: string;
    name: string;
    scent: string;
    price: string;
    isBest?: boolean;
    isNew?: boolean;
}

export interface ProductImage {
    id: number;
    url: string;
    type: "main" | "hover" | "detail"; // 메인, 호버, 상세 이미지
    order: number; // 이미지 순서
}

// 상품 고시 정보
export interface ProductDetail extends Product {
    category: Category;
    breadcrumbs: BreadcrumbsItem[];
    productName: string;
    volume: string;
    efficacy_Effects: string;
    ingredients: string;
    manufacturer: string;
    brandCompany: string;
    precautions: string;
}

// 상품 목록 조회용
export interface ProductListItem {
    id: number;
    name: string;
    description: string;
    price: number;
    thumbnailUrl: string;
    hoverImageUrl?: string;
    categoryId: number;
    isBest?: boolean;
    isNew?: boolean;
}

// 목록 조회 응답 타입
export interface ProductListResponse {
    meta: MetaResponse;
    data: Product[];
}
