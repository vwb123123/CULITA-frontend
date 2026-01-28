import { type JSX, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { createCategory } from "../../../api/admin.category.api";
import type { Category } from "../../../types/category";
import type { CreateCategoryRequest } from "../../../types/admin.category.ts";
import { getCategories } from "../../../api/category.api.ts";
import { AxiosError } from "axios";

function AdminCategoryCreate() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState<Category[]>([]);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CreateCategoryRequest>();

    useEffect(() => {
        getCategories().then(setCategories).catch(console.error);
    }, []);

    const renderCategoryOptions = (
        cats: Category[],
        depth = 0,
    ): JSX.Element[] => {
        return cats.flatMap((cat) => [
            <option key={cat.id} value={cat.id}>
                {"\u00A0\u00A0".repeat(depth * 2)} {depth > 0 ? "└ " : ""}
                {cat.name}
            </option>,
            ...(cat.children
                ? renderCategoryOptions(cat.children, depth + 1)
                : []),
        ]);
    };

    const onSubmit: SubmitHandler<CreateCategoryRequest> = async (data) => {
        try {
            const payload = {
                ...data,
                parentId: data.parentId ? Number(data.parentId) : null,
            };
            await createCategory(payload);
            alert("카테고리가 생성되었습니다.");
            navigate("/admin/categories");
        } catch (error) {
            let message = "생성 실패";
            if (error instanceof AxiosError)
                message = error.response?.data?.message;
            alert(message);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
                >
                    <FiArrowLeft size={24} />
                </button>
                <h2 className="text-2xl font-bold text-gray-800">
                    카테고리 추가
                </h2>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white rounded-[20px] shadow-sm border border-gray-100 p-8 space-y-6"
            >
                {/* 상위 카테고리 선택 */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        상위 카테고리
                    </label>
                    <select
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-[#ff4600]"
                        {...register("parentId")}
                    >
                        <option value="">(최상위 카테고리)</option>
                        {renderCategoryOptions(categories)}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        카테고리명 <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="예: 남성복"
                        className={twMerge([
                            "w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-[#ff4600]",
                            errors.name && "border-red-500",
                        ])}
                        {...register("name", {
                            required: "이름은 필수입니다.",
                        })}
                    />
                    {errors.name && (
                        <p className="text-xs text-red-500">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        경로 (Path) <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="예: men-clothing (영문 소문자, 숫자, -)"
                        className={twMerge([
                            "w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-[#ff4600]",
                            errors.path && "border-red-500",
                        ])}
                        {...register("path", {
                            required: "경로는 필수입니다.",
                            pattern: {
                                value: /^[a-z0-9-]+$/,
                                message:
                                    "영문 소문자, 숫자, 하이픈만 가능합니다.",
                            },
                        })}
                    />
                    {errors.path && (
                        <p className="text-xs text-red-500">
                            {errors.path.message}
                        </p>
                    )}
                </div>

                <div className="flex justify-end gap-3 mt-8">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-6 py-3 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-[100px]"
                    >
                        취소
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center gap-2 px-8 py-3 bg-[#ff4600] text-white rounded-[100px] text-sm font-bold hover:bg-[#e63f00] disabled:opacity-50"
                    >
                        <FiSave /> 저장하기
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AdminCategoryCreate;
