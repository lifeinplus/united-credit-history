export type AmountField = {
    sysName: string;
    type: string;
    country?: string;
    hide?: boolean;
};

export interface AmountContextField extends AmountField {
    chb?: string;
    flc?: string;
    context?: string;
    extended?: boolean;
}

export interface AmountListField extends AmountContextField {
    name: string;
    value: string;
}

export type ListField = {
    sysName: string;
    type: string;
};

export type ScoreStyle = {
    min: number;
    max: number;
    style: string;
};

export type TableColumn = {
    alignment: string;
    badgeEqual?: string;
    badgeMore?: number;
    badgeType?: string;
    dataType: string;
    extended?: boolean;
    isLink?: boolean;
    name?: string;
    sortable?: boolean;
    sysName: string;
    sysNameStatus?: string;
    tooltip?: boolean;
};

export interface ICommon extends Record<string, number> {
    chbCreditCardsAmountGbp: number;
    chbCreditCardsAmountRub: number;
    chbCreditCardsAmountTry: number;
    chbLoansAmountGbp: number;
    chbLoansAmountRub: number;
    chbLoansAmountTry: number;
    chbPaymentsAmountGbp: number;
    chbPaymentsAmountRub: number;
    chbPaymentsAmountTry: number;
    flcPaymentsAmountGbp: number;
    flcPaymentsAmountRub: number;
    flcPaymentsAmountTry: number;
    score: number;
}

export interface ILoan extends Record<string, string> {
    businessCategory: string;
    chbPayment: string;
    closeDate: string;
    contractPeriod: string;
    creationDate: string;
    currency: string;
    delinquencyAmount: string;
    guarantee: string;
    lastUpdateDate: string;
    loanAmount: string;
    loanNumberNchb: string;
    loanType: string;
    monthsNumberBeforeCloseDate: string;
    monthsNumberSinceCreationDate: string;
    paymentPeriod: string;
    status: string;
    unpaidPercentStatus: string;
}

export interface IPerson extends Record<string, string> {
    _id: string;
    birthDate: string;
    clientName: string;
    dataSource: string;
    documentIssueDate: string;
    documentNumber: string;
    documentSeries: string;
}

export interface IReport extends Record<string, string> {
    _id: string;
    appNumber: string;
    appCreationDate: string;
    clientName: string;
    documentNumber: string;
    documentSeries: string;
}

export interface IRequestCount extends Record<string, number> {
    total: number;
    last24Months: number;
    last30Days: number;
    microcreditTotal: number;
    microcreditLast30Days: number;
    microcreditLastYear: number;
    microcreditMore1Year: number;
}
