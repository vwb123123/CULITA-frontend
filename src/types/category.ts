export interface Category {
    id: number;
    name: string;
    path: string;
    parentId: null;
    breadcrumbs: BreadcrumbsItem[];
}

export interface BreadcrumbsItem {
    id: number;
    name: string;
    path: string;
}

export interface CategoryTree extends Category {
    children: Category[];
}
