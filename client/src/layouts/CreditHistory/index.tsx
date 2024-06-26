import classNames from "classnames";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { PanelHeader, Table } from "../../components";
import { useTheme } from "../../contexts";
import { useDataById, useDataByIds } from "../../hooks";
import { CreditHistoryProps } from "../../types/CreditHistory";
import { Delinquency, Flc, Loan, PaymentHistory } from "../../types/Report";
import { getDateFormat } from "../../utils";

import PaymentAmounts from "./components/PaymentAmounts";
import { TimePeriod, tableColumns } from "./utils";

const CreditHistory = ({
    commons,
    handleExtend,
    report,
    showExtendedData,
}: CreditHistoryProps) => {
    const { reportId } = useParams();
    const theme = useTheme();
    const { t } = useTranslation(["credit_history"]);

    const loans = useDataById<Loan[]>("loans/getByReportId", reportId);
    const [loanIds, setLoanIds] = useState<string[]>();

    useEffect(() => {
        if (!loans?.length) return;
        setLoanIds(loans.map((loan) => loan._id));
    }, [loans]);

    const delinquencies = useDataByIds<Delinquency[]>(
        "delinquencies/getByLoanIds",
        loanIds
    );

    const flcs = useDataByIds<Flc[]>("flcs/getByLoanIds", loanIds);

    const paymentHistories = useDataByIds<PaymentHistory[]>(
        "paymenthistories/getByLoanIds",
        loanIds
    );

    const dateFormat = getDateFormat("ru", "status");
    const columns = defineColumns();

    const data = loans?.map((loan) => {
        delinquencies?.forEach((delinquency) => {
            if (delinquency.loanId !== loan._id) {
                return;
            }

            loan = {
                ...loan,
                delinquency0Plus: delinquency.delinquency0Plus,
                delinquency30Plus: delinquency.delinquency30Plus,
                delinquency60Plus: delinquency.delinquency60Plus,
                delinquency90Plus: delinquency.delinquency90Plus,
                delinquencyRefinancing: delinquency.delinquencyRefinancing,
            };
        });

        flcs?.forEach((flc) => {
            if (flc.loanId !== loan._id) {
                return;
            }

            loan = {
                ...loan,
                flcNchb: flc.flcNchb,
                flcPayment: flc.flcPayment,
                flcTaken: flc.flcTaken,
                flcUcb: flc.flcUcb,
            };
        });

        paymentHistories?.forEach((paymentHistory) => {
            if (paymentHistory.loanId === loan._id) {
                const milliseconds = Date.parse(paymentHistory.date);
                const name = dateFormat.format(milliseconds);
                loan[name] = paymentHistory.status;
            }
        });

        return loan;
    });

    return (
        <div className="container-fluid mb-3">
            <div
                className={classNames(
                    `row panel ${theme} rounded`,
                    `border`,
                    theme === "dark" && "uch-border-dark"
                )}
            >
                <div className="col">
                    <div className="row">
                        <PanelHeader
                            date={{
                                caption: "report_date",
                                value: report?.reportCreationDate,
                            }}
                            handleExtend={handleExtend}
                            iconName={"bi-credit-card-2-front"}
                            nameSpaces={["credit_history"]}
                            number={{
                                caption: "number_of_accounts",
                                value: String(loans?.length),
                            }}
                            showExtendedData={showExtendedData}
                        />
                    </div>
                    <PaymentAmounts
                        data={commons}
                        showExtendedData={showExtendedData}
                    />
                    <div className="row">
                        <div className="col">
                            <Table
                                id={"ch"}
                                columns={columns}
                                data={data}
                                rowActive={true}
                                rowHover={true}
                                scrolling={true}
                                stickyHeader={true}
                                tooltips={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    function defineColumns() {
        const commonCols = getCommonCols();
        const statusCols = getStatusCols();

        return [...commonCols, ...statusCols];
    }

    function getCommonCols() {
        const all = [...tableColumns];

        const columns = showExtendedData
            ? all
            : all.filter((column) => !column.extended);

        return columns.map((item) => {
            const { sysName, tooltip } = item;
            return {
                ...item,
                name: t(`columns.${sysName}`),
                sortable: true,
                type: "common",
                tooltipName: tooltip
                    ? t(`columns.tooltips.${sysName}`)
                    : undefined,
            };
        });
    }

    function getStatusCols() {
        if (!paymentHistories?.length || !report?.reportCreationDate) return [];

        const timePeriod = new TimePeriod(
            paymentHistories,
            report?.reportCreationDate
        );

        return timePeriod.result.map((value: Date) => {
            return {
                name: dateFormat.format(value),
                type: "status",
            };
        });
    }
};

export default CreditHistory;
