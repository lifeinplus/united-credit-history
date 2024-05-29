import { useEffect, useState } from "react";

import axios from "../api/axios";
import type { Report } from "../types";
import { ReportList } from "../layouts";

const Reports = () => {
    const [reports, setReports] = useState<Report[]>();

    useEffect(() => {
        axios.get("/reports/get").then((response) => {
            setReports(response.data);
        });
    }, []);

    return <>{reports && <ReportList reports={reports} />}</>;
};

export default Reports;
