import classNames from "classnames";

import type { TableColumn, ILoan, IPerson, IReport } from "../../types";
import { useTheme } from "../../hooks/ThemeContext";

import Head from "./components/Head";
import Body from "./components/Body";
import { useRowActive } from "./hooks/useRowActive";
import { useSortableData } from "./hooks/useSortableData";

type TableProps = {
    id: string;
    columns: TableColumn[];
    data?: ILoan[] | IPerson[] | IReport[];
    mobileView?: boolean;
    rowActive?: boolean;
    rowHover?: boolean;
    textDifference?: boolean;
};

const Table = ({
    id,
    columns,
    data,
    mobileView = false,
    rowActive = false,
    rowHover = false,
    textDifference = false,
}: TableProps) => {
    const rowActiveData = useRowActive(rowActive, data);
    const theme = useTheme();

    const { sortedData, requestSort, sortConfig } = useSortableData(
        rowActiveData,
        {
            dataType: "amount",
            direction: "asc",
            sysName: "chbPayment",
            sysNameStatus: "chbPaymentStatus",
        }
    );

    const getSortClass = (name: string) => {
        return sortConfig && sortConfig.sysName === name
            ? sortConfig.direction
            : undefined;
    };

    return (
        <div
            id={id}
            className={classNames(
                "table-responsive rounded mb-3",
                "border",
                theme === "dark" && "uch-border-dark"
            )}
        >
            <table
                className={classNames(
                    "table",
                    `table-${theme}`,
                    `uch-table ${theme}`,
                    rowHover && `table-hover`,
                    "table-striped align-middle mb-0",
                    mobileView && "table-mobile"
                )}
            >
                <Head
                    columns={columns}
                    getSortClass={getSortClass}
                    requestSort={requestSort}
                />
                <Body
                    columns={columns}
                    data={sortedData}
                    mobileView={mobileView}
                    rowActive={rowActive}
                    textDifference={textDifference}
                />
            </table>
        </div>
    );
};

export default Table;
