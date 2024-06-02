import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

import { useAuth, useAuthUpdate, useTheme } from "../../../contexts";

const Account = () => {
    const auth = useAuth();
    const authUpdate = useAuthUpdate();
    const navigate = useNavigate();
    const theme = useTheme();
    const { t } = useTranslation("header");

    return auth?.userName ? <Out /> : <In />;

    function Out() {
        const handleClick = () => {
            const cookies = new Cookies();
            cookies.remove("token");
            authUpdate({});
            navigate("/login");
        };

        return (
            <div className="dropdown">
                <button
                    className={classNames(
                        "btn",
                        "btn-outline-primary",
                        `uch-btn-outline-primary ${theme}`,
                        "btn-sm",
                        "dropdown-toggle"
                    )}
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <i className="bi bi-person-circle me-2"></i>
                    {auth?.userName}
                </button>
                <ul
                    className={classNames(
                        "dropdown-menu",
                        "dropdown-menu-md-end",
                        theme === "dark" && "dropdown-menu-dark"
                    )}
                >
                    <li>
                        <button
                            className="dropdown-item"
                            onClick={handleClick}
                            type="button"
                        >
                            {t("logout")}
                        </button>
                    </li>
                </ul>
            </div>
        );
    }

    function In() {
        return (
            <div>
                <button
                    className={classNames(
                        "btn",
                        "btn-outline-primary",
                        `uch-btn-outline-primary ${theme}`,
                        "btn-sm"
                    )}
                    onClick={() => navigate("/login")}
                    type="button"
                >
                    <i className="bi bi-box-arrow-in-right me-1"></i>
                </button>
            </div>
        );
    }
};

export default Account;
