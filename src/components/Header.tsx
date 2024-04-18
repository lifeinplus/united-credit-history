import { useTranslation } from "react-i18next";
import { useTheme } from "../hooks/ThemeContext";

type Props = {
    iconName: string;
    nameSpaces: string[];
};

const Header = ({ iconName, nameSpaces }: Props) => {
    const { t } = useTranslation(nameSpaces);
    const theme = useTheme();

    return (
        <nav className="navbar" data-bs-theme={`${theme}`}>
            <div className="container-fluid">
                <a className="navbar-brand">
                    <i className={`bi ${iconName} me-2`}></i>
                    {t("title")}
                </a>
            </div>
        </nav>
    );
};

export default Header;
