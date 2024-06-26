import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../contexts";
import { Auth } from "../layouts";
import { SubmitCallback } from "../types/Auth";

const Login = () => {
    const { setAuth } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const { t } = useTranslation(["login"]);

    const from = location.state?.from?.pathname || "/reports";

    const submitCallback: SubmitCallback = ({ data, status }, userName) => {
        const { accessToken, roles } = data;

        if (status === 200) {
            setAuth({ accessToken, roles, userName });
            navigate(from, { replace: true });
        }
    };

    return (
        <Auth
            buttonText={t("buttonText")}
            question={{
                link: "/register",
                linkText: t("linkText"),
                text: t("questionText"),
            }}
            submit={{
                callback: submitCallback,
                url: "/auth/login",
            }}
            title={t("title")}
        />
    );
};

export default Login;
