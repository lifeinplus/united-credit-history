import classNames from "classnames";

import { useTheme } from "../../contexts";
import { TableSortClass, Table } from "../../types/Table";

import { Body, Head, ScrollButtons } from "./components";
import {
    useRowActive,
    useSortableData,
    useStickyHeader,
    useTableScroll,
} from "./hooks";

const Table = ({
    id,
    actions = false,
    columns,
    data,
    mobileView = false,
    rowActive = false,
    rowHover = false,
    scrolling = false,
    stickyHeader = false,
    textDifference = false,
    tooltips = false,
}: Table) => {
    const rowActiveData = useRowActive(rowActive, data);
    const theme = useTheme();

    const [sortedData, requestSort, sortConfig] = useSortableData(
        rowActiveData,
        {
            dataType: "amount",
            direction: "asc",
            sysName: "chbPayment",
            sysNameStatus: "chbPaymentStatus",
        }
    );

    const [tableWrapperRef, headerRef] = useStickyHeader(stickyHeader);
    const [scrollWrapperRef, btnRefs, handleScroll] = useTableScroll(scrolling);

    const getSortClass: TableSortClass = (sysName) => {
        return sortConfig && sortConfig.sysName === sysName
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
            ref={(node) => {
                tableWrapperRef.current = node;
                scrollWrapperRef.current = node;
            }}
        >
            {scrolling && (
                <ScrollButtons
                    btnRefs={btnRefs}
                    handleScroll={handleScroll}
                    wrapperRef={scrollWrapperRef}
                />
            )}
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
                    actions={actions}
                    columns={columns}
                    getSortClass={getSortClass}
                    ref={headerRef}
                    requestSort={requestSort}
                    tooltips={tooltips}
                />
                <Body
                    actions={actions}
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
