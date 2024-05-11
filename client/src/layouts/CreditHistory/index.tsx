import classNames from "classnames";
import { useTranslation } from "react-i18next";

import type { ICommon, ILoan, IReport } from "../../types";

import Header from "../../components/Header";
import Table from "../../components/Table";
import { useTheme } from "../../hooks/ThemeContext";

import PaymentAmounts from "./components/PaymentAmounts";
import { customFields } from "./util";

type CreditHistoryProps = {
    commons?: ICommon;
    handleExtend: () => void;
    loans?: ILoan[];
    report?: IReport;
    showExtendedData: boolean;
};

const CreditHistory = ({
    commons,
    handleExtend,
    loans,
    report,
    showExtendedData,
}: CreditHistoryProps) => {
    const { t } = useTranslation(["credit_history"]);
    const theme = useTheme();

    const columns = defineColumns();
    const data = loans;

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
                        <Header
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
                            <Table id={"ch"} columns={columns} data={data} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    function defineColumns() {
        const commonCols = getCommonCols();

        return [...commonCols];
    }

    function getCommonCols() {
        const all = [...customFields];

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
            };
        });
    }
};

export default CreditHistory;
