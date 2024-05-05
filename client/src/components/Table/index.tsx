import classNames from "classnames";

import type { TableColumn, TPerson, TReport } from "../../types";
import { useTheme } from "../../hooks/ThemeContext";

import Head from "./components/Head";
import Body from "./components/Body";

type TableProps = {
    id: string;
    columns: TableColumn[];
    data?: TPerson[] | TReport[];
    mobileView?: boolean;
    rowHover?: boolean;
    textDifference?: boolean;
};

const Table = ({
    id,
    columns,
    data,
    mobileView = false,
    rowHover = false,
    textDifference = false,
}: TableProps) => {
    const theme = useTheme();

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
                <Head columns={columns} />
                <Body
                    columns={columns}
                    data={data}
                    mobileView={mobileView}
                    textDifference={textDifference}
                />
            </table>
        </div>
    );
};

export default Table;
