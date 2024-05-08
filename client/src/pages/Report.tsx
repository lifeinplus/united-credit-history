import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { PersonalData } from "../layouts";

const Report = () => {
    const { reportId } = useParams();

    const [commons, setCommons] = useState(undefined);
    const [persons, setPersons] = useState(undefined);
    const [report, setReport] = useState(undefined);
    const [requestCounts, setRequestCounts] = useState(undefined);

    useEffect(() => {
        axios
            .get(`http://localhost:9090/commons/getByReportId/${reportId}`)
            .then((response) => setCommons(response.data.commons))
            .catch((error) => console.log(error.message));
    }, [reportId]);

    useEffect(() => {
        axios
            .get(`http://localhost:9090/persons/getByReportId/${reportId}`)
            .then((response) => setPersons(response.data.persons))
            .catch((error) => console.log(error.message));
    }, [reportId]);

    useEffect(() => {
        axios
            .get(`http://localhost:9090/reports/getById/${reportId}`)
            .then((response) => setReport(response.data.report))
            .catch((error) => console.log(error.message));
    }, [reportId]);

    useEffect(() => {
        axios
            .get(
                `http://localhost:9090/requestCounts/getByReportId/${reportId}`
            )
            .then((response) => setRequestCounts(response.data.requestCounts))
            .catch((error) => console.log(error.message));
    }, [reportId]);

    return (
        <PersonalData
            persons={persons}
            report={report}
            requestCounts={requestCounts}
            commons={commons}
        />
    );
};

export default Report;
