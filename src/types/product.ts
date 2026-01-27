import type { Category, BreadcrumbItems } from "./category";

export interface MetaResponse {
    total: number;
    page: number;
    lastPage: number;
}

export interface Product {
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

export interface ProductImage {
    id: number;
    url: string;
    type: "main" | "hover" | "detail";
    order: number;
}

// 상품 고시 정보
export interface ProductDetail {
    id: number;
    name: string;
    price: number;

    category: Category;
    breadcrumbs: BreadcrumbItems[];

    images: ProductImage[];

    volume: string;
    efficacyEffects: string;
    ingredients: string;
    manufacturer: string;
    brandCompany: string;
    precautions: string;

    isBest?: boolean;
    isNew?: boolean;
}

export interface ProductCard {
    id: number;
    image: string;
    imageHover?: string;
    name: string;
    scent?: string;
    price: number;
    isBest?: boolean;
    isNew?: boolean;
}

export const mapProductToCard = (product: Product): ProductCard => ({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.thumbnailUrl,
    imageHover: product.hoverImageUrl,
    isBest: product.isBest,
    isNew: product.isNew,
});

// 목록 조회 응답 타입
export interface ProductListResponse {
    meta: MetaResponse;
    data: Product[];
}
