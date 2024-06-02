import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

import type { SubmitCallback } from "../types/Auth";

import { Auth } from "../layouts";
import { useProfileUpdate } from "../contexts";

const Signin = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const profileUpdate = useProfileUpdate();
    const { t } = useTranslation(["signin"]);

    const from = location.state?.from?.pathname || "/";

    const submitCallback: SubmitCallback = (response, { userName }) => {
        const { data, status } = response;

        if (status === 200) {
            profileUpdate({ userName, accessToken: data.accessToken });
            navigate(from, { replace: true });
        }
    };

    return (
        <Auth
            buttonText={t("buttonText")}
            question={{
                link: "/signup",
                linkText: t("linkText"),
                text: t("questionText"),
            }}
            submit={{
                callback: submitCallback,
                url: "/users/signin",
            }}
            title={t("title")}
        />
    );
};

export default Signin;
