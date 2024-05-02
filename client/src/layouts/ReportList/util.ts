import type { CustomField } from "../../types";

export const customFields: CustomField[] = [
    {
        alignment: "text-start",
        dataType: "numeric",
        sysName: "appNumber",
    },
    {
        alignment: "text-center",
        dataType: "dateTime",
        sysName: "appCreationDate",
    },
    {
        alignment: "text-start",
        dataType: "text",
        isLink: true,
        sysName: "clientName",
    },
    {
        alignment: "text-end",
        dataType: "numeric",
        sysName: "documentSeries",
    },
    {
        alignment: "text-end",
        dataType: "numeric",
        sysName: "documentNumber",
    },
];
