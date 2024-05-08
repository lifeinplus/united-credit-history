import type { ListField, ScoreStyle } from "../../../../types";

export const customFields: ListField[] = [
    {
        sysName: "total",
        type: "all",
    },
    {
        sysName: "last24Months",
        type: "all",
    },
    {
        sysName: "last30Days",
        type: "all",
    },
    {
        sysName: "microcreditTotal",
        type: "micro",
    },
    {
        sysName: "microcreditLast30Days",
        type: "micro",
    },
    {
        sysName: "microcreditLastYear",
        type: "micro",
    },
    {
        sysName: "microcreditMore1Year",
        type: "micro",
    },
];

export const scoreStyles: ScoreStyle[] = [
    { min: 300, max: 499, style: "text-bg-danger" },
    { min: 500, max: 649, style: "text-bg-warning" },
    { min: 650, max: 799, style: "text-bg-info" },
    { min: 800, max: 850, style: "text-bg-success" },
];
