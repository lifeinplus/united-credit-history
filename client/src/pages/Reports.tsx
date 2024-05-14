import { useEffect, useState } from "react";
import axios from "axios";

import type { IReport } from "../types";
import { ReportList } from "../layouts";

const Reports = () => {
    const [reports, setReports] = useState<IReport[]>();

    useEffect(() => {
        axios.get("http://localhost:9090/reports/get").then((response) => {
            setReports(response.data);
        });
    }, []);

    return <>{reports && <ReportList reports={reports} />}</>;
};

export default Reports;
