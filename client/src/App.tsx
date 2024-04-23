import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";
import Cookies from "universal-cookie";

import { Footer, Header } from "./layouts";
import { Reports } from "./pages";
import { useThemeUpdate } from "./hooks/ThemeContext";
import { langs } from "./util";

function App() {
    const { i18n } = useTranslation();
    const toggleTheme = useThemeUpdate();

    const cookies = new Cookies();
    const extended_data = cookies.get("extended_data") || "no";
    const [showExtendedData, setShowExtendedData] = useState(
        extended_data === "yes" ? true : false
    );

    document.onkeydown = ({ altKey, code, shiftKey }) => {
        if (!altKey) return;

        if (code === "KeyE") {
            handleExtend();
        }

        if (code === "KeyL") {
            changeLanguage(shiftKey);
        }

        if (code === "KeyT") {
            toggleTheme();
        }
    };

    function changeLanguage(shiftKey: boolean) {
        const keys = Object.keys(langs);
        const resolvedLanguage = i18n.resolvedLanguage ?? "gb";
        const resolvedIndex = keys.indexOf(resolvedLanguage);

        let nextIndex = shiftKey ? resolvedIndex - 1 : resolvedIndex + 1;

        if (nextIndex >= keys.length) {
            nextIndex = 0;
        }

        if (nextIndex < 0) {
            nextIndex = keys.length - 1;
        }

        i18n.changeLanguage(keys[nextIndex]);
    }

    function handleExtend() {
        const value = !showExtendedData;
        setShowExtendedData(value);
        cookies.set("extended_data", value ? "yes" : "no");
    }

    return (
        <>
            <Header />
            <main>
                <div className="container-fluid">
                    <Routes>
                        <Route path="/" element={<Reports />} />
                    </Routes>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default App;