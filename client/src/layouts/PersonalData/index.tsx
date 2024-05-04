import classNames from "classnames";
import { useTranslation } from "react-i18next";

import type { TReport } from "../../types";
import Header from "../../components/Header";
// import Table from "../../components/Table";
import { useTheme } from "../../hooks/ThemeContext";

// import { tableColumns } from "./util";

type Props = {
    report: TReport | undefined;
};

const PersonalData = ({ report }: Props) => {
    const { t } = useTranslation(["personal_data"]);
    const theme = useTheme();

    // const columns = tableColumns.map((item) => ({
    //     ...item,
    //     name: t(`document.${item.sysName}`),
    // }));

    return (
        <div className="container-fluid mb-3">
            <div
                className={classNames(
                    `row panel ${theme} pt-2 rounded-bottom`,
                    `border border-top-0`,
                    theme === "dark" && "uch-border-dark"
                )}
            >
                <div className="col">
                    <div className="row">
                        <Header
                            date={{
                                caption: "app_creation_date",
                                value: report?.appCreationDate,
                            }}
                            iconName={"bi-file-person"}
                            nameSpaces={["personal_data"]}
                            number={{
                                caption: "app_number",
                                value: report?.appNumber,
                            }}
                        />
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-12 col-lg-7 col-xl-8">
                            {/* <Table
                                id={"pd"}
                                columns={columns}
                                rowHover={false}
                            /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalData;
