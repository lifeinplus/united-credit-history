import { useEffect, useState } from "react";
import { ReportList } from "../layouts";

export type TReport = {
    _id: string;
    appNumber: string;
    appCreationDate: string;
    clientName: string;
    documentNumber: string;
    documentSeries: string;
};

type TDatabase = {
    reports?: TReport[];
};

const Reports = () => {
    const [database, setDatabase] = useState<TDatabase>({});

    useEffect(() => {
        fetch(`../data/db.json`)
            .then((response) => response.json())
            .then((json) => setDatabase(json));
    }, []);

    return (
        <>{database.reports && <ReportList reports={database.reports} />};</>
    );
};

export default Reports;
