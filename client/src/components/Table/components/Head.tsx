import classNames from "classnames";

import type { TableColumn } from "../../../types";
import { useTheme } from "../../../hooks/ThemeContext";

type HeadProps = {
    columns: TableColumn[];
};

type ThProps = {
    column: TableColumn;
};

const Head = ({ columns }: HeadProps) => {
    const theme = useTheme();

    return (
        <thead className="align-middle">
            <tr
                className={
                    theme === "light"
                        ? "table-primary"
                        : "uch-table dark primary"
                }
            >
                {columns.map((item) => (
                    <Th key={item.sysName || item.name} column={item} />
                ))}
            </tr>
        </thead>
    );
};

const Th = ({ column }: ThProps) => {
    const { alignment } = column;
    const { name } = column;

    return (
        <th className={classNames(alignment)} scope="col">
            {name}
        </th>
    );
};

export default Head;
