import { useTheme, useThemeUpdate } from "../../../hooks";

const ThemeSwitcher = () => {
    const theme = useTheme();
    const toggleTheme = useThemeUpdate();

    return (
        <div className="theme-switcher me-3">
            <button
                type="button"
                className={`btn btn-sm uch-btn-theme ${theme}`}
                onClick={toggleTheme}
            ></button>
        </div>
    );
};

export default ThemeSwitcher;
