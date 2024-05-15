import { useParams } from "react-router-dom";

import type { ICommon, IReport } from "../types";

import { useDataById } from "../hooks";
import { CreditHistory, PersonalData } from "../layouts";

type ReportProps = {
    handleExtend: () => void;
    showExtendedData: boolean;
};

const Report = ({ handleExtend, showExtendedData }: ReportProps) => {
    const { reportId } = useParams();

    const commons = useDataById<ICommon>("commons/getByReportId", reportId);
    const report = useDataById<IReport>("reports/getById", reportId);

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
