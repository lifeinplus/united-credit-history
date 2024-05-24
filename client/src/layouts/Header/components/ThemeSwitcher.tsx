import { useTheme, useThemeUpdate } from "../../../contexts";

const ThemeSwitcher = () => {
    const theme = useTheme();
    const toggleTheme = useThemeUpdate();

    return (
        <div className="me-3">
            <button
                type="button"
                className={`btn btn-sm uch-btn-theme ${theme}`}
                onClick={toggleTheme}
            ></button>
        </div>
    );
};

export default ThemeSwitcher;
