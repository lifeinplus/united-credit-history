import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";
import Cookies from "universal-cookie";

import { useThemeUpdate } from "./contexts";
import { Layout, PersistLogin, RequireAuth } from "./layouts";

import {
    About,
    Login,
    NotFound,
    Register,
    Report,
    Reports,
    Unauthorized,
    Users,
} from "./pages";

import { langs } from "./utils";

const App = () => {
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
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/unauthorized" element={<Unauthorized />} />

                <Route element={<PersistLogin />}>
                    <Route element={<RequireAuth allowedRoles={[2020]} />}>
                        <Route path="/reports">
                            <Route index element={<Reports />} />
                            <Route
                                path=":reportId"
                                element={
                                    <Report
                                        handleExtend={handleExtend}
                                        showExtendedData={showExtendedData}
                                    />
                                }
                            />
                        </Route>
                        <Route element={<RequireAuth allowedRoles={[1010]} />}>
                            <Route path="/users" element={<Users />} />
                        </Route>
                    </Route>
                </Route>

                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};

export default App;
