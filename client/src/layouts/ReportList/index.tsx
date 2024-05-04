import classNames from "classnames";
import { useTranslation } from "react-i18next";

import type { TReport } from "../../types";
import Header from "../../components/Header";
import Table from "../../components/Table";
import { useTheme } from "../../hooks/ThemeContext";

import { tableColumns } from "./util";

type Props = {
    reports: TReport[];
};

const ReportList = ({ reports }: Props) => {
    const theme = useTheme();
    const { t } = useTranslation(["report_list"]);

    const columns = tableColumns.map((item) => ({
        ...item,
        name: t(`table.${item.sysName}`),
    }));

    return (
        <div className="container-fluid mb-3">
            <div
                className={classNames([
                    `row panel ${theme} pt-2 rounded-bottom`,
                    `border border-top-0`,
                    theme === "dark" && "uch-border-dark",
                ])}
            >
                <div className="col">
                    <div className="row">
                        <Header
                            iconName={"bi-card-list"}
                            nameSpaces={["report_list"]}
                        />
                    </div>
                    <div className="row">
                        <div className="col">
                            <Table
                                id={"rl"}
                                columns={columns}
                                data={reports}
                                rowHover={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportList;
