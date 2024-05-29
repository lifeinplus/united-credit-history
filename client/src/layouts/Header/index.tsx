import classNames from "classnames";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import { useTheme } from "../../contexts";

import Account from "./components/Account";
import LanguageSwitcher from "./components/LanguageSwitcher";
import ThemeSwitcher from "./components/ThemeSwitcher";

const Header = () => {
    const { t } = useTranslation(["header"]);
    const theme = useTheme();

    useEffect(() => {
        document.title = t("title");
    }, [t]);

    return (
        <header>
            <nav
                className={classNames(
                    "navbar",
                    `navbar-${theme}`,
                    "navbar-expand-md",
                    `bg-${theme}`,
                    theme === "light" ? "shadow" : "uch-shadow-dark"
                )}
            >
                <div className="container-fluid">
                    <NavLink
                        className="navbar-brand d-flex align-items-center me-10"
                        reloadDocument
                        to="/"
                    >
                        <span className="f-w-5 d-block me-2">
                            <img
                                alt="logo_color"
                                className="w-100 align-text-top"
                                src="/logo_color.png"
                            />
                        </span>
                        <span>{t("title")}</span>
                    </NavLink>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse justify-content-end"
                        id="navbarSupportedContent"
                    >
                        <form className="d-flex">
                            <ThemeSwitcher />
                            <LanguageSwitcher />
                            <Account />
                        </form>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
