import { useParams } from "react-router-dom";

import type { Common, Report } from "../types";

import { useDataById } from "../hooks";
import { CreditHistory, PersonalData } from "../layouts";

type ReportProps = {
    handleExtend: () => void;
    showExtendedData: boolean;
};

const Report = ({ handleExtend, showExtendedData }: ReportProps) => {
    const { reportId } = useParams();

    const commons = useDataById<Common>("commons/getByReportId", reportId);
    const report = useDataById<Report>("reports/getById", reportId);

    return (
        <>
            <PersonalData report={report} commons={commons} />
            <CreditHistory
                commons={commons}
                handleExtend={handleExtend}
                report={report}
                showExtendedData={showExtendedData}
            />
        </>
    );
};

export default Report;
