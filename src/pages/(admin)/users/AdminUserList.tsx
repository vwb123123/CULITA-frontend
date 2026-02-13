import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { twMerge } from "tailwind-merge";
import {
    FiSearch,
    FiEdit2,
    FiTrash2,
    FiPlus,
    FiChevronLeft,
    FiChevronRight,
    FiRefreshCw,
} from "react-icons/fi";
import type {
    AdminUserData,
    AdminUserPagination,
} from "../../../types/admin.user.ts";
import { deleteUser, fetchUsers } from "../../../api/admin.user.api.ts";

function AdminUserList() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [users, setUsers] = useState<AdminUserData[]>([]);
    const [pagination, setPagination] = useState<AdminUserPagination | null>(
        null,
    );
    const [loading, setLoading] = useState(false);

    const page = Number(searchParams.get("page")) || 1;
    const search = searchParams.get("search") || "";

    useEffect(() => {
        const loadUsers = async () => {
            setLoading(true);
            try {
                const { data, pagination } = await fetchUsers({
                    page,
                    limit: 10,
                    search: search || undefined,
                });
                setUsers(data);
                setPagination(pagination);
            } catch (error) {
                console.error("회원 목록 로딩 실패:", error);
            } finally {
                setLoading(false);
            }
        };
        loadUsers().then(() => {});
    }, [page, search]);

    const handleDelete = async (userId: number) => {
        if (!window.confirm(`ID: ${userId} 회원을 정말 삭제하시겠습니까?`))
            return;

        try {
            await deleteUser(userId);
            alert("삭제되었습니다.");
        } catch (error) {
            console.error("삭제 실패:", error);
            alert("삭제 중 오류가 발생했습니다.");
        }
    };

    const handlePageChange = (newPage: number) => {
        if (!pagination) return;
        if (newPage < 1 || newPage > pagination.totalPages) return;
        setSearchParams({ page: String(newPage) });
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        회원 관리
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        등록된 회원을 조회하고 관리합니다. (총{" "}
                        {pagination?.totalUsers || 0}명)
                    </p>
                </div>

                <div className="flex gap-2">
                    <div className="relative group hidden md:block">
                        <input
                            type="text"
                            placeholder="회원 검색..."
                            defaultValue={search}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    setSearchParams({
                                        search: e.currentTarget.value,
                                        page: "1",
                                    });
                                }
                            }}
                            className={twMerge([
                                "pl-10 pr-4 py-2.5 w-64",
                                "bg-white border border-gray-200",
                                "rounded-[100px]",
                                "text-sm focus:outline-none focus:border-[#ff4600]",
                                "transition-all duration-300",
                                "shadow-sm group-hover:shadow-md",
                            ])}
                            disabled
                        />
                        <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>

                    <Link
                        to="/admin/users/create"
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
                        <span>회원 등록</span>
                    </Link>
                </div>
            </div>

            <div className="bg-white rounded-[20px] shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    ID
                                </th>
                                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    회원 정보
                                </th>
                                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    연락처
                                </th>
                                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    권한
                                </th>
                                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    가입일
                                </th>
                                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                                    관리
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="py-10 text-center text-gray-400"
                                    >
                                        <div className="flex justify-center items-center gap-2">
                                            <FiRefreshCw className="animate-spin" />{" "}
                                            데이터 로딩 중...
                                        </div>
                                    </td>
                                </tr>
                            ) : users.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="py-10 text-center text-gray-400"
                                    >
                                        등록된 회원이 없습니다.
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="hover:bg-orange-50/30 transition-colors duration-200"
                                    >
                                        <td className="py-4 px-6 text-sm text-gray-600">
                                            #{user.id}
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-semibold text-gray-800">
                                                    {user.name}
                                                </span>
                                                <span className="text-xs text-gray-400">
                                                    @{user.username}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex flex-col">
                                                <span className="text-sm text-gray-600">
                                                    {user.email}
                                                </span>
                                                <span className="text-xs text-gray-400">
                                                    {user.phoneNumber || "-"}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span
                                                className={twMerge([
                                                    "px-2.5 py-1 rounded-full text-xs font-medium",
                                                    user.role === "ADMIN"
                                                        ? "bg-[#ff4600]/10 text-[#ff4600]"
                                                        : "bg-gray-100 text-gray-600",
                                                ])}
                                            >
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-gray-500">
                                            {formatDate(user.createdAt)}
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                {/* 수정 버튼 (페이지 이동) */}
                                                <Link
                                                    to={`/admin/users/${user.id}`}
                                                    className="p-2 text-gray-400 hover:text-[#ff4600] hover:bg-[#ff4600]/10 rounded-full transition-all"
                                                    title="수정"
                                                >
                                                    <FiEdit2 size={16} />
                                                </Link>
                                                {/* 삭제 버튼 */}
                                                <button
                                                    onClick={() =>
                                                        handleDelete(user.id)
                                                    }
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                                                    title="삭제"
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

                {pagination && pagination.totalPages > 0 && (
                    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/50">
                        <div className="text-xs text-gray-500">
                            Page{" "}
                            <span className="font-medium text-gray-900">
                                {pagination.currentPage}
                            </span>{" "}
                            of{" "}
                            <span className="font-medium text-gray-900">
                                {pagination.totalPages}
                            </span>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() =>
                                    handlePageChange(pagination.currentPage - 1)
                                }
                                disabled={pagination.currentPage === 1}
                                className={twMerge([
                                    "p-2 rounded-lg text-gray-500 bg-white border border-gray-200",
                                    "hover:bg-gray-50 hover:text-[#ff4600] disabled:opacity-50 disabled:hover:text-gray-500",
                                    "transition-all",
                                ])}
                            >
                                <FiChevronLeft />
                            </button>
                            <button
                                onClick={() =>
                                    handlePageChange(pagination.currentPage + 1)
                                }
                                disabled={
                                    pagination.currentPage ===
                                    pagination.totalPages
                                }
                                className={twMerge([
                                    "p-2 rounded-lg text-gray-500 bg-white border border-gray-200",
                                    "hover:bg-gray-50 hover:text-[#ff4600] disabled:opacity-50 disabled:hover:text-gray-500",
                                    "transition-all",
                                ])}
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

export default AdminUserList;
