import { type JSX, useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { FiArrowLeft, FiSave, FiRefreshCw } from "react-icons/fi";
import type { Category } from "../../../types/category";
import type { UpdateCategoryRequest } from "../../../types/admin.category.ts";
import { getCategories, getCategoryByPath } from "../../../api/category.api.ts";
import { updateCategory } from "../../../api/admin.category.api.ts";
import { AxiosError } from "axios";

function AdminCategoryEdit() {
    const { path } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [targetId, setTargetId] = useState<number | null>(
        location.state?.categoryId || null,
    );

    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<UpdateCategoryRequest>();

    useEffect(() => {
        const init = async () => {
            if (!path) return;
            try {
                // 1. 전체 카테고리 로드 (부모 선택용)
                const allCats = await getCategories();
                setCategories(allCats);

                const targetCat = await getCategoryByPath(path);

                if (targetCat) {
                    setTargetId(targetCat.category.id);
                    reset({
                        name: targetCat.category.name,
                        path: targetCat.category.path,
                        parentId: targetCat.category.parentId,
                    });
                }
            } catch (error) {
                console.log(error);
                alert("정보를 불러오지 못했습니다.");
                navigate("/admin/categories");
            } finally {
                setLoading(false);
            }
        };
        init().then(() => {});
    }, [path, navigate, reset]);

    const renderCategoryOptions = (
        cats: Category[],
        depth = 0,
    ): JSX.Element[] => {
        return cats.flatMap((cat) => {
            if (cat.id === targetId) return [];

            return [
                <option key={cat.id} value={cat.id}>
                    {"\u00A0\u00A0".repeat(depth * 2)} {depth > 0 ? "└ " : ""}
                    {cat.name}
                </option>,
                ...(cat.children
                    ? renderCategoryOptions(cat.children, depth + 1)
                    : []),
            ];
        });
    };

    const onSubmit: SubmitHandler<UpdateCategoryRequest> = async (data) => {
        if (!targetId) return;
        try {
            const payload = {
                ...data,
                parentId: data.parentId ? Number(data.parentId) : null,
            };
            await updateCategory(targetId, payload);
            alert("수정되었습니다.");
            navigate("/admin/categories");
        } catch (error) {
            let message = "수정 실패";
            if (error instanceof AxiosError)
                message = error.response?.data?.message;
            alert(message);
        }
    };

    if (loading)
        return (
            <div className="flex justify-center p-10">
                <FiRefreshCw className="animate-spin text-[#ff4600]" />
            </div>
        );

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
                    카테고리 수정
                </h2>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white rounded-[20px] shadow-sm border border-gray-100 p-8 space-y-6"
            >
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
                        카테고리명
                    </label>
                    <input
                        type="text"
                        className={twMerge([
                            "w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-[#ff4600]",
                            errors.name && "border-red-500",
                        ])}
                        {...register("name", {
                            required: "이름은 필수입니다.",
                        })}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        경로 (Path)
                    </label>
                    <input
                        type="text"
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
                        <FiSave /> 수정 완료
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AdminCategoryEdit;
