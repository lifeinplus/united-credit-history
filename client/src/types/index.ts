export type ListField = {
    sysName: string;
    type: string;
};

export type TableColumn = {
    alignment: string;
    dataType: string;
    isLink?: boolean;
    name?: string;
    sysName: string;
};

export interface TPerson extends Record<string, string> {
    _id: string;
    birthDate: string;
    clientName: string;
    dataSource: string;
    documentIssueDate: string;
    documentNumber: string;
    documentSeries: string;
}

export interface TReport extends Record<string, string> {
    _id: string;
    appNumber: string;
    appCreationDate: string;
    clientName: string;
    documentNumber: string;
    documentSeries: string;
}

export interface TRequestCount extends Record<string, number> {
    total: number;
    last24Months: number;
    last30Days: number;
    microcreditTotal: number;
    microcreditLast30Days: number;
    microcreditLastYear: number;
    microcreditMore1Year: number;
}
