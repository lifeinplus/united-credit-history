import { DateOptions, Lang } from "../types";

export const langs: Record<string, Lang> = {
    en: { countryCode: "gb", locale: "en-GB", nativeName: "English" },
    ru: { countryCode: "ru", locale: "ru-RU", nativeName: "Русский" },
    tr: { countryCode: "tr", locale: "tr-TR", nativeName: "Türkçe" },
};

const dateOptions: DateOptions = {
    date: {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    },

    header: {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    },

    status: {
        month: "numeric",
        year: "numeric",
        timeZone: "Europe/Moscow",
    },

    time: {
        hour: "numeric",
        minute: "numeric",
    },
};

export function getDateFormat(locale: string, type: keyof DateOptions) {
    const options = dateOptions[type];
    return new Intl.DateTimeFormat(locale, options);
}
