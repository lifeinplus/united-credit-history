import classNames from "classnames";

import type { CustomField, TReport } from "../../types";
import { useTheme } from "../../hooks/ThemeContext";

import Head from "./components/Head";
import Body from "./components/Body";

type Props = {
    id: string;
    columns: CustomField[];
    data: TReport[];
    rowHover: boolean;
};

const Table = ({ id, columns, data, rowHover }: Props) => {
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
                    "table-striped align-middle mb-0"
                )}
            >
                <Head columns={columns} />
                <Body columns={columns} data={data} />
            </table>
        </div>
    );
};

export default Table;
