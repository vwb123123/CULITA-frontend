import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { AxiosError } from "axios";
import type { LoginFormType } from "../../types/user.ts";
import { loginUser } from "../../api/auth.api.ts";
import Input from "../../components/common/Input.tsx";
import Button from "../../components/common/Button.tsx";
import useAuthStore from "../../store/useAuthStore.ts";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuthStore();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormType>();

    const onSubmit = async (data: LoginFormType) => {
        setError("root", { message: "" });
        try {
            const response = await loginUser(data);

            // 사용자 정보를 저장
            login(response.data.token, response.data.user);

            alert("로그인 되었습니다.");
            navigate("/");
        } catch (error) {
            if (error instanceof AxiosError) {
                setError("root", {
                    message:
                        error.response?.data.message ||
                        "로그인이 실패했습니다.",
                });
            } else {
                setError("root", {
                    message: "알 수 없는 오류가 발생했습니다.",
                });
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
                LOGIN
            </h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={twMerge([
                    "w-full",
                    "justify-center",
                    "max-w-[400px]",
                ])}
            >
                <div className={twMerge(["flex", "flex-col", "gap-4"])}>
                    <span className={twMerge(["text-sm", "font-normal"])}>
                        아이디
                    </span>
                    <Input
                        fullWidth={true}
                        placeholder={"아이디를 입력해주세요"}
                        type={"text"}
                        registration={register("username", {
                            required: "아이디 항목은 필수값입니다.",
                        })}
                        error={errors.username}
                        className={"h-[40px]"}
                    />
                    <span className={twMerge(["text-sm", "font-normal"])}>
                        비밀번호
                    </span>
                    <Input
                        type={"password"}
                        placeholder={"비밀번호를 입력해주세요"}
                        error={errors.password}
                        registration={register("password", {
                            required: "비밀번호 항목은 필수값입니다.",
                            minLength: {
                                value: 6,
                                message:
                                    "비밀번호는 최소 6자 이상이어야 합니다.",
                            },
                        })}
                        className={twMerge(["mb-3", "h-[40px]"])}
                    />
                </div>
                {errors.root && (
                    <p
                        className={twMerge([
                            "text-red-600",
                            "text-sm",
                            "text-center",
                            "mb-3",
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
                    로그인
                </Button>
                <div
                    className={twMerge([
                        "mt-6",
                        "w-full",
                        "flex",
                        "justify-end",
                    ])}
                >
                    <Link
                        to={"/register"}
                        className={twMerge([
                            "text-gray-500",
                            "hover:text-black",
                        ])}
                    >
                        회원가입
                    </Link>
                </div>
            </form>
        </div>
    );
}
export default Login;
