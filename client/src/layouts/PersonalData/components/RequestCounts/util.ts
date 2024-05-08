import { ListField } from "../../../../types";

const customFields: ListField[] = [
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

export { customFields };
