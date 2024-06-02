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

export interface Common extends Record<string, number> {}

export interface Delinquency extends Record<string, string | number> {}

export interface Flc extends Record<string, string | number> {}

export interface Loan extends Record<string, string | number> {
    _id: string;
}

export interface PaymentHistory extends Record<string, string> {}

export interface Person extends Record<string, string> {}

export interface Report extends Record<string, string> {}

export interface RequestCount extends Record<string, number> {}
