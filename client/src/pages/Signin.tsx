import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import type { SubmitCallback } from "../types/Auth";

import { Auth } from "../layouts";
import { useProfileUpdate } from "../contexts";

const Signin = () => {
    const navigate = useNavigate();
    const profileUpdate = useProfileUpdate();
    const { t } = useTranslation(["signin"]);

    const submitCallback: SubmitCallback = ({ status }, { userName }) => {
        if (status === 200) {
            profileUpdate({ userName });
            navigate("/");
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
