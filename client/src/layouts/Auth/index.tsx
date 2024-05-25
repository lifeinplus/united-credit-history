import axios from "axios";
import classNames from "classnames";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import type {
    AuthProps,
    OnChangeHandler,
    SubmitHandler,
    UserData,
} from "../../types/Auth";

const Auth = ({ buttonText, question, submit, title }: AuthProps) => {
    const { t } = useTranslation(["auth"]);

    const [data, setData] = useState<UserData>({
        userName: "",
        password: "",
    });

    const handleOnChange: OnChangeHandler = (e, inputName) => {
        setData({
            ...data,
            [inputName]: e.target.value,
        });
    };

    const handleSubmit: SubmitHandler = (e) => {
        e.preventDefault();

        axios
            .post(submit.url, data)
            .then((response) => submit.callback(response, data))
            .catch((error) => {
                console.error(error);
                const { data } = error.response;
                toast.error(data.message || error.message);
            });
    };

    return (
        <div className={classNames("uch-auth", "my-10", "m-auto")}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <h1 className="h3 mb-3 fw-normal">{title}</h1>
                <div className="form-floating">
                    <input
                        id="floatingUserName"
                        className="form-control"
                        onChange={(e) => handleOnChange(e, "userName")}
                        placeholder={t("userName")}
                        type="text"
                        value={data.userName}
                    />
                    <label htmlFor="floatingUserName">{t("userName")}</label>
                </div>
                <div className="form-floating">
                    <input
                        id="floatingPassword"
                        className="form-control"
                        onChange={(e) => handleOnChange(e, "password")}
                        placeholder={t("password")}
                        type="password"
                        value={data.password}
                    />
                    <label htmlFor="floatingPassword">{t("password")}</label>
                </div>
                <div className="my-3">
                    <label className="form-label">
                        {question.text}{" "}
                        <Link to={question.link}>{question.linkText}</Link>
                    </label>
                </div>
                <button className="btn btn-primary w-100 py-2" type="submit">
                    {buttonText}
                </button>
            </form>
        </div>
    );
};

export default Auth;
