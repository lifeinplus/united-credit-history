import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import type { TableColumn, TPerson, TReport } from "../../../types";
import { useTheme } from "../../../hooks/ThemeContext";
import { getDateFormat, langs } from "../../../util";

type BodyProps = {
    columns: TableColumn[];
    data?: TPerson[] | TReport[];
    mobileView: boolean;
    textDifference: boolean;
};

type RowProps = {
    data: TPerson | TReport;
};

type CellProps = {
    id: string;
    column: TableColumn;
    data: TPerson | TReport;
};

type Diff = { text?: string; spanText?: string };

type DiffBadgesProps = {
    id: string;
    data: Diff[];
};

const Body = ({ columns, data, mobileView, textDifference }: BodyProps) => {
    const theme = useTheme();

    const { i18n } = useTranslation();
    const lang = langs[i18n.resolvedLanguage || "gb"];

    const dateFormat = getDateFormat(lang.locale, "date");
    const timeFormat = getDateFormat(lang.locale, "time");

    const firstDataItem = data?.length ? data[0] : {};

    return (
        <tbody>
            {data?.map((element) => (
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
                    return (
                        <Cell key={key} id={key} column={element} data={data} />
                    );
                })}
            </tr>
        );
    }

    function Cell(params: CellProps) {
        const { id, column, data } = params;
        const { isLink, name } = column;

        const { cell, diffData, value } = getCommonData(params);

        const label = mobileView && name;

        const linkValue = isLink && (
            <Link className={`uch-link ${theme}`} to={`/reports/${data._id}`}>
                {value}
            </Link>
        );

        return (
            <td className={cell} data-label={label}>
                <span>
                    {textDifference ? (
                        <DiffBadges id={id} data={diffData} />
                    ) : (
                        linkValue || value
                    )}
                </span>
            </td>
        );
    }

    function DiffBadges({ id, data }: DiffBadgesProps) {
        return data.map((element, index) => {
            const { spanText, text } = element;
            const key = `${id}-span${index}`;

            return spanText ? (
                <span key={key} className={"uch-badge diff uch-text-bg-A"}>
                    {spanText}
                </span>
            ) : (
                text
            );
        });
    }

    function getCommonData({ column, data }: CellProps) {
        const { alignment, dataType, sysName } = column;

        const firstKey = sysName as keyof typeof firstDataItem;
        const firstSource = firstDataItem[firstKey];
        const firstValue = prepare(firstSource, dataType);

        const currentKey = sysName as keyof typeof data;
        const currentSource = data[currentKey] ?? "";
        const currentValue = prepare(currentSource, dataType);

        const diffData = compare(firstValue, currentValue);

        return { cell: alignment, diffData, value: currentValue };
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

    function compare(valueA = "", valueB = "") {
        let result: Diff[] = [];

        const arrayA = valueA.split(" ");
        const arrayB = valueB.split(" ");

        const maxLength = Math.max(arrayA.length, arrayB.length);

        for (let i = 0; i < maxLength; i++) {
            const stringA = arrayA[i] || "";
            const stringB = arrayB[i] || "";

            let compared = compareStrings(stringA, stringB);

            if (i < maxLength - 1) {
                compared = compared.concat([{ text: " " }]);
            }

            result = result.concat(compared);
        }

        return result;
    }

    function compareStrings(stringA: string, stringB: string) {
        const result = [];
        const maxLength = Math.max(stringA.length, stringB.length);

        let text = "";
        let spanText = "";

        for (let i = 0; i < maxLength; i++) {
            const charA = stringA[i] || "";
            const charB = stringB[i] || "";

            if (charA !== charB && charB) {
                if (text) {
                    result.push({ text });
                    text = "";
                }

                spanText += charB;
                continue;
            }

            if (spanText) {
                result.push({ spanText });
                spanText = "";
            }

            text += charB;
        }

        if (spanText) result.push({ spanText });
        if (text) result.push({ text });

        return result;
    }
};

export default Body;
