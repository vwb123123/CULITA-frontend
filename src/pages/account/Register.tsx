import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { AxiosError } from "axios";
import { registerUser } from "../../api/auth.api.ts";
import Input from "../../components/common/Input.tsx";
import Button from "../../components/common/Button.tsx";

export interface RegisterFormType {
    username: string;
    password: string;
    password_confirm: string;
    name: string;
    phoneNumber: string;
    email: string;
}

function Register() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormType>();

    const onSubmit = async (data: RegisterFormType) => {
        setError("root", { message: "" });
        try {
            await registerUser(data);
            alert("회원가입이 완료되었습니다. 로그인해주세요.");
            navigate("/login");
        } catch (error) {
            if (error instanceof AxiosError) {
                setError("root", {
                    message:
                        error.response?.data?.message ||
                        "회원가입에 실패했습니다.",
                });
            } else {
                setError("root", { message: "오류가 발생했습니다." });
            }
        }
    };

    return (
        <div
            className={twMerge(
                ["flex", "flex-col", "justify-center", "items-center"],
                ["min-h-[80dvh]", "py-40", "px-4"],
            )}
        >
            <h2
                className={twMerge([
                    "text-4xl",
                    "font-medium",
                    "text-center",
                    "mb-10",
                ])}
            >
                SIGN UP
            </h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={twMerge(
                    ["w-full", "max-w-lg"],
                    ["flex", "flex-col", "gap-5"],
                )}
            >
                <div className={twMerge(["flex", "flex-col", "gap-8"])}>
                    <div className={twMerge(["flex", "flex-col", "gap-2"])}>
                        <span className={twMerge(["text-sm", "font-normal"])}>
                            아이디 *
                        </span>
                        <Input
                            fullWidth={true}
                            placeholder={"영문 소문자/숫자"}
                            type={"text"}
                            registration={register("username", {
                                required: "아이디 항목은 필수값입니다.",
                            })}
                            error={errors.username}
                            className={"h-[40px]"}
                        />
                    </div>
                    <div className={twMerge(["flex", "flex-col", "gap-2"])}>
                        <span className={twMerge(["text-sm", "font-normal"])}>
                            비빌번호 *
                        </span>
                        <Input
                            type={"password"}
                            placeholder={
                                "대소문자/숫자/특수문자 중 2가지 이상, 10자~16자"
                            }
                            error={errors.password}
                            registration={register("password", {
                                required: "비밀번호는 필수값입니다.",
                                minLength: {
                                    value: 10,
                                    message:
                                        "비밀번호는 최소 10자 이상이어야 합니다.",
                                },
                            })}
                            className={"h-[40px]"}
                        />
                    </div>
                    <div className={twMerge(["flex", "flex-col", "gap-2"])}>
                        <span className={twMerge(["text-sm", "font-normal"])}>
                            비밀번호 확인 *
                        </span>
                        <Input
                            type={"password"}
                            placeholder={"비밀번호와 동일하게 입력해주세요"}
                            error={errors.password_confirm}
                            registration={register("password_confirm", {
                                required: "비밀번호 확인을 입력해주세요.",
                                validate: (value) =>
                                    value === watch("password") ||
                                    "비밀번호가 일치하지 않습니다.",
                            })}
                            className={"h-[40px]"}
                        />
                    </div>
                    <div className={twMerge(["flex", "flex-col", "gap-2"])}>
                        <span className={twMerge(["text-sm", "font-normal"])}>
                            이름 *
                        </span>
                        <Input
                            placeholder={"이름"}
                            error={errors.name}
                            registration={register("name", {
                                required: "이름은 필수값입니다.",
                                minLength: {
                                    value: 2,
                                    message: "이름은 2글자 이상 입력해주세요.",
                                },
                            })}
                            className={"h-[40px]"}
                        />
                    </div>

                    <div className={twMerge(["flex", "flex-col", "gap-2"])}>
                        <span className={twMerge(["text-sm", "font-normal"])}>
                            휴대전화 *
                        </span>
                        <Input
                            placeholder={"휴대폰 번호(- 없이 입력)"}
                            error={errors.phoneNumber}
                            registration={register("phoneNumber", {
                                required: "휴대폰 번호는 필수값입니다.",
                                pattern: {
                                    value: /^01([0|1|6|7|8|9])?([0-9]{3,4})?([0-9]{4})$/,
                                    message:
                                        "올바른 휴대폰 번호 형식이 아닙니다. (- 제외)",
                                },
                            })}
                            className={"h-[40px]"}
                        />
                    </div>
                    <div className={twMerge(["flex", "flex-col", "gap-2"])}>
                        <span className={twMerge(["text-sm", "font-normal"])}>
                            이메일 *
                        </span>
                        <Input
                            fullWidth={true}
                            placeholder={"이메일을 입력해주세요."}
                            type={"email"}
                            registration={register("email", {
                                required: "이메일은 필수값입니다.",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "올바른 이메일 형식이 아닙니다.",
                                },
                            })}
                            error={errors.email}
                            className={"h-[40px]"}
                        />
                    </div>
                    {errors.root && (
                        <p
                            className={twMerge([
                                "text-red-600",
                                "text-sm",
                                "text-center",
                                "mb-2",
                            ])}
                        >
                            {errors.root.message}
                        </p>
                    )}
                    <Button
                        type={"submit"}
                        isLoading={isSubmitting}
                        fullWidth={true}
                        size={"md"}
                    >
                        회원가입
                    </Button>
                </div>
            </form>
        </div>
    );
}
export default Register;
