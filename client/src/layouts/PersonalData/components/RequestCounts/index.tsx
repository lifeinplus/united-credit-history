import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { useTheme } from "../../../../hooks/ThemeContext";
import { TRequestCount } from "../../../../types";

import { customFields } from "./util";

type RequestCountsProps = {
    counts?: TRequestCount;
};

type CardProps = {
    title: string;
    type: string;
};

type ItemProps = {
    count: number;
    sysName: string;
    type: string;
};

const RequestCounts = ({ counts }: RequestCountsProps) => {
    const { t } = useTranslation(["personal_data"]);
    const theme = useTheme();

    return (
        <div className="card-group">
            <Card title={t("requests.title_all")} type={"all"} />
            <Card title={t("requests.title_microcredits")} type={"micro"} />
        </div>
    );

    function Card({ title, type }: CardProps) {
        const fields = customFields.filter((item) => item.type === type);
        const values = fields.map(({ sysName }) => counts && counts[sysName]);

        const microDanger = type === "micro" && values.some((item) => item);

        return (
            <div
                className={classNames(
                    "card",
                    `uch-text-bg ${theme}`,
                    theme === "dark" && "uch-card-border-dark",
                    microDanger && "border-danger"
                )}
            >
                <div
                    className={classNames(
                        "card-header text-center text-truncate",
                        theme === "dark" && "uch-border-dark"
                    )}
                >
                    {title}
                </div>
                {counts && (
                    <ul className="list-group list-group-flush">
                        {fields.map(({ sysName }) => {
                            return (
                                <Item
                                    key={sysName}
                                    count={counts[sysName]}
                                    sysName={sysName}
                                    type={type}
                                />
                            );
                        })}
                    </ul>
                )}
            </div>
        );
    }

    function Item({ count, sysName, type }: ItemProps) {
        const isDanger = type === "micro" && count > 0;

        return (
            <li
                className={classNames(
                    "list-group-item",
                    `uch-list-group-item ${theme}`,
                    "d-flex",
                    "justify-content-between",
                    "align-items-center"
                )}
            >
                <span className="text-truncate">
                    {t(`requests.${sysName}`)}
                </span>
                <span
                    className={classNames(
                        "badge",
                        "rounded-pill",
                        isDanger ? "text-bg-danger" : `text-bg-${theme}`,
                        "ms-2"
                    )}
                >
                    {count}
                </span>
            </li>
        );
    }
};

export default RequestCounts;
