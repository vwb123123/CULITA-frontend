import { useEffect, useState } from "react";
import { Link } from "react-router";
import { twMerge } from "tailwind-merge";
import {
    FiPlus,
    FiEdit2,
    FiTrash2,
    FiFolder,
    FiCornerDownRight,
    FiRefreshCw,
} from "react-icons/fi";
import { deleteCategory } from "../../../api/admin.category.api";
import type { Category } from "../../../types/category";
import { getCategories } from "../../../api/category.api.ts";
import { AxiosError } from "axios";

function AdminCategoryList() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);

    const loadCategories = async () => {
        setLoading(true);
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            console.error("카테고리 로딩 실패:", error);
            alert("카테고리 정보를 불러오지 못했습니다.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCategories().then(() => {});
    }, []);

    const handleDelete = async (id: number, name: string) => {
        if (
            !confirm(
                `'${name}' 카테고리를 삭제하시겠습니까?\n하위 카테고리나 상품이 있다면 삭제되지 않습니다.`,
            )
        )
            return;

        try {
            await deleteCategory(id);
            alert("삭제되었습니다.");
            loadCategories().then(() => {});
        } catch (error) {
            console.error("삭제 실패:", error);
            let message = "삭제 중 오류가 발생했습니다.";
            if (error instanceof AxiosError)
                message = error.response?.data?.message;
            alert(message);
        }
    };

    const CategoryItem = ({
        category,
        depth,
    }: {
        category: Category;
        depth: number;
    }) => {
        return (
            <>
                <tr className="hover:bg-orange-50/30 transition-colors duration-200 group">
                    <td className="py-4 px-6">
                        <div
                            className="flex items-center gap-2"
                            style={{ paddingLeft: `${depth * 40}px` }} // Depth에 따른 들여쓰기
                        >
                            {depth > 0 && (
                                <FiCornerDownRight className="text-gray-300" />
                            )}
                            <FiFolder
                                className={
                                    depth === 0
                                        ? "text-[#ff4600]"
                                        : "text-gray-400"
                                }
                            />
                            <span
                                className={twMerge([
                                    "font-medium",
                                    depth === 0
                                        ? "text-gray-800"
                                        : "text-gray-600",
                                ])}
                            >
                                {category.name}
                            </span>
                        </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500 font-mono">
                        /{category.path}
                    </td>
                    <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Link
                                to={`/admin/categories/${category.path}/edit`}
                                state={{ categoryId: category.id }} // Path로 조회하므로 ID를 state로 넘김 (또는 상세 조회 API 수정)
                                className="p-2 text-gray-400 hover:text-[#ff4600] hover:bg-[#ff4600]/10 rounded-full transition-all"
                                title="수정"
                            >
                                <FiEdit2 size={16} />
                            </Link>
                            <button
                                onClick={() =>
                                    handleDelete(category.id, category.name)
                                }
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                                title="삭제"
                            >
                                <FiTrash2 size={16} />
                            </button>
                        </div>
                    </td>
                </tr>
                {category.children &&
                    category.children.map((child) => (
                        <CategoryItem
                            key={child.id}
                            category={child}
                            depth={depth + 1}
                        />
                    ))}
            </>
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        카테고리 관리
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        쇼핑몰의 카테고리 구조를 설정합니다. (Drag & Drop
                        미지원, 수동 설정)
                    </p>
                </div>
                <Link
                    to="/admin/categories/create"
                    className={twMerge([
                        "flex items-center gap-2",
                        "px-5 py-2.5",
                        "bg-[#ff4600] text-white",
                        "rounded-[100px]",
                        "text-sm font-medium",
                        "hover:bg-[#e63f00] hover:shadow-lg hover:shadow-[#ff4600]/20",
                        "transition-all duration-300",
                    ])}
                >
                    <FiPlus className="text-lg" />
                    <span>카테고리 추가</span>
                </Link>
            </div>

            <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[50%]">
                                    카테고리명
                                </th>
                                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[30%]">
                                    경로 (Path)
                                </th>
                                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider w-[20%] text-right">
                                    관리
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan={3}
                                        className="py-10 text-center text-gray-400"
                                    >
                                        <div className="flex justify-center items-center gap-2">
                                            <FiRefreshCw className="animate-spin" />{" "}
                                            로딩 중...
                                        </div>
                                    </td>
                                </tr>
                            ) : categories.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={3}
                                        className="py-10 text-center text-gray-400"
                                    >
                                        등록된 카테고리가 없습니다.
                                    </td>
                                </tr>
                            ) : (
                                categories.map((cat) => (
                                    <CategoryItem
                                        key={cat.id}
                                        category={cat}
                                        depth={0}
                                    />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminCategoryList;
