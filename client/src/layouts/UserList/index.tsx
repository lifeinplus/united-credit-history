import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { PanelHeader, Table } from "../../components";
import { useTheme } from "../../contexts";
import { UserListProps } from "../../types";

import { tableColumns } from "./utils";

const UserList = ({ users }: UserListProps) => {
    const theme = useTheme();
    const { t } = useTranslation(["user_list"]);

    const columns = tableColumns.map((item) => ({
        ...item,
        name: t(`table.${item.sysName}`),
    }));

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
                        <PanelHeader
                            iconName={"bi-card-list"}
                            nameSpaces={["user_list"]}
                        />
                    </div>
                    <div className="row">
                        <div className="col">
                            <Table
                                id={"ul"}
                                actions={true}
                                columns={columns}
                                data={users}
                                rowHover={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserList;
