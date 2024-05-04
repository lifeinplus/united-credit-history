import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import type { TableColumn, TReport } from "../../../types";
import { useTheme } from "../../../hooks/ThemeContext";
import { getDateFormat, langs } from "../../../util";

type Props = {
    columns: TableColumn[];
    data: TReport[];
};

type RowProps = {
    data: TReport;
};

type CellProps = {
    column: TableColumn;
    data: TReport;
};

const Body = ({ columns, data }: Props) => {
    const theme = useTheme();

    const { i18n } = useTranslation();
    const lang = langs[i18n.resolvedLanguage || "gb"];

    const dateFormat = getDateFormat(lang.locale, "date");
    const timeFormat = getDateFormat(lang.locale, "time");

    return (
        <tbody>
            {data.map((element) => (
                <Row key={element._id} data={element} />
            ))}
        </tbody>
    );

    function Row({ data }: RowProps) {
        const { _id } = data;

        return (
            <tr id={_id}>
                {columns.map((element, index) => {
                    const key = `${_id}-${index}`;
                    return <Cell key={key} column={element} data={data} />;
                })}
            </tr>
        );
    }

    function Cell(params: CellProps) {
        const { column, data } = params;
        const { isLink } = column;

        const { cell, value } = getCommonData(params);

        const linkValue = isLink && (
            <Link className={`uch-link ${theme}`} to={`/reports/${data._id}`}>
                {value}
            </Link>
        );

        return (
            <td className={cell}>
                <span>{linkValue || value}</span>
            </td>
        );
    }

    function getCommonData({ column, data }: CellProps) {
        const { alignment, dataType, sysName } = column;

        const currentSource = data[sysName as keyof typeof data] || "";
        const currentValue = prepare(currentSource, dataType);
        const value = currentValue;

        return { cell: alignment, value };
    }

    function prepare(sourceValue: string, dataType: string) {
        if (dataType === "date" && sourceValue) {
            const milliseconds = Date.parse(sourceValue);
            return dateFormat.format(milliseconds);
        }

        if (dataType === "dateTime" && sourceValue) {
            const milliseconds = Date.parse(sourceValue);
            const date = dateFormat.format(milliseconds);
            const time = timeFormat.format(milliseconds);
            return date + " " + time;
        }

        return sourceValue;
    }
};

export default Body;
