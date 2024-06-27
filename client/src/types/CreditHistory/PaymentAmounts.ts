import { Common } from "../Report";

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

interface AmountListField extends AmountContextField {
    name: string;
    value: string;
}

export interface GroupProps {
    amounts: AmountListField[];
    justify: string;
}

export interface PaymentAmountsProps {
    data?: Common;
    showExtendedData: boolean;
}
