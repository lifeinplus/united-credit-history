import { RequestCount } from "../Report";

export interface RequestCountsProps {
    counts?: RequestCount;
    score?: number;
}

export interface RequestCountsCard {
    title: string;
    type: string;
}

export interface RequestCountsItem {
    count: number;
    sysName: string;
    type: string;
}
