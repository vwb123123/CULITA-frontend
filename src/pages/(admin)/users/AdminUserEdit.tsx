import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { twMerge } from "tailwind-merge";
import {
    FiArrowLeft,
    FiSave,
    FiInfo,
    FiRefreshCw,
    FiAlertCircle,
} from "react-icons/fi";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
    fetchUser,
    updateUser,
} from "../../../api/admin.user.api";
import type { User } from "../../../types/user";
import { AxiosError } from "axios";
import type { UpdateUserRequest } from "../../../types/admin.user.ts";

function AdminUserEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<UpdateUserRequest>();

    useEffect(() => {
        const loadUser = async () => {
            if (!id) return;
            try {
                const userData = await fetchUser(Number(id));
                setCurrentUser(userData);

                reset({
                    name: userData.name,
                    email: userData.email,
                    phoneNumber: userData.phoneNumber,
                    role: userData.role,
                });
            } catch (error) {
                console.error("회원 정보 로딩 실패:", error);
                alert("회원 정보를 불러올 수 없습니다.");
                navigate("/admin/users");
            } finally {
                setIsLoadingData(false);
            }
        };

        loadUser().then(() => {});
    }, [id, navigate, reset]);

    const onSubmit: SubmitHandler<UpdateUserRequest> = async (data) => {
        if (!id) return;

        const payload: UpdateUserRequest = {
            ...data,
            password: data.password ? data.password : undefined,
        };

        if (!confirm("회원 정보를 수정하시겠습니까?")) return;

        try {
            await updateUser(Number(id), payload);
            alert("회원 정보가 수정되었습니다.");
            navigate("/admin/users");
        } catch (error) {
            console.error("수정 실패:", error);
            let message = "수정 중 오류가 발생했습니다.";
            if (error instanceof AxiosError)
                message = error.response?.data?.message;
            alert(message);
        }
    };

    if (isLoadingData) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500 gap-3">
                <FiRefreshCw className="animate-spin text-3xl text-[#ff4600]" />
                <p>회원 정보를 불러오는 중입니다...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* [Header] */}
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600"
                >
                    <FiArrowLeft size={24} />
                </button>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        회원 정보 수정
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        회원 ID:{" "}
                        <span className="font-mono font-bold text-[#ff4600]">
                            #{id}
                        </span>{" "}
                        의 정보를 수정합니다.
                    </p>
                </div>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white rounded-[20px] shadow-sm border border-gray-100 p-8"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="col-span-1 md:col-span-2 pb-2 border-b border-gray-100 mb-2">
                        <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                            <FiInfo className="text-[#ff4600]" />
                            기본 계정 정보
                        </h3>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            아이디
                        </label>
                        <input
                            type="text"
                            value={currentUser?.username || ""}
                            disabled
                            className={twMerge([
                                "w-full px-4 py-3 rounded-xl",
                                "bg-gray-100 border border-gray-200 text-gray-500",
                                "cursor-not-allowed",
                            ])}
                        />
                        <p className="text-xs text-gray-400">
                            아이디는 변경할 수 없습니다.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            이메일 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            className={twMerge([
                                "w-full px-4 py-3 rounded-xl",
                                "bg-gray-50 border border-gray-200",
                                "focus:bg-white focus:border-[#ff4600] focus:ring-1 focus:ring-[#ff4600]",
                                "outline-none transition-all duration-200",
                                errors.email &&
                                    "border-red-500 focus:border-red-500 focus:ring-red-200",
                            ])}
                            {...register("email", {
                                required: "이메일은 필수입니다.",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: "유효한 이메일 형식이 아닙니다.",
                                },
                            })}
                        />
                        {errors.email && (
                            <p className="text-xs text-red-500">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            비밀번호 변경
                            <span className="text-xs font-normal text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                                선택사항
                            </span>
                        </label>
                        <input
                            type="password"
                            placeholder="변경할 경우에만 입력하세요"
                            className={twMerge([
                                "w-full px-4 py-3 rounded-xl",
                                "bg-gray-50 border border-gray-200",
                                "focus:bg-white focus:border-[#ff4600] focus:ring-1 focus:ring-[#ff4600]",
                                "outline-none transition-all duration-200",
                                errors.password &&
                                    "border-red-500 focus:border-red-500 focus:ring-red-200",
                            ])}
                            {...register("password", {
                                minLength: {
                                    value: 8,
                                    message:
                                        "비밀번호는 8자 이상이어야 합니다.",
                                },
                            })}
                        />
                        {errors.password ? (
                            <p className="text-xs text-red-500">
                                {errors.password.message}
                            </p>
                        ) : (
                            <p className="text-xs text-orange-500 flex items-center gap-1">
                                <FiAlertCircle /> 비워두면 기존 비밀번호가
                                유지됩니다.
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            계정 권한
                        </label>
                        <select
                            className={twMerge([
                                "w-full px-4 py-3 rounded-xl",
                                "bg-gray-50 border border-gray-200",
                                "focus:bg-white focus:border-[#ff4600] focus:ring-1 focus:ring-[#ff4600]",
                                "outline-none transition-all duration-200",
                            ])}
                            {...register("role")}
                        >
                            <option value="USER">일반 회원 (USER)</option>
                            <option value="ADMIN">관리자 (ADMIN)</option>
                        </select>
                    </div>

                    <div className="col-span-1 md:col-span-2 pb-2 border-b border-gray-100 mt-4 mb-2">
                        <h3 className="text-lg font-semibold text-gray-700">
                            상세 프로필 정보
                        </h3>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            이름 (실명) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            className={twMerge([
                                "w-full px-4 py-3 rounded-xl",
                                "bg-gray-50 border border-gray-200",
                                "focus:bg-white focus:border-[#ff4600] focus:ring-1 focus:ring-[#ff4600]",
                                "outline-none transition-all duration-200",
                                errors.name &&
                                    "border-red-500 focus:border-red-500 focus:ring-red-200",
                            ])}
                            {...register("name", {
                                required: "이름은 필수입니다.",
                                minLength: {
                                    value: 2,
                                    message: "이름은 2자 이상이어야 합니다.",
                                },
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
                            휴대전화
                        </label>
                        <input
                            type="text"
                            className={twMerge([
                                "w-full px-4 py-3 rounded-xl",
                                "bg-gray-50 border border-gray-200",
                                "focus:bg-white focus:border-[#ff4600] focus:ring-1 focus:ring-[#ff4600]",
                                "outline-none transition-all duration-200",
                                errors.phoneNumber &&
                                    "border-red-500 focus:border-red-500 focus:ring-red-200",
                            ])}
                            {...register("phoneNumber", {
                                pattern: {
                                    value: /^\d{2,3}-\d{3,4}-\d{4}$/,
                                    message: "올바른 전화번호 형식이 아닙니다.",
                                },
                            })}
                        />
                        {errors.phoneNumber && (
                            <p className="text-xs text-red-500">
                                {errors.phoneNumber.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 mt-10 pt-6 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={() => navigate("/admin/users")}
                        className="px-6 py-3 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-[100px] transition-colors"
                    >
                        취소하기
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={twMerge([
                            "flex items-center gap-2",
                            "px-8 py-3",
                            "bg-[#ff4600] text-white",
                            "rounded-[100px]",
                            "text-sm font-bold",
                            "hover:bg-[#e63f00] hover:shadow-lg hover:shadow-[#ff4600]/20",
                            "disabled:opacity-50 disabled:cursor-not-allowed",
                            "transition-all duration-300",
                        ])}
                    >
                        {isSubmitting ? (
                            <span>수정 중...</span>
                        ) : (
                            <>
                                <FiSave className="text-lg" />
                                <span>수정 완료</span>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AdminUserEdit;
