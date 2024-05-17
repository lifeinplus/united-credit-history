export interface AmountField {
    sysName: string;
    type: string;
    country?: string;
    hide?: boolean;
}

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

export interface ListField {
    sysName: string;
    type: string;
}

export interface ScoreStyle {
    min: number;
    max: number;
    style: string;
}

export interface Sort {
    (column: TableColumn): void;
}

export interface SortClass {
    (sysName?: string): string | undefined;
}

export interface TableColumn {
    alignment?: string;
    badgeEqual?: string;
    badgeMore?: number;
    badgeType?: string;
    dataType?: string;
    extended?: boolean;
    isLink?: boolean;
    name?: string;
    sortable?: boolean;
    sysName?: string;
    sysNameStatus?: string;
    tooltip?: boolean;
    tooltipName?: string;
    type?: string;
}

export interface ICommon extends Record<string, number> {}

export interface IDelinquency extends Record<string, string | number> {}

export interface IFlc extends Record<string, string | number> {}

export interface ILoan extends Record<string, string | number> {
    _id: string;
}

export interface IPaymentHistory extends Record<string, string> {}

export interface IPerson extends Record<string, string> {}

export interface IReport extends Record<string, string> {}

export interface IRequestCount extends Record<string, number> {}
