import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { twMerge } from "tailwind-merge";
import { FiArrowLeft, FiSave, FiInfo, FiRefreshCw } from "react-icons/fi";
import { useForm, type SubmitHandler } from "react-hook-form";
import { fetchUser, updateUser } from "../../../api/admin.user.api";
import { AxiosError } from "axios";
import type {
    AdminUserData,
    UpdateUserRequest,
} from "../../../types/admin.user.ts";
import DaumPostcodeEmbed, { type Address } from "react-daum-postcode";

function AdminUserEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [currentUser, setCurrentUser] = useState<AdminUserData | null>(null);
    const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
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
                    phoneNumber: userData.phoneNumber || "",
                    role: userData.role,
                    gender: userData.gender || "MALE",
                    birthYear: userData.birthYear || "",
                    birthMonth: userData.birthMonth || "",
                    birthDay: userData.birthDay || "",
                    zipCode: userData.zipCode || "",
                    address1: userData.address1 || "",
                    address2: userData.address2 || "",
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
            password: data.password || undefined,
        };

        if (!confirm("회원 정보를 수정하시겠습니까?")) return;

        try {
            await updateUser(Number(id), payload);
            alert("회원 정보가 수정되었습니다.");
            navigate("/admin/users");
        } catch (error) {
            console.error("수정 실패:", error);
            if (error instanceof AxiosError && error.response) {
                const errorDetails = JSON.stringify(
                    error.response.data.errors,
                    null,
                    2,
                );
                alert(`검증 에러 발생!\n${errorDetails}`);
                console.log("상세에러:", error.response.data.errors);
            }
        }
    };

    const handleComplete = (data: Address) => {
        let fullAddress = data.address;
        let extraAddress = "";

        if (data.addressType === "R") {
            if (data.bname !== "") extraAddress += data.bname;
            if (data.buildingName !== "") {
                extraAddress +=
                    extraAddress !== ""
                        ? `, ${data.buildingName}`
                        : data.buildingName;
            }
            fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
        }
        setValue("zipCode", data.zonecode);
        setValue("address1", fullAddress);
        setIsPostcodeOpen(false);
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
                            <FiInfo className="text-[#ff4600]" /> 기본 계정 정보
                        </h3>
                    </div>

                    {/* 아이디 (수정 불가) */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            아이디
                        </label>
                        <input
                            type="text"
                            value={currentUser?.username || ""}
                            disabled
                            className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-200 text-gray-500 cursor-not-allowed"
                        />
                    </div>

                    {/* 이메일 */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            이메일 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            className={twMerge([
                                "w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#ff4600] outline-none transition-all",
                                errors.email &&
                                    "border-red-500 focus:border-red-500",
                            ])}
                            {...register("email", {
                                required: "이메일은 필수입니다.",
                            })}
                        />
                        {errors.email && (
                            <p className="text-xs text-red-500">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* 비밀번호 */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            비밀번호 변경
                        </label>
                        <input
                            type="password"
                            placeholder="변경 시에만 입력"
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#ff4600] outline-none transition-all"
                            {...register("password", {
                                minLength: {
                                    value: 8,
                                    message: "8자 이상 입력하세요.",
                                },
                            })}
                        />
                        {errors.password && (
                            <p className="text-xs text-red-500">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* 권한 */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            계정 권한
                        </label>
                        <select
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#ff4600] outline-none transition-all"
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

                    {/* 이름 */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            이름 (실명) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            className={twMerge([
                                "w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#ff4600] outline-none transition-all",
                                errors.name &&
                                    "border-red-500 focus:border-red-500",
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

                    {/* 휴대전화 */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            휴대전화
                        </label>
                        <input
                            type="text"
                            placeholder="010-0000-0000"
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#ff4600] outline-none transition-all"
                            {...register("phoneNumber")}
                        />
                    </div>

                    {/* 성별 */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            성별
                        </label>
                        <div className="flex gap-6 py-3">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    value="MALE"
                                    {...register("gender")}
                                    className="w-4 h-4 accent-[#ff4600]"
                                />
                                <span className="text-sm text-gray-600">
                                    남성
                                </span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    value="FEMALE"
                                    {...register("gender")}
                                    className="w-4 h-4 accent-[#ff4600]"
                                />
                                <span className="text-sm text-gray-600">
                                    여성
                                </span>
                            </label>
                        </div>
                    </div>

                    {/*  생년월일 */}
                    <div className="col-span-1 md:col-span-2 space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            생년월일
                        </label>
                        <div className="grid grid-cols-3 gap-4">
                            <input
                                type="text"
                                placeholder="년(YYYY)"
                                className="px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#ff4600] outline-none transition-all"
                                {...register("birthYear")}
                            />
                            <input
                                type="text"
                                placeholder="월(MM)"
                                className="px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#ff4600] outline-none transition-all"
                                {...register("birthMonth")}
                            />
                            <input
                                type="text"
                                placeholder="일(DD)"
                                className="px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#ff4600] outline-none transition-all"
                                {...register("birthDay")}
                            />
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-2 pb-2 border-b border-gray-100 mt-4 mb-2">
                        <h3 className="text-lg font-semibold text-gray-700">
                            주소 정보
                        </h3>
                    </div>

                    <div className="col-span-1 md:col-span-2 space-y-4">
                        {/* 우편번호 */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700">
                                우편번호
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="우편번호"
                                    readOnly
                                    className="w-32 px-4 py-3 rounded-xl bg-gray-100 border border-gray-200 text-gray-500 outline-none flex-2"
                                    {...register("zipCode", {
                                        required: "우편번호는 필수입니다.",
                                    })}
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setIsPostcodeOpen(!isPostcodeOpen)
                                    }
                                    className="px-4 py-2 bg-gray-800 text-white rounded-xl text-sm font-medium hover:bg-gray-700 transition-colors"
                                >
                                    우편번호 찾기
                                </button>
                            </div>
                        </div>

                        {/* 기본 주소 */}

                        {isPostcodeOpen && (
                            <div className="border border-gray-200 rounded-xl overflow-hidden mb-4">
                                <DaumPostcodeEmbed
                                    onComplete={handleComplete}
                                />
                            </div>
                        )}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700">
                                기본 주소
                            </label>
                            <input
                                type="text"
                                placeholder="주소를 입력하세요"
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#ff4600] outline-none transition-all"
                                {...register("address1", {
                                    required: "기본 주소는 필수입니다.",
                                })}
                            />
                            {errors.address1 && (
                                <p className="text-xs text-red-500">
                                    {errors.address1.message}
                                </p>
                            )}
                        </div>

                        {/* 상세 주소 */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700">
                                상세 주소
                            </label>
                            <input
                                type="text"
                                placeholder="상세 주소를 입력하세요"
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#ff4600] outline-none transition-all"
                                {...register("address2")}
                            />
                        </div>
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
                        className="flex items-center gap-2 px-8 py-3 bg-[#ff4600] text-white rounded-[100px] text-sm font-bold hover:bg-[#e63f00] disabled:opacity-50 transition-all"
                    >
                        {isSubmitting ? (
                            <FiRefreshCw className="animate-spin" />
                        ) : (
                            <FiSave size={18} />
                        )}
                        <span>{isSubmitting ? "수정 중..." : "수정 완료"}</span>
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AdminUserEdit;
