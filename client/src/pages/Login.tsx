import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuthUpdate } from "../contexts";
import { Auth } from "../layouts";
import type { SubmitCallback } from "../types/Auth";

const Login = () => {
    const authUpdate = useAuthUpdate();
    const location = useLocation();
    const navigate = useNavigate();
    const { t } = useTranslation(["login"]);

    const from = location.state?.from?.pathname || "/reports";

    const submitCallback: SubmitCallback = (response, { userName }) => {
        const { data, status } = response;

        if (status === 200) {
            authUpdate({ userName, accessToken: data.accessToken });
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
                url: "/users/login",
            }}
            title={t("title")}
        />
    );
};

export default Login;
