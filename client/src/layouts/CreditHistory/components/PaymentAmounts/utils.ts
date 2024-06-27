import {
    AmountField,
    AmountContextField,
} from "../../../../types/CreditHistory";

export const obligationFields: AmountField[] = [
    { sysName: "chbLoansAmount", type: "loan" },
    { sysName: "chbLoansAmountGbp", country: "gb", hide: true, type: "loan" },
    { sysName: "chbLoansAmountRub", country: "ru", hide: true, type: "loan" },
    { sysName: "chbLoansAmountTry", country: "tr", hide: true, type: "loan" },
    { sysName: "chbCreditCardsAmount", type: "card" },
    {
        sysName: "chbCreditCardsAmountGbp",
        country: "gb",
        hide: true,
        type: "card",
    },
    {
        sysName: "chbCreditCardsAmountRub",
        country: "ru",
        hide: true,
        type: "card",
    },
    {
        sysName: "chbCreditCardsAmountTry",
        country: "tr",
        hide: true,
        type: "card",
    },
];

export const paymentFields: AmountContextField[] = [
    { sysName: "chbPaymentsAmount", type: "chb", context: "primary" },
    { sysName: "chbPaymentsAmountGbp", type: "chb", country: "gb" },
    { sysName: "chbPaymentsAmountRub", type: "chb", country: "ru" },
    { sysName: "chbPaymentsAmountTry", type: "chb", country: "tr" },
    {
        sysName: "flcPaymentsAmount",
        type: "flc",
        extended: true,
        context: "info",
    },
    {
        sysName: "flcPaymentsAmountGbp",
        type: "flc",
        extended: true,
        country: "gb",
        hide: true,
    },
    {
        sysName: "flcPaymentsAmountRub",
        type: "flc",
        extended: true,
        country: "ru",
        hide: true,
    },
    {
        sysName: "flcPaymentsAmountTry",
        type: "flc",
        extended: true,
        country: "tr",
        hide: true,
    },
];
