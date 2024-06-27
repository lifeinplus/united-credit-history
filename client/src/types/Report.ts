export interface ReportProps {
    handleExtend: () => void;
    showExtendedData: boolean;
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
