import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

import { useProfile, useTheme } from "../../../contexts";
import { useProfileUpdate } from "../../../contexts/ProfileContext";
import { useTranslation } from "react-i18next";

const Signin = () => {
    const navigate = useNavigate();
    const profile = useProfile();
    const profileUpdate = useProfileUpdate();
    const theme = useTheme();
    const { t } = useTranslation("header");

    return profile.userName ? <Out /> : <In />;

    function Out() {
        const handleClick = () => {
            const cookies = new Cookies();
            cookies.remove("token");
            profileUpdate({});
            navigate("/signin");
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
                    {profile.userName}
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
                            {t("signout")}
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
                    onClick={() => navigate("/signin")}
                    type="button"
                >
                    <i className="bi bi-box-arrow-in-right me-1"></i>
                </button>
            </div>
        );
    }
};

export default Signin;
