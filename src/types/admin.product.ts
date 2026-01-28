import type { ProductImageType } from "./product.ts";

export interface ProductImageInput {
    url: string;
    type: ProductImageType;
    order: number;
}

export interface LocalImageState {
    id: string;
    file?: File;
    previewUrl: string;
    type: ProductImageType;
    order: number;
}

export interface CreateProductForm {
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: number;

    productName: string;
    volume: string;
    efficacyEffects: string;
    ingredients: string;
    manufacturer: string;
    brandCompany: string;
    precautions: string;

    isBest: boolean;
    isNew: boolean;
}

export interface UpdateProductForm extends Partial<CreateProductForm> {}
