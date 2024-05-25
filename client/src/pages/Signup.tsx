import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import type { SubmitCallback } from "../types/Auth";

import { Auth } from "../layouts";

const Signup = () => {
    const navigate = useNavigate();
    const { t } = useTranslation(["signup"]);

    const submitCallback: SubmitCallback = ({ data, status }) => {
        if (status === 200) {
            toast.success(data.message);
            navigate("/signin");
        }
    };

    return (
        <Auth
            buttonText={t("buttonText")}
            question={{
                link: "/signin",
                linkText: t("linkText"),
                text: t("questionText"),
            }}
            submit={{
                callback: submitCallback,
                url: "/users/signup",
            }}
            title={t("title")}
        />
    );
};

export default Signup;
