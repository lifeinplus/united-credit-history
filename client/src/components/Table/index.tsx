import classNames from "classnames";

import type { TableColumn, Loan, Person, Report, SortClass } from "../../types";

import { useTheme } from "../../contexts";

import Head from "./components/Head";
import Body from "./components/Body";
import ScrollButtons from "./components/ScrollButtons";

import {
    useRowActive,
    useSortableData,
    useStickyHeader,
    useTableScroll,
} from "./hooks";

type TableProps = {
    id: string;
    columns: TableColumn[];
    data?: Loan[] | Person[] | Report[];
    mobileView?: boolean;
    rowActive?: boolean;
    rowHover?: boolean;
    scrolling?: boolean;
    stickyHeader?: boolean;
    textDifference?: boolean;
    tooltips?: boolean;
};

const Table = ({
    id,
    columns,
    data,
    mobileView = false,
    rowActive = false,
    rowHover = false,
    scrolling = false,
    stickyHeader = false,
    textDifference = false,
    tooltips = false,
}: TableProps) => {
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

    const getSortClass: SortClass = (sysName) => {
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
                    columns={columns}
                    getSortClass={getSortClass}
                    ref={headerRef}
                    requestSort={requestSort}
                    tooltips={tooltips}
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
