export interface CreateCategoryRequest {
    name: string;
    path: string;
    parentId?: number | null;
}

export interface UpdateCategoryRequest {
    name?: string;
    path?: string;
    parentId?: number | null;
}
