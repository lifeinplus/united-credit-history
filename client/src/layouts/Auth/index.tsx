import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import axios from "../../api/axios";

import type {
    AuthProps,
    OnChangeHandler,
    SubmitHandler,
    UserData,
} from "../../types/Auth";

const Auth = ({ buttonText, question, submit, title }: AuthProps) => {
    const { t } = useTranslation(["auth"]);
    const userNameRef = useRef<HTMLInputElement>(null);
    const [validated, setValidated] = useState(false);

    const [data, setData] = useState<UserData>({
        userName: "",
        password: "",
    });

    useEffect(() => {
        userNameRef.current?.focus();
    }, []);

    const handleOnChange: OnChangeHandler = (e, inputName) => {
        setData({
            ...data,
            [inputName]: e.target.value,
        });
    };

    const handleSubmit: SubmitHandler = (e) => {
        e.preventDefault();
        setValidated(true);

        axios
            .post(submit.url, data, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            })
            .then((response) => submit.callback(response, data))
            .catch((error) => {
                console.error(error);
                const { message, response } = error;

                if (!response) {
                    toast.error(message);
                    return;
                }

                const { data } = response;
                toast.error(data.message || message);
            });
    };

    return (
        <section className={classNames("uch-auth", "my-10", "m-auto")}>
            <h1 className="h3 mb-3 fw-normal">{title}</h1>
            <form
                className={validated ? "was-validated" : undefined}
                noValidate
                onSubmit={handleSubmit}
            >
                <div className="form-floating">
                    <input
                        id="floatingUserName"
                        className="form-control"
                        onChange={(e) => handleOnChange(e, "userName")}
                        placeholder={t("userName")}
                        ref={userNameRef}
                        required
                        type="text"
                        value={data.userName}
                    />
                    <label htmlFor="floatingUserName">{t("userName")}</label>
                </div>
                <div className="form-floating">
                    <input
                        id="floatingPassword"
                        className="form-control"
                        minLength={4}
                        onChange={(e) => handleOnChange(e, "password")}
                        placeholder={t("password")}
                        type="password"
                        required
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
        </section>
    );
};

export default Auth;
