import { useEffect, useState, type ChangeEvent, type JSX } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
    FiArrowLeft,
    FiSave,
    FiUpload,
    FiX,
    FiImage,
    FiRefreshCw,
} from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import { uploadImage } from "../../../api/upload.api";
import type { Category } from "../../../types/category.ts";
import type {
    LocalImageState,
    ProductImageInput,
    UpdateProductForm,
} from "../../../types/admin.product.ts";
import { getCategories } from "../../../api/category.api.ts";
import { fetchProductDetail } from "../../../api/product.api.ts";
import { updateProduct } from "../../../api/admin.product.api.ts";
import { AxiosError } from "axios";

function AdminProductEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [isUploading, setIsUploading] = useState(false);

    const [localImages, setLocalImages] = useState<LocalImageState[]>([]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<UpdateProductForm>();

    useEffect(() => {
        const init = async () => {
            if (!id) return;
            setIsLoadingData(true);
            try {
                const [cats, product] = await Promise.all([
                    getCategories(),
                    fetchProductDetail(Number(id)),
                ]);

                setCategories(cats);

                reset({
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    stock: product.stock,
                    categoryId: product.category.id,
                    isBest: product.isBest,
                    isNew: product.isNew,
                    productName: product.productName,
                    volume: product.volume,
                    efficacyEffects: product.efficacyEffects,
                    ingredients: product.ingredients,
                    manufacturer: product.manufacturer,
                    brandCompany: product.brandCompany,
                    precautions: product.precautions,
                });

                if (product.images) {
                    const existingImages: LocalImageState[] =
                        product.images.map((img) => ({
                            id: img.id + "",
                            file: undefined,
                            previewUrl: img.url,
                            type: img.type,
                            order: img.order,
                        }));
                    existingImages.sort((a, b) => a.order - b.order);
                    setLocalImages(existingImages);
                }
            } catch (error) {
                console.error("데이터 로딩 실패:", error);
                alert("상품 정보를 불러오지 못했습니다.");
                navigate("/admin/products");
            } finally {
                setIsLoadingData(false);
            }
        };

        init();
    }, [id, reset, navigate]);

    const renderCategoryOptions = (
        cats: Category[],
        depth = 0,
    ): JSX.Element[] => {
        return cats.flatMap((cat) => [
            <option key={cat.id} value={cat.id}>
                {"\u00A0\u00A0".repeat(depth * 2)}
                {depth > 0 ? "└ " : ""}
                {cat.name}
            </option>,
            ...(cat.children
                ? renderCategoryOptions(cat.children, depth + 1)
                : []),
        ]);
    };

    const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files).map((file, index) => ({
                id: `new-${Date.now()}-${index}`,
                file,
                previewUrl: URL.createObjectURL(file),
                type: "DETAIL" as const,
                order: localImages.length + index,
            }));
            setLocalImages((prev) => [...prev, ...newFiles]);
        }
        e.target.value = "";
    };

    const updateImageMeta = <K extends keyof LocalImageState>(
        index: number,
        field: K,
        value: LocalImageState[K],
    ) => {
        setLocalImages((prev) => {
            const updated = [...prev];
            updated[index] = {
                ...updated[index],
                [field]: value,
            };
            return updated;
        });
    };

    const removeImage = (index: number) => {
        setLocalImages((prev) => prev.filter((_, i) => i !== index));
    };

    const onSubmit: SubmitHandler<UpdateProductForm> = async (formData) => {
        if (!id) return;
        if (localImages.length === 0)
            return alert("최소 1개의 이미지가 필요합니다.");
        if (!localImages.find((img) => img.type === "MAIN"))
            return alert("MAIN 이미지가 필요합니다.");

        if (!confirm("상품 정보를 수정하시겠습니까?")) return;

        setIsUploading(true);

        try {
            const imagePromises = localImages.map(async (img) => {
                // 1) 신규 파일인 경우: 업로드 후 URL 받기
                if (img.file) {
                    const url = await uploadImage(img.file, "products");
                    return {
                        url,
                        type: img.type,
                        order: img.order,
                    } as ProductImageInput;
                } else {
                    return {
                        url: img.previewUrl,
                        type: img.type,
                        order: img.order,
                    } as ProductImageInput;
                }
            });

            const finalImages = await Promise.all(imagePromises);

            await updateProduct(Number(id), formData, finalImages);

            alert("상품 정보가 수정되었습니다.");
            navigate("/admin/products");
        } catch (error) {
            console.error("수정 실패:", error);
            let message = "수정 중 오류가 발생했습니다.";
            if (error instanceof AxiosError)
                message = error.response?.data.message;
            alert(message);
        } finally {
            setIsUploading(false);
        }
    };

    if (isLoadingData) {
        return (
            <div className="h-[60vh] flex flex-col justify-center items-center gap-3 text-gray-500">
                <FiRefreshCw className="animate-spin text-3xl text-[#ff4600]" />
                <p>상품 정보를 불러오는 중입니다...</p>
            </div>
        );
    }

    const inputClass =
        "w-full px-4 py-3 rounded-[12px] bg-gray-50 border border-gray-200 outline-none focus:bg-white focus:border-[#ff4600] transition-all";
    const labelClass = "block text-sm font-medium text-gray-700 mb-1";

    return (
        <div className="max-w-6xl mx-auto space-y-6 pb-20">
            {/* Header */}
            <div className="flex items-center gap-4 mb-4">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
                >
                    <FiArrowLeft size={24} />
                </button>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        상품 수정
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        ID:{" "}
                        <span className="font-mono text-[#ff4600]">#{id}</span>{" "}
                        의 정보를 수정합니다.
                    </p>
                </div>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
                {/* 텍스트 정보 */}
                <div className="lg:col-span-2 space-y-8 bg-white p-8 rounded-[20px] shadow-sm border border-gray-100">
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold text-gray-800 border-b pb-3">
                            기본 정보
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className={labelClass}>
                                    상품명{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    {...register("name", {
                                        required: "상품명은 필수입니다.",
                                    })}
                                    className={inputClass}
                                />
                                {errors.name && (
                                    <p className="text-xs text-red-500 mt-1">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className={labelClass}>
                                    카테고리{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <select
                                    {...register("categoryId", {
                                        required: true,
                                    })}
                                    className={inputClass}
                                >
                                    <option value="">선택하세요</option>
                                    {renderCategoryOptions(categories)}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClass}>
                                        가격{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        {...register("price", {
                                            required: true,
                                        })}
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>
                                        재고{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        {...register("stock", {
                                            required: true,
                                        })}
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            <div className="md:col-span-2 flex gap-8 pt-2">
                                <label className="flex items-center gap-2 cursor-pointer select-none group">
                                    <input
                                        type="checkbox"
                                        {...register("isBest")}
                                        className="w-5 h-5 accent-[#ff4600]"
                                    />
                                    <span className="font-medium text-gray-700 group-hover:text-[#ff4600] transition-colors">
                                        BEST 상품
                                    </span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer select-none group">
                                    <input
                                        type="checkbox"
                                        {...register("isNew")}
                                        className="w-5 h-5 accent-[#ff4600]"
                                    />
                                    <span className="font-medium text-gray-700 group-hover:text-[#ff4600] transition-colors">
                                        NEW 상품
                                    </span>
                                </label>
                            </div>

                            <div className="md:col-span-2">
                                <label className={labelClass}>간략 설명</label>
                                <textarea
                                    {...register("description")}
                                    className={`${inputClass} h-28 resize-none`}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6 pt-6 border-t border-gray-100">
                        <h3 className="text-lg font-bold text-gray-800 border-b pb-3">
                            상세 스펙 (정보고시)
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={labelClass}>
                                    제품명(공식)
                                </label>
                                <input
                                    {...register("productName")}
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className={labelClass}>용량/중량</label>
                                <input
                                    {...register("volume")}
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className={labelClass}>제조업자</label>
                                <input
                                    {...register("manufacturer")}
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className={labelClass}>
                                    책임판매업자
                                </label>
                                <input
                                    {...register("brandCompany")}
                                    className={inputClass}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className={labelClass}>효능/효과</label>
                                <input
                                    {...register("efficacyEffects")}
                                    className={inputClass}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className={labelClass}>전성분</label>
                                <textarea
                                    {...register("ingredients")}
                                    className={`${inputClass} h-20`}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className={labelClass}>
                                    사용 시 주의사항
                                </label>
                                <textarea
                                    {...register("precautions")}
                                    className={`${inputClass} h-20`}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 이미지 업로드 */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-[20px] shadow-sm border border-gray-100 sticky top-6">
                        <h3 className="text-lg font-bold text-gray-800 border-b pb-3 mb-4 flex items-center gap-2">
                            <FiImage className="text-[#ff4600]" /> 이미지 수정
                        </h3>

                        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-orange-50 hover:border-[#ff4600] transition-all group">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <FiUpload className="w-10 h-10 text-gray-400 group-hover:text-[#ff4600] mb-3 transition-colors" />
                                <p className="text-sm text-gray-600 font-medium group-hover:text-[#ff4600]">
                                    이미지 추가 (드래그 or 클릭)
                                </p>
                            </div>
                            <input
                                type="file"
                                className="hidden"
                                multiple
                                accept="image/*"
                                onChange={handleFileSelect}
                            />
                        </label>

                        <div className="mt-6 space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar pr-1">
                            {localImages.map((img, idx) => (
                                <div
                                    key={img.id}
                                    className={twMerge([
                                        "flex gap-3 p-3 rounded-xl border relative group transition-colors",
                                        img.file
                                            ? "bg-orange-50 border-orange-200"
                                            : "bg-gray-50 border-gray-200 hover:border-orange-200",
                                    ])}
                                >
                                    <div className="w-20 h-20 rounded-lg bg-white border border-gray-100 overflow-hidden flex-shrink-0 relative">
                                        <img
                                            src={img.previewUrl}
                                            alt="preview"
                                            className="w-full h-full object-cover"
                                        />
                                        {img.file && (
                                            <span className="absolute bottom-0 left-0 right-0 bg-[#ff4600] text-white text-[10px] text-center py-0.5 font-bold">
                                                NEW
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex-1 flex flex-col justify-center space-y-2">
                                        <select
                                            value={img.type}
                                            onChange={(e) =>
                                                updateImageMeta(
                                                    idx,
                                                    "type",
                                                    e.target
                                                        .value as LocalImageState["type"],
                                                )
                                            }
                                            className="w-full text-xs font-medium border border-gray-200 rounded-lg p-2 outline-none focus:border-[#ff4600] bg-white"
                                        >
                                            <option value="MAIN">
                                                ⭐️ MAIN
                                            </option>
                                            <option value="HOVER">
                                                🖱️ HOVER
                                            </option>
                                            <option value="DETAIL">
                                                🖼️ DETAIL
                                            </option>
                                        </select>

                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-500 font-medium">
                                                순서
                                            </span>
                                            <input
                                                type="number"
                                                value={img.order}
                                                onChange={(e) =>
                                                    updateImageMeta(
                                                        idx,
                                                        "order",
                                                        Number(e.target.value),
                                                    )
                                                }
                                                className="w-16 text-xs border border-gray-200 rounded-lg p-1.5 text-center outline-none focus:border-[#ff4600]"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => removeImage(idx)}
                                        className="absolute -top-2 -right-2 bg-white text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full p-1.5 shadow-sm border border-gray-200 transition-all opacity-0 group-hover:opacity-100"
                                    >
                                        <FiX size={14} />
                                    </button>
                                </div>
                            ))}
                            {localImages.length === 0 && (
                                <p className="text-center text-xs text-gray-400 py-4">
                                    이미지가 없습니다.
                                </p>
                            )}
                        </div>

                        <div className="pt-6 border-t mt-4">
                            <button
                                type="submit"
                                disabled={isUploading || isSubmitting}
                                className={twMerge([
                                    "w-full py-4 bg-[#ff4600] text-white rounded-[100px] font-bold",
                                    "flex justify-center items-center gap-2 shadow-lg shadow-orange-200",
                                    "hover:bg-[#e63f00] hover:shadow-orange-300 transition-all transform active:scale-[0.98]",
                                    "disabled:opacity-50 disabled:cursor-not-allowed",
                                ])}
                            >
                                {isUploading ? (
                                    <>
                                        <FiRefreshCw className="animate-spin" />
                                        <span>처리 중...</span>
                                    </>
                                ) : (
                                    <>
                                        <FiSave size={18} />
                                        <span>수정 완료</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AdminProductEdit;
