import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuthStore from "../../store/useAuthStore.ts";

const CheckOrder = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuthStore();

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/mypage");
        } else {
            alert("로그인이 필요한 서비스입니다.");
            navigate("/login");
        }
    }, [isLoggedIn, navigate]);

    return null;
};

export default CheckOrder;
