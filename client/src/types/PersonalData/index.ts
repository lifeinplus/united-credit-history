import { Common, Report } from "../Report";
import {
    RequestCountsCard,
    RequestCountsItem,
    RequestCountsProps,
} from "./RequestCounts";

export interface PersonalDataProps {
    commons?: Common;
    report?: Report;
}

export interface ScoreStyle {
    min: number;
    max: number;
    style: string;
}

export { RequestCountsCard, RequestCountsItem, RequestCountsProps };
