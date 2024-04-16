type Lang = {
    countryCode: string;
    locale: string;
    nativeName: string;
};

export const langs: { [key: string]: Lang } = {
    en: { countryCode: "gb", locale: "en-GB", nativeName: "English" },
    ru: { countryCode: "ru", locale: "ru-RU", nativeName: "Русский" },
    tr: { countryCode: "tr", locale: "tr-TR", nativeName: "Türkçe" },
};

type DateOptions = {
    header: Intl.DateTimeFormatOptions;
    status: Intl.DateTimeFormatOptions;
    time: Intl.DateTimeFormatOptions;
};

const dateOptions: DateOptions = {
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
    const options = dateOptions[type] || {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    };

    return new Intl.DateTimeFormat(locale, options);
}
