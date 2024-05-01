import { useEffect, useState } from "react";
import axios from "axios";

import { ReportList } from "../layouts";

export type TReport = {
    _id: string;
    appNumber: string;
    appCreationDate: string;
    clientName: string;
    documentNumber: string;
    documentSeries: string;
};

const Reports = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:9090/reports/get").then((response) => {
            setReports(response.data.reports);
        });
    }, []);

    return <>{reports && <ReportList reports={reports} />};</>;
};

export default Reports;
