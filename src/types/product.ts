export type ProductImageType = "MAIN" | "HOVER" | "DETAIL";

export interface ProductImage {
    id: number;
    url: string;
    type: ProductImageType;
    order: number;
}

export interface ProductListItem {
    id: number;
    name: string;
    price: number;
    isBest: boolean;
    isNew: boolean;
    thumbnail: string | null;
    hoverImage: string | null;
}

export interface ProductDetail {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    isBest: boolean;
    isNew: boolean;

    productName: string;
    volume: string;
    efficacyEffects: string;
    ingredients: string;
    manufacturer: string;
    brandCompany: string;
    precautions: string;

    category: {
        id: number;
        name: string;
    };
    images: ProductImage[];
}

export interface ProductListParams {
    page?: number;
    limit?: number;
    categoryId?: number;
    isBest?: string;
    isNew?: string;
    sort?: "latest" | "priceHigh" | "priceLow";
}

export interface ProductListResponse {
    data: ProductListItem[];
    pagination: {
        total: number;
        totalPages: number;
        currentPage: number;
        limit: number;
    };
}
