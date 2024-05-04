import { useTranslation } from "react-i18next";

import { useTheme } from "../hooks/ThemeContext";
import { getDateFormat, langs } from "../util";

type HeaderField = { caption: string | undefined; value: string | undefined };

type HeaderProps = {
    date?: HeaderField;
    iconName: string;
    nameSpaces: string[];
    number?: HeaderField;
};

const Header = ({ date, iconName, nameSpaces, number }: HeaderProps) => {
    const { i18n, t } = useTranslation(nameSpaces);
    const theme = useTheme();

    const headerDate = date && date.value && getHeaderDate(date.value);

    return (
        <nav className="navbar" data-bs-theme={`${theme}`}>
            <div className="container-fluid">
                <a className="navbar-brand">
                    <i className={`bi ${iconName} me-2`}></i>
                    {t("title")}
                </a>
                {date && number && (
                    <form className="d-flex">
                        <span className="navbar-text">
                            <HeaderField
                                caption={number.caption}
                                value={number.value}
                            />
                            <HeaderField
                                caption={date.caption}
                                value={headerDate}
                            />
                        </span>
                    </form>
                )}
            </div>
        </nav>
    );

    function HeaderField({ caption, value }: HeaderField) {
        return (
            caption && (
                <>
                    <small className="px-2">{t(caption)}</small>
                    <div className={`d-inline uch-navbar-text user-select-all`}>
                        {value}
                    </div>
                </>
            )
        );
    }

    function getHeaderDate(value: string) {
        const lang = langs[i18n.resolvedLanguage || "gb"];
        const dateFormat = getDateFormat(lang.locale, "header");
        const milliseconds = Date.parse(value);

        return dateFormat.format(milliseconds);
    }
};

export default Header;
