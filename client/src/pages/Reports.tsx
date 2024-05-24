import axios from "axios";
import { useEffect, useState } from "react";

import type { Report } from "../types";
import { useProfile } from "../contexts";
import { ReportList } from "../layouts";

const Reports = () => {
    const profile = useProfile();
    const [reports, setReports] = useState<Report[]>();

    useEffect(() => {
        axios.get("/reports/get").then((response) => {
            setReports(response.data);
        });
    }, []);

    return (
        <>{profile.userName && reports && <ReportList reports={reports} />}</>
    );
};

export default Reports;
