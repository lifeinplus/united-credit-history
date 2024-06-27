import { Common, Report } from "../Report";
import {
    AmountField,
    AmountContextField,
    GroupProps,
    PaymentAmountsProps,
} from "./PaymentAmounts";

export interface CreditHistoryProps {
    commons?: Common;
    handleExtend: () => void;
    report?: Report;
    showExtendedData: boolean;
}

export interface ExtendControlProps {
    handleExtend?: () => void;
    showExtendedData?: boolean;
}

export { AmountField, AmountContextField, GroupProps, PaymentAmountsProps };
