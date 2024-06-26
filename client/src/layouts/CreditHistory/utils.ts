import { PaymentHistory } from "../../types/Report";
import { TableColumn } from "../../types/Table";
import { getDateFormat } from "../../utils";

export class TimePeriod {
    constructor(
        private readonly history: PaymentHistory[],
        private readonly lastDate: string
    ) {}

    get result() {
        const milliseconds = Date.parse(this.lastDate);
        const lastDate = new Date(milliseconds);
        const result = [lastDate];

        const monthsNumber = this.#getMonthsNumber();

        for (let i = 1; i < monthsNumber; i++) {
            let previous = result[i - 1];

            let date = new Date(previous.getTime());
            date.setMonth(date.getMonth() - 1);

            result.push(date);
        }

        return result;
    }

    #getMonthsNumber() {
        const startDate = this.#getStartDate();
        const lastDate = this.lastDate;

        const [startMonth, startYear] = this.#defineMonthYear(startDate);
        const [lastMonth, lastYear] = this.#defineMonthYear(lastDate);

        return (lastYear - startYear) * 12 + (lastMonth + 1) - startMonth;
    }

    #getStartDate() {
        return this.history?.reduce((result, { date }) => {
            return result > date ? date : result;
        }, this.lastDate);
    }

    #defineMonthYear(isoDate: string) {
        if (!isoDate) return [];

        const dateFormat = getDateFormat("ru", "status");
        const milliseconds = Date.parse(isoDate);

        return dateFormat
            .format(milliseconds)
            .split(".")
            .map((item) => Number(item));
    }
}

export const tableColumns: TableColumn[] = [
    {
        alignment: "text-end",
        badgeMore: 0,
        badgeType: "A",
        dataType: "numeric",
        sysName: "delinquency0Plus",
    },
    {
        alignment: "text-end",
        badgeMore: 0,
        badgeType: "B",
        dataType: "numeric",
        sysName: "delinquency30Plus",
    },
    {
        alignment: "text-end",
        badgeMore: 0,
        badgeType: "C",
        dataType: "numeric",
        sysName: "delinquency60Plus",
    },
    {
        alignment: "text-end",
        badgeMore: 0,
        badgeType: "E",
        dataType: "numeric",
        sysName: "delinquency90Plus",
    },
    {
        alignment: "text-end",
        badgeMore: 0,
        badgeType: "F",
        dataType: "numeric",
        sysName: "delinquencyRefinancing",
        tooltip: true,
    },
    {
        alignment: "text-start",
        dataType: "text",
        sysName: "status",
    },
    {
        alignment: "text-end",
        dataType: "amount",
        sysName: "chbPayment",
        sysNameStatus: "chbPaymentStatus",
        tooltip: true,
    },
    {
        alignment: "text-end",
        dataType: "amount",
        extended: true,
        sysName: "flcPayment",
        sysNameStatus: "chbPaymentStatus",
        tooltip: true,
    },
    {
        alignment: "text-start",
        badgeEqual: "Микрокредит",
        badgeType: "E",
        dataType: "text",
        sysName: "loanType",
    },
    {
        alignment: "text-end",
        dataType: "amount",
        sysName: "loanAmount",
    },
    {
        alignment: "text-start",
        dataType: "text",
        sysName: "currency",
    },
    {
        alignment: "text-end",
        dataType: "amount",
        sysName: "balanceAmount",
    },
    {
        alignment: "text-end",
        dataType: "amount",
        sysName: "debtAmount",
    },
    {
        alignment: "text-end",
        dataType: "numeric",
        sysName: "unpaidPercent",
        sysNameStatus: "unpaidPercentStatus",
    },
    {
        alignment: "text-end",
        badgeMore: 0,
        badgeType: "E",
        dataType: "amount",
        sysName: "delinquencyAmount",
    },
    {
        alignment: "text-start",
        dataType: "text",
        sysName: "guarantee",
    },
    {
        alignment: "text-center",
        dataType: "date",
        sysName: "creationDate",
    },
    {
        alignment: "text-center",
        dataType: "date",
        sysName: "closeDate",
    },
    {
        alignment: "text-center",
        dataType: "date",
        sysName: "lastUpdateDate",
        tooltip: true,
    },
    {
        alignment: "text-start",
        dataType: "text",
        sysName: "businessCategory",
    },
    {
        alignment: "text-end",
        dataType: "numericArray",
        sysName: "loanNumberNchb",
        tooltip: true,
    },
    {
        alignment: "text-end",
        dataType: "numericArray",
        sysName: "loanNumberUcb",
        tooltip: true,
    },
    {
        alignment: "text-end",
        dataType: "numeric",
        extended: true,
        sysName: "paymentPeriod",
        tooltip: true,
    },
    {
        alignment: "text-end",
        dataType: "numeric",
        extended: true,
        sysName: "monthsNumberSinceCreationDate",
        tooltip: true,
    },
    {
        alignment: "text-end",
        dataType: "numeric",
        extended: true,
        sysName: "monthsNumberBeforeCloseDate",
        tooltip: true,
    },
    {
        alignment: "text-end",
        dataType: "numeric",
        extended: true,
        sysName: "flcTaken",
        tooltip: true,
    },
    {
        alignment: "text-end",
        dataType: "numeric",
        extended: true,
        sysName: "flcNchb",
        tooltip: true,
    },
    {
        alignment: "text-end",
        dataType: "numeric",
        extended: true,
        sysName: "flcUcb",
        tooltip: true,
    },
    {
        alignment: "text-end",
        dataType: "numeric",
        extended: true,
        sysName: "contractPeriod",
        tooltip: true,
    },
];
