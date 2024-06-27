import { useParams } from "react-router-dom";

import { useDataById } from "../hooks";
import { CreditHistory, PersonalData } from "../layouts";
import { ReportProps } from "../types/Report";
import { Common, Report } from "../types/Report";

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
