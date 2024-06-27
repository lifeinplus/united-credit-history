import { MouseEvent, RefObject } from "react";

import { Loan, Person, Report } from "./Report";
import { User } from "./User";

export type TableData = Loan | Person | Report | User;

export interface TableColumn {
    alignment?: string;
    badgeEqual?: string;
    badgeMore?: number;
    badgeType?: string;
    dataType?: string;
    extended?: boolean;
    isLink?: boolean;
    name?: string;
    sortable?: boolean;
    sysName?: string;
    sysNameStatus?: string;
    tooltip?: boolean;
    tooltipName?: string;
    type?: string;
}

export interface Table {
    id: string;
    actions?: boolean;
    columns: TableColumn[];
    data?: Loan[] | Person[] | Report[] | User[];
    mobileView?: boolean;
    rowActive?: boolean;
    rowHover?: boolean;
    scrolling?: boolean;
    stickyHeader?: boolean;
    textDifference?: boolean;
    tooltips?: boolean;
}

export interface TableHead {
    actions: boolean;
    columns: TableColumn[];
    getSortClass: TableSortClass;
    requestSort: TableSortFunc;
    tooltips: boolean;
}

export interface TableBody {
    actions: boolean;
    columns: TableColumn[];
    data?: TableData[];
    mobileView: boolean;
    rowActive: boolean;
    textDifference: boolean;
}

export interface TableRow {
    data: TableData;
}

export interface TableHeaderCell {
    column: TableColumn;
    getSortClass: TableSortClass;
    requestSort: TableSortFunc;
    theme: string;
}

export interface TableDataCell {
    id: string;
    column: TableColumn;
    data: TableData;
}

export interface TableDiff {
    text?: string;
    spanText?: string;
}

export interface TableDiffBadges {
    id: string;
    data?: TableDiff[];
}

export interface TableSortClass {
    (sysName?: string): string | undefined;
}

export interface TableSortConfig {
    dataType?: string;
    direction: string;
    sysName?: string;
    sysNameStatus?: string;
}

export interface TableSortFunc {
    (column: TableColumn): void;
}

export interface TableScrollButtons {
    btnRefs: {
        [key: string]: RefObject<HTMLButtonElement>;
    };
    handleScroll: (arg0: MouseEvent<HTMLButtonElement>) => void;
    wrapperRef: RefObject<HTMLDivElement>;
}
