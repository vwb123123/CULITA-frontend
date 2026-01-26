export interface Category {
    id: number;
    name: string;
    path: string;
    parentId: number | null;
    createdAt: string;
    updatedAt: string;
}

export interface BreadcrumbItem {
    id: number;
    name: string;
    path: string;
}
