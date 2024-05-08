import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { PersonalData } from "../layouts";

const Report = () => {
    const { reportId } = useParams();

    const [persons, setPersons] = useState(undefined);
    const [report, setReport] = useState(undefined);
    const [requestCounts, setRequestCounts] = useState(undefined);

    useEffect(() => {
        axios
            .get(`http://localhost:9090/persons/getByReportId/${reportId}`)
            .then((response) => setPersons(response.data.persons));
    }, [reportId]);

    useEffect(() => {
        axios
            .get(`http://localhost:9090/reports/getById/${reportId}`)
            .then((response) => setReport(response.data.report));
    }, [reportId]);

    useEffect(() => {
        axios
            .get(
                `http://localhost:9090/requestCounts/getByReportId/${reportId}`
            )
            .then((response) => setRequestCounts(response.data.requestCounts));
    }, [reportId]);

    return (
        <PersonalData
            persons={persons}
            report={report}
            requestCounts={requestCounts}
        />
    );
};

export default Report;
