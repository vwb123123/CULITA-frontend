import { useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";
import { FiArrowLeft, FiSave, FiInfo } from "react-icons/fi";
import { type SubmitHandler, useForm } from "react-hook-form";
import type { CreateUserRequest } from "../../../types/admin.user.ts";
import { createUser } from "../../../api/admin.user.api.ts";
import { AxiosError } from "axios";

function AdminUserCreate() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CreateUserRequest>({
        defaultValues: {
            username: "",
            password: "",
            name: "",
            email: "",
            phoneNumber: "",
            role: "USER",
        },
    });

    const onSubmit: SubmitHandler<CreateUserRequest> = async (data) => {
        if (!confirm("이 정보로 회원을 등록하시겠습니까?")) return;

        try {
            await createUser(data);
            alert("회원이 성공적으로 등록되었습니다.");
            navigate("/admin/users");
        } catch (error) {
            console.error("회원 생성 실패:", error);
            let errorMessage = "회원 등록 중 오류가 발생했습니다.";
            if (error instanceof AxiosError)
                errorMessage = error.response?.data?.message;

            alert(errorMessage);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600"
                >
                    <FiArrowLeft size={24} />
                </button>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        회원 등록
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        새로운 회원을 수동으로 생성합니다. 필수 정보를
                        입력해주세요.
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
                            아이디 (Username){" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="예: user1234"
                            className={twMerge([
                                "w-full px-4 py-3 rounded-xl",
                                "bg-gray-50 border border-gray-200",
                                "focus:bg-white focus:border-[#ff4600] focus:ring-1 focus:ring-[#ff4600]",
                                "outline-none transition-all duration-200",
                                errors.username &&
                                    "border-red-500 focus:border-red-500 focus:ring-red-200",
                            ])}
                            {...register("username", {
                                required: "아이디는 필수입니다.",
                                minLength: {
                                    value: 4,
                                    message: "최소 4자 이상 입력해주세요.",
                                },
                            })}
                        />
                        {errors.username && (
                            <p className="text-xs text-red-500">
                                {errors.username.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            이메일 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            placeholder="user@example.com"
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
                        <label className="text-sm font-medium text-gray-700">
                            비밀번호 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            placeholder="8자 이상 입력"
                            className={twMerge([
                                "w-full px-4 py-3 rounded-xl",
                                "bg-gray-50 border border-gray-200",
                                "focus:bg-white focus:border-[#ff4600] focus:ring-1 focus:ring-[#ff4600]",
                                "outline-none transition-all duration-200",
                                errors.password &&
                                    "border-red-500 focus:border-red-500 focus:ring-red-200",
                            ])}
                            {...register("password", {
                                required: "비밀번호는 필수입니다.",
                                minLength: {
                                    value: 8,
                                    message:
                                        "비밀번호는 8자 이상이어야 합니다.",
                                },
                            })}
                        />
                        {errors.password && (
                            <p className="text-xs text-red-500">
                                {errors.password.message}
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
                            placeholder="홍길동"
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
                            placeholder="010-0000-0000"
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
                                    message:
                                        "올바른 전화번호 형식이 아닙니다. (예: 010-1234-5678)",
                                },
                            })}
                        />
                        {errors.phoneNumber ? (
                            <p className="text-xs text-red-500">
                                {errors.phoneNumber.message}
                            </p>
                        ) : (
                            <p className="text-xs text-gray-400">
                                '-'를 포함하여 입력해주세요.
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
                            <span>처리 중...</span>
                        ) : (
                            <>
                                <FiSave className="text-lg" />
                                <span>회원 등록 완료</span>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AdminUserCreate;
