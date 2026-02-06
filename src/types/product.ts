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

export interface ProductScentInfo {
    productId?: number;
    productName?: string;
    scent: string;
}

// 향 정보 매핑 데이터
export const PRODUCT_SCENTS: ProductScentInfo[] = [
    {
        productName:
            "쿨리타X그라플렉스 한정판 러브 에디션 마우스워시 500ml + 컵",
        scent: "붉은 과실향의 달콤함이 입 안을 감싸며 사랑의 포근함을 전합니다.",
    },
    {
        productName: "쿨리타 선물세트 레몬러쉬 마우스워시 500ml + 컵",
        scent: "레몬 향, 그린 올리브, 바질향",
    },
    {
        productName: "쿨리타 선물세트 에메랄드비치 마우스워시 500ml + 컵",
        scent: "바나나, 멜론의 트로피칼 프루츠 향, 블루베리, 라벤더향",
    },
    {
        productName: "쿨리타 선물세트 선셋로맨스 마우스워시 500ml + 컵",
        scent: "딸기, 체리, 자두의 붉은 과실향, 오렌지, 스피아민트향",
    },
    {
        productName: "쿨리타 레몬러쉬 마우스워시 500ml",
        scent: "레몬 향, 그린 올리브, 바질향",
    },
    {
        productName: "쿨리타 에메랄드비치 마우스워시 500ml",
        scent: "바나나, 멜론의 트로피칼 프루츠 향, 블루베리, 라벤더향",
    },
    {
        productName: "쿨리타 선셋로맨스 마우스워시 500ml",
        scent: "딸기, 체리, 자두의 붉은 과실향, 오렌지, 스피아민트향",
    },
];
