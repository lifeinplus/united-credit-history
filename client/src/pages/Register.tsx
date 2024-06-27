import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Auth } from "../layouts";
import type { SubmitCallback } from "../types/Auth";

const Register = () => {
    const navigate = useNavigate();
    const { t } = useTranslation(["register"]);

    const submitCallback: SubmitCallback = ({ data, status }) => {
        if (status === 201) {
            toast.success(data.message);
            navigate("/login");
        }
    };

    return (
        <Auth
            buttonText={t("buttonText")}
            question={{
                link: "/login",
                linkText: t("linkText"),
                text: t("questionText"),
            }}
            submit={{
                callback: submitCallback,
                url: "/auth/register",
            }}
            title={t("title")}
        />
    );
};

export default Register;
