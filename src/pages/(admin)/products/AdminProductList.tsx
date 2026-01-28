import { fetchProducts } from "../../../api/product.api";
import { Link, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import { deleteProduct } from "../../../api/admin.product.api";
import {
    FiChevronLeft,
    FiChevronRight,
    FiEdit2,
    FiPlus,
    FiRefreshCw,
    FiTrash2,
} from "react-icons/fi";
import type { ProductListItem } from "../../../types/product.ts";

function AdminProductList() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState<ProductListItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        total: 0,
        totalPages: 0,
        currentPage: 1,
    });

    const page = Number(searchParams.get("page")) || 1;
    const limit = 10;

    const loadProducts = async () => {
        setLoading(true);
        try {
            const res = await fetchProducts({ page, limit });
            setProducts(res.data);
            setPagination(res.pagination);
        } catch (error) {
            console.error(error);
            alert("상품 목록을 불러오지 못했습니다.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts().then(() => {});
    }, [page]);

    const handleDelete = async (id: number) => {
        if (!confirm("정말 삭제하시겠습니까? (이미지도 함께 삭제됩니다)"))
            return;
        try {
            await deleteProduct(id);
            alert("삭제되었습니다.");
            loadProducts();
        } catch (error) {
            console.error(error);
            alert("삭제 실패");
        }
    };

    const handlePageChange = (newPage: number) => {
        setSearchParams({ page: String(newPage) });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        상품 관리
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        총 {pagination.total}개의 상품
                    </p>
                </div>
                <Link
                    to="/admin/products/create"
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#ff4600] text-white rounded-[100px] text-sm font-medium hover:bg-[#e63f00] shadow-md shadow-orange-100"
                >
                    <FiPlus /> 상품 등록
                </Link>
            </div>

            <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-xs text-gray-500 uppercase font-semibold">
                                <th className="py-4 px-6">ID</th>
                                <th className="py-4 px-6">상품 정보</th>
                                <th className="py-4 px-6">가격 / 재고</th>
                                <th className="py-4 px-6">상태</th>
                                <th className="py-4 px-6 text-right">관리</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="py-10 text-center text-gray-400"
                                    >
                                        <div className="flex justify-center items-center gap-2">
                                            <FiRefreshCw className="animate-spin" />{" "}
                                            로딩 중...
                                        </div>
                                    </td>
                                </tr>
                            ) : products.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="py-10 text-center text-gray-400"
                                    >
                                        등록된 상품이 없습니다.
                                    </td>
                                </tr>
                            ) : (
                                products.map((product) => (
                                    <tr
                                        key={product.id}
                                        className="hover:bg-orange-50/30 transition-colors"
                                    >
                                        <td className="py-4 px-6 text-sm text-gray-500">
                                            #{product.id}
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-4">
                                                {/* 썸네일 표시 */}
                                                <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden border border-gray-200 flex-shrink-0">
                                                    {product.thumbnail ? (
                                                        <img
                                                            src={
                                                                product.thumbnail
                                                            }
                                                            alt=""
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                                                            NO IMG
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-800 line-clamp-1">
                                                        {product.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="text-sm font-medium text-gray-900">
                                                {product.price.toLocaleString()}
                                                원
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex gap-1">
                                                {product.isBest && (
                                                    <span className="px-2 py-0.5 bg-black text-white text-[10px] font-bold rounded">
                                                        BEST
                                                    </span>
                                                )}
                                                {product.isNew && (
                                                    <span className="px-2 py-0.5 bg-[#ff4600] text-white text-[10px] font-bold rounded">
                                                        NEW
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    to={`/admin/products/${product.id}`}
                                                    className="p-2 text-gray-400 hover:text-[#ff4600] hover:bg-[#ff4600]/10 rounded-full transition-all"
                                                >
                                                    <FiEdit2 size={16} />
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(product.id)
                                                    }
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                                                >
                                                    <FiTrash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {pagination.totalPages > 1 && (
                    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/50">
                        <div className="text-xs text-gray-500">
                            Page {pagination.currentPage} of{" "}
                            {pagination.totalPages}
                        </div>
                        <div className="flex gap-2">
                            <button
                                disabled={pagination.currentPage === 1}
                                onClick={() =>
                                    handlePageChange(pagination.currentPage - 1)
                                }
                                className="p-2 rounded-lg bg-white border border-gray-200 hover:text-[#ff4600] disabled:opacity-50"
                            >
                                <FiChevronLeft />
                            </button>
                            <button
                                disabled={
                                    pagination.currentPage ===
                                    pagination.totalPages
                                }
                                onClick={() =>
                                    handlePageChange(pagination.currentPage + 1)
                                }
                                className="p-2 rounded-lg bg-white border border-gray-200 hover:text-[#ff4600] disabled:opacity-50"
                            >
                                <FiChevronRight />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminProductList;
