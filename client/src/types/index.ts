export type TableColumn = {
    alignment: string;
    dataType: string;
    isLink?: boolean;
    name?: string;
    sysName: string;
};

export type TPerson = {
    _id: string;
    birthDate: string;
    clientName: string;
    dataSource: string;
    documentIssueDate: string;
    documentNumber: string;
    documentSeries: string;
};

export type TReport = {
    _id: string;
    appNumber: string;
    appCreationDate: string;
    clientName: string;
    documentNumber: string;
    documentSeries: string;
};
