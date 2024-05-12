import classNames from "classnames";
import { forwardRef } from "react";

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

const Head = forwardRef<HTMLTableSectionElement, HeadProps>(
    ({ columns, getSortClass, requestSort }: HeadProps, ref) => {
        const theme = useTheme();

        return (
            <thead className="align-middle" ref={ref}>
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
    }
);

const Th = ({ column, getSortClass, requestSort, theme }: ThProps) => {
    const { alignment, sysName, type } = column;
    const { extended, sortable } = column;
    const { name } = column;

    const common = type === "common";

    const extendedClass =
        common &&
        extended &&
        (theme === "light" ? "table-info" : "uch-table dark info");

    const sortableThemeClass = common && sortable && `sortable ${theme}`;
    const sortClass = common && sortable && getSortClass(sysName);

    return (
        <th
            className={classNames(
                extendedClass,
                sortableThemeClass,
                sortClass,
                alignment
            )}
            onClick={common ? () => requestSort(column) : undefined}
            scope="col"
        >
            {name}
        </th>
    );
};

export default Head;
