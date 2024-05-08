import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { CreditHistory, PersonalData } from "../layouts";

type ReportProps = {
    handleExtend: () => void;
    showExtendedData: boolean;
};

const Report = ({ handleExtend, showExtendedData }: ReportProps) => {
    const { reportId } = useParams();

    const [commons, setCommons] = useState(undefined);
    const [loans, setLoans] = useState(undefined);
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
            .get(`http://localhost:9090/loans/getByReportId/${reportId}`)
            .then((response) => setLoans(response.data.loans))
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
        <>
            <PersonalData
                persons={persons}
                report={report}
                requestCounts={requestCounts}
                commons={commons}
            />
            <CreditHistory
                commons={commons}
                handleExtend={handleExtend}
                loans={loans}
                report={report}
                showExtendedData={showExtendedData}
            />
        </>
    );
};

export default Report;
