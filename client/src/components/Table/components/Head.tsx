import classNames from "classnames";

import type { TableColumn } from "../../../types";
import { useTheme } from "../../../hooks/ThemeContext";

type HeadProps = {
    columns: TableColumn[];
    getSortClass: (arg0: string) => string | undefined;
    requestSort: (arg0: TableColumn) => void;
};

type ThProps = {
    column: TableColumn;
    getSortClass: (arg0: string) => string | undefined;
    requestSort: (arg0: TableColumn) => void;
    theme: string;
};

const Head = ({ columns, getSortClass, requestSort }: HeadProps) => {
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
                    <Th
                        key={item.sysName || item.name}
                        column={item}
                        getSortClass={getSortClass}
                        requestSort={requestSort}
                        theme={theme}
                    />
                ))}
            </tr>
        </thead>
    );
};

const Th = ({ column, getSortClass, requestSort, theme }: ThProps) => {
    const { alignment, sysName } = column;
    const { sortable } = column;
    const { name } = column;

    const sortableThemeClass = sortable && `sortable ${theme}`;
    const sortClass = sortable && getSortClass(sysName);

    return (
        <th
            className={classNames(sortableThemeClass, sortClass, alignment)}
            onClick={() => requestSort(column)}
            scope="col"
        >
            {name}
        </th>
    );
};

export default Head;
