import type { TableColumn } from "../../types/Table";

export const tableColumns: TableColumn[] = [
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
