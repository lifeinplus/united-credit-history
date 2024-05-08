import classNames from "classnames";

import type { ICommon, ILoan, IReport } from "../../types";
import Header from "../../components/Header";
import { useTheme } from "../../hooks/ThemeContext";

import PaymentAmounts from "./components/PaymentAmounts";

type CreditHistoryProps = {
    commons?: ICommon;
    handleExtend: () => void;
    loans?: ILoan;
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
    const theme = useTheme();

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
                                value: loans?.length,
                            }}
                            showExtendedData={showExtendedData}
                        />
                    </div>
                    <PaymentAmounts
                        data={commons}
                        showExtendedData={showExtendedData}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreditHistory;
