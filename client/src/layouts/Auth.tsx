import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { axiosPrivate } from "../api/axios";
import { useInput } from "../hooks";
import { AuthProps, SubmitHandler } from "../types/Auth";

const Auth = ({ buttonText, question, submit, title }: AuthProps) => {
    const { t } = useTranslation(["auth"]);
    const userNameRef = useRef<HTMLInputElement>(null);
    const [validated, setValidated] = useState(false);

    const [userName, userNameAttributes] = useInput("userName", "");
    const [password, setPassword] = useState("");

    useEffect(() => {
        userNameRef.current?.focus();
    }, []);

    const handleSubmit: SubmitHandler = (e) => {
        e.preventDefault();
        setValidated(true);

        axiosPrivate
            .post(submit.url, { userName, password })
            .then((response) => submit.callback(response, userName))
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
                        placeholder={t("userName")}
                        ref={userNameRef}
                        required
                        type="text"
                        {...userNameAttributes}
                    />
                    <label htmlFor="floatingUserName">{t("userName")}</label>
                </div>
                <div className="form-floating">
                    <input
                        id="floatingPassword"
                        className="form-control"
                        minLength={4}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={t("password")}
                        type="password"
                        required
                        value={password}
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
