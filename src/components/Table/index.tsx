import classNames from "classnames";
import { CustomField } from "../../layouts/ReportList/util";
import { useTheme } from "../../hooks/ThemeContext";
import Head from "./components/Head";

type Props = {
    id: string;
    columns: CustomField[];
};

const Table = ({ id, columns }: Props) => {
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
                    `uch-table ${theme}`
                )}
            >
                <Head columns={columns} />
            </table>
        </div>
    );
};

export default Table;
