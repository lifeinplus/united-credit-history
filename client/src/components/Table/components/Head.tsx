import classNames from "classnames";
import { forwardRef } from "react";

import { useTheme } from "../../../contexts";
import { TableHead, TableHeaderCell } from "../../../types/Table";

import { useTooltip } from "../hooks";
import { useTranslation } from "react-i18next";

const Head = forwardRef<HTMLTableSectionElement, TableHead>(
    (props: TableHead, ref) => {
        const { columns, actions, getSortClass, requestSort, tooltips } = props;

        const theme = useTheme();
        const { t } = useTranslation("table");
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
                    {actions && <ActionTh />}
                </tr>
            </thead>
        );

        function ActionTh() {
            return (
                <th className={"text-end"} scope="col">
                    {t("actions")}
                </th>
            );
        }

        function Th({
            column,
            getSortClass,
            requestSort,
            theme,
        }: TableHeaderCell) {
            const {
                alignment,
                extended,
                name,
                sortable,
                sysName,
                tooltipName,
                type,
            } = column;

            const common = type === "common";

            const extendedClass =
                common &&
                extended &&
                (theme === "light" ? "table-info" : "uch-table dark info");

            const sortableThemeClass =
                common && sortable && `sortable ${theme}`;
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
                    data-bs-custom-class={`uch-tooltip ${theme}`}
                    data-bs-title={tooltipName}
                    onClick={common ? () => requestSort(column) : undefined}
                    scope="col"
                >
                    {name}
                </th>
            );
        }
    }
);

export default Head;
