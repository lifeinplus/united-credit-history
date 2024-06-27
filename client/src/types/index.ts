import { Dispatch, SetStateAction } from "react";
import { Report } from "./Report";
import { User } from "./User";

export interface DateOptions {
    date: Intl.DateTimeFormatOptions;
    header: Intl.DateTimeFormatOptions;
    status: Intl.DateTimeFormatOptions;
    time: Intl.DateTimeFormatOptions;
}

export interface Lang {
    countryCode: string;
    locale: string;
    nativeName: string;
}

export interface ListField {
    sysName: string;
    type: string;
}

export interface ModalData extends Record<string, string | number> {}

export interface ModalDataContext {
    modalData: ModalData;
    setModalData: Dispatch<SetStateAction<ModalData>>;
}

export interface ReportListProps {
    reports: Report[];
}

export interface RequireAuthProps {
    allowedRoles: number[];
}

export interface UserListProps {
    users: User[];
}
