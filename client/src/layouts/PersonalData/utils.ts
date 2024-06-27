import type { TableColumn } from "../../types/Table";

export const tableColumns: TableColumn[] = [
    {
        alignment: "text-start",
        dataType: "text",
        sysName: "dataSource",
    },
    {
        alignment: "text-start",
        dataType: "text",
        sysName: "clientName",
    },
    {
        alignment: "text-center",
        dataType: "date",
        sysName: "birthDate",
    },
    {
        alignment: "text-end",
        dataType: "text",
        sysName: "documentSeries",
    },
    {
        alignment: "text-end",
        dataType: "text",
        sysName: "documentNumber",
    },
    {
        alignment: "text-end",
        dataType: "date",
        sysName: "documentIssueDate",
    },
];
