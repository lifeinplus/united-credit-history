export type CustomField = {
    alignment: string;
    dataType: string;
    isLink?: boolean;
    name?: string;
    sysName: string;
};

export type TReport = {
    _id: string;
    appNumber: string;
    appCreationDate: string;
    clientName: string;
    documentNumber: string;
    documentSeries: string;
};
