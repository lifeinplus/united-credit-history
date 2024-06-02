import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAxiosPrivate } from "../hooks";
import { ReportList } from "../layouts";
import type { Report } from "../types";

const Reports = () => {
    const [reports, setReports] = useState<Report[]>();
    const axiosPrivate = useAxiosPrivate();
    const location = useLocation();
    const navigate = useNavigate();
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
                    navigate("/login", {
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
