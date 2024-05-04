import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { PersonalData } from "../layouts";

const Report = () => {
    const { reportId } = useParams();
    const [report, setReport] = useState(undefined);

    useEffect(() => {
        axios
            .get(`http://localhost:9090/reports/get/${reportId}`)
            .then((response) => setReport(response.data.report));
    }, [reportId]);

    return <PersonalData report={report} />;
};

export default Report;
