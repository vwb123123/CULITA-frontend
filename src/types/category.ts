// 카테고리
export interface Category {
    id: number;
    name: string;
    path: string;
    parentId: number | null;
    children: (Category | null)[];
}

// breadcrumb 아이템
export interface BreadcrumbItems {
    id: number;
    name: string;
    path: string;
}

// API 전체 응답 타입
export interface CategoryResponse {
    category: Category;
    breadcrumbs: BreadcrumbItems[];
}
