import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

import { langs } from "../../util";

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .use(LanguageDetector)
    .use(Backend)
    .init({
        // debug: true,
        supportedLngs: Object.keys(langs),
        fallbackLng: "en",
        ns: ["credit_history", "header", "personal_data"],
        detection: {
            order: ["path", "cookie", "htmlTag", "localStorage", "subdomain"],
            caches: ["cookie"],
        },
        backend: {
            loadPath: "/assets/locales/{{lng}}/{{ns}}.json",
        },
    });
