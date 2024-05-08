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
    dataType: string;
    isLink?: boolean;
    name?: string;
    sysName: string;
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
