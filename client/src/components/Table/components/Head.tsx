import classNames from "classnames";
import { forwardRef } from "react";

import type { Sort, SortClass, TableColumn } from "../../../types";
import { useTheme } from "../../../hooks";

import { useTooltip } from "../hooks";

type HeadProps = {
    columns: TableColumn[];
    getSortClass: SortClass;
    requestSort: Sort;
    tooltips: boolean;
};

type ThProps = {
    column: TableColumn;
    getSortClass: SortClass;
    requestSort: Sort;
    theme: string;
};

const Head = forwardRef<HTMLTableSectionElement, HeadProps>(
    ({ columns, getSortClass, requestSort, tooltips }: HeadProps, ref) => {
        const theme = useTheme();
        useTooltip(tooltips, columns);

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
    const { alignment, extended, name, sortable, sysName, tooltipName, type } =
        column;

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
            data-bs-toggle={tooltipName && "tooltip"}
            data-bs-placement={tooltipName && "top"}
            data-bs-title={tooltipName}
            onClick={common ? () => requestSort(column) : undefined}
            scope="col"
        >
            {name}
        </th>
    );
};

export default Head;
