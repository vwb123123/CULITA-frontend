import useAuthStore from "../../../store/useAuthStore.ts";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import DaumPostcodeEmbed, { type Address } from "react-daum-postcode";
import { updateMyInfo, updateMyPassword } from "../../../api/user.api.ts";
import type { User } from "../../../types/user.ts";
import Spinner from "../../../components/common/Spinner.tsx";

interface ProfileForm extends User {
    currentPassword?: string;
    password?: string;
    password_confirm?: string;
}

function MyUserInfo() {
    const { user, setUser } = useAuthStore();
    const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ProfileForm>({
        defaultValues: {
            username: user?.username || "",
            currentPassword: user?.password || "",
            name: user?.name || "",
            email: user?.email || "",
            phoneNumber: user?.phoneNumber || "",
            zipCode: user?.zipCode || "",
            address1: user?.address1 || "",
            address2: user?.address2 || "",
            gender: user?.gender || "MALE",
            birthYear: user?.birthYear || "",
            birthMonth: user?.birthMonth || "",
            birthDay: user?.birthDay || "",
        },
    });

    const password = watch("password");

    const handleCompletePostcode = (data: Address) => {
        setValue("zipCode", data.zonecode);
        setValue("address1", data.address);
        setIsPostcodeOpen(false);
    };

    const onSubmit: SubmitHandler<ProfileForm> = async (data) => {
        setIsLoading(true);

        if (!data.address1 || !data.zipCode) {
            alert("주소 검색을 통해 주소를 입력해주세요.");
            setIsLoading(false);
            return;
        }
        try {
            if (data.password) {
                if (!data.currentPassword) {
                    alert(
                        "비밀번호를 변경하려면 현재 비밀번호를 입력해야 합니다.",
                    );
                    setIsLoading(false);
                    return;
                }
                await updateMyPassword({
                    currentPassword: data.currentPassword,
                    newPassword: data.password,
                    newPasswordConfirm: data.password_confirm || "",
                });
            }
            const formattedPhone = data.phoneNumber.includes("-")
                ? data.phoneNumber
                : data.phoneNumber.replace(
                      /(\d{3})(\d{3,4})(\d{4})/,
                      "$1-$2-$3",
                  );
            const payload = {
                name: data.name,
                phoneNumber: formattedPhone,
                zipCode: data.zipCode || "",
                address1: data.address1 || "",
                address2: data.address2 || "",
                gender: data.gender?.toUpperCase() as "MALE" | "FEMALE",
                birthYear: data.birthYear || "",
                birthMonth: data.birthMonth || "",
                birthDay: data.birthDay || "",
            };

            const response = await updateMyInfo(payload);

            if (response.data) {
                setUser(response.data);
                alert("회원정보가 수정되었습니다.");
            }
        } catch (error) {
            console.log(error);
            alert("수정에 실패했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <Spinner full />;
    }
    return (
        <div className="max-w-[1168px] mx-auto pb-40 px-10">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-[400px] mx-auto space-y-8 text-[12px]"
            >
                {/* 아이디 */}
                <div className="flex flex-col gap-2">
                    <label className="font-bold">아이디 *</label>
                    <input
                        {...register("username")}
                        readOnly
                        className="border border-gray-200 p-3 bg-gray-50 outline-none text-gray-500"
                    />
                </div>

                {/* 현재 비밀번호 (비밀번호 변경 시 필수) */}
                <div className="flex flex-col gap-2">
                    <label className="font-bold">현재 비밀번호</label>
                    <input
                        type="password"
                        {...register("currentPassword")}
                        className="border border-gray-200 p-3 bg-gray-50 outline-none text-gray-500"
                    />
                    <p className="text-[10px] text-gray-400">
                        * 현재 비밀번호는 보안을 위해 수정할 수 없습니다.
                    </p>
                </div>

                {/* 새 비밀번호 */}
                <div className="flex flex-col gap-2">
                    <label className="font-bold">새 비밀번호 *</label>
                    <input
                        type="password"
                        {...register("password", {
                            minLength: {
                                value: 8,
                                message: "8자 이상 입력해주세요.",
                            },
                        })}
                        placeholder="변경 시에만 입력해주세요 (대/소문자/숫자/특수문자 조합)"
                        className="border border-gray-200 p-3 outline-none focus:border-black"
                    />
                    {errors.password && (
                        <span className="text-red-500 text-[10px]">
                            {errors.password.message}
                        </span>
                    )}
                </div>

                {/* 새 비밀번호 확인 */}
                <div className="flex flex-col gap-2">
                    <label className="font-bold">새 비밀번호 확인 *</label>
                    <input
                        type="password"
                        {...register("password_confirm", {
                            validate: (value) =>
                                value === password ||
                                "비밀번호가 일치하지 않습니다.",
                        })}
                        placeholder="변경할 비밀번호를 한번 더 입력해주세요."
                        className="border border-gray-200 p-3 outline-none focus:border-black"
                    />
                    {errors.password_confirm && (
                        <span className="text-red-500 text-[10px]">
                            {errors.password_confirm.message}
                        </span>
                    )}
                </div>

                {/* 이름 */}
                <div className="flex flex-col gap-2">
                    <label className="font-bold">이름 *</label>
                    <input
                        {...register("name", { required: true })}
                        className="border border-gray-200 p-3 outline-none focus:border-black"
                    />
                </div>

                {/* 주소 */}
                <div className="flex flex-col gap-2">
                    <label className="font-bold">주소</label>
                    <div className="flex gap-2 mb-2">
                        <input
                            {...register("zipCode")}
                            readOnly
                            className="border border-gray-200 p-3 flex-2 bg-gray-50"
                        />
                        <button
                            type="button"
                            onClick={() => setIsPostcodeOpen(!isPostcodeOpen)}
                            className="border border-black px-4 py-2 hover:bg-black hover:text-white transition-all"
                        >
                            주소검색
                        </button>
                    </div>

                    {/* 우편번호 모달 영역 */}
                    {isPostcodeOpen && (
                        <div className="border border-black p-2 relative bg-white z-50 shadow-lg">
                            <DaumPostcodeEmbed
                                onComplete={handleCompletePostcode}
                            />
                            <button
                                type="button"
                                onClick={() => setIsPostcodeOpen(false)}
                                className="absolute top-2 right-4 z-[60] font-bold p-2"
                            >
                                ✕
                            </button>
                        </div>
                    )}

                    <input
                        {...register("address1")}
                        className="border border-gray-200 p-3 w-full mb-2"
                        placeholder="기본주소"
                    />
                    <input
                        {...register("address2")}
                        className="border border-gray-200 p-3 w-full"
                        placeholder="상세주소"
                    />
                </div>

                {/* 휴대전화 */}
                <div className="flex flex-col gap-2">
                    <label className="font-bold">휴대전화 *</label>
                    <input
                        {...register("phoneNumber", {
                            required: "휴대전화 번호를 입력해주세요.",
                            pattern: {
                                value: /^[0-9]{10,11}$|^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$/,
                                message: "올바른 번호 형식을 입력해주세요.",
                            },
                        })}
                        placeholder="010-0000-0000"
                        className="border border-gray-200 p-3 outline-none focus:border-black"
                    />
                    {errors.phoneNumber && (
                        <span className="text-red-500 text-[10px]">
                            {errors.phoneNumber.message}
                        </span>
                    )}
                </div>

                {/* 이메일 */}
                <div className="flex flex-col gap-2">
                    <label className="font-bold">이메일 *</label>
                    <input
                        {...register("email", { required: true })}
                        className="border border-gray-200 p-3 outline-none focus:border-black"
                    />
                </div>

                {/* 추가 정보 섹션 */}
                <div className="pt-8 border-t border-gray-100 space-y-6">
                    <p className="font-bold text-[14px]">추가정보</p>

                    {/* 성별 */}
                    <div className="flex gap-10 items-center">
                        <label className="font-medium w-20">성별</label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    {...register("gender")}
                                    value="MALE"
                                    className="accent-black"
                                />{" "}
                                남자
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    {...register("gender")}
                                    value="FEMALE"
                                    className="accent-black"
                                />{" "}
                                여자
                            </label>
                        </div>
                    </div>

                    {/* 생년월일 */}
                    <div className="flex gap-10 items-center">
                        <label className="font-medium w-20">생년월일</label>
                        <div className="flex items-center gap-2">
                            <input
                                {...register("birthYear")}
                                className="border border-gray-200 p-2 w-20 text-center"
                            />
                            <span>년</span>
                            <input
                                {...register("birthMonth")}
                                className="border border-gray-200 p-2 w-16 text-center"
                            />
                            <span>월</span>
                            <input
                                {...register("birthDay")}
                                className="border border-gray-200 p-2 w-16 text-center"
                            />
                            <span>일</span>
                        </div>
                    </div>
                </div>

                {/* 버튼 영역 */}
                <div className="pt-10 flex flex-col gap-2">
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-4 font-bold hover:bg-gray-800 transition-all"
                    >
                        {isLoading ? "수정 중..." : "회원정보 수정"}
                    </button>
                    <button
                        type="button"
                        className="w-full border border-gray-200 py-4 text-gray-400 hover:text-black transition-all"
                    >
                        취소
                    </button>
                </div>
            </form>
        </div>
    );
}

export default MyUserInfo;
