import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import type { Report } from "../types";
import { useAxiosPrivate } from "../hooks";
import { ReportList } from "../layouts";

const Reports = () => {
    const [reports, setReports] = useState<Report[]>();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const effectRan = useRef(false);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        if (effectRan.current === true) {
            axiosPrivate
                .get("/reports/get", {
                    signal: controller.signal,
                })
                .then((response) => {
                    isMounted && setReports(response.data);
                })
                .catch((error) => {
                    console.error(error);
                    navigate("/signin", {
                        state: { from: location },
                        replace: true,
                    });
                });
        }

        return () => {
            isMounted = false;
            controller.abort();
            effectRan.current = true;
        };
    }, []);

    return <>{reports && <ReportList reports={reports} />}</>;
};

export default Reports;
