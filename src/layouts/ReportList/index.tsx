import { useTranslation } from "react-i18next";
import classNames from "classnames";

import { useTheme } from "../../hooks/ThemeContext";
import { customFields } from "./util";

import Header from "../../components/Header";
import Table from "../../components/Table";

const ReportList = () => {
    const theme = useTheme();
    const { t } = useTranslation(["report_list"]);

    const columns = customFields.map((item) => ({
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
                            <Table id={"rl"} columns={columns} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportList;
