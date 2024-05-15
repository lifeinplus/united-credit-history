import { useMemo, useState } from "react";

import type { ILoan, IPerson, IReport, TableColumn } from "../../../types";

type SortConfig = {
    dataType: string;
    direction: string;
    sysName: string;
    sysNameStatus?: string;
};

export const useSortableData = (
    data: (ILoan | IPerson | IReport)[] = [],
    config: SortConfig
) => {
    const [sortConfig, setSortConfig] = useState(config);

    const sortedData = useMemo(() => {
        const { dataType, direction, sysName, sysNameStatus } = sortConfig;

        const more = direction === "asc" ? 1 : -1;
        const less = direction === "asc" ? -1 : 1;

        const result = [...data].sort((a, b) => {
            const compare = getCompareFunction(dataType);

            const result = compare({
                statusA: a[sysNameStatus || ""],
                statusB: b[sysNameStatus || ""],
                valueA: a[sysName],
                valueB: b[sysName],
            });

            const { order, resultA, resultB } = result;

            if (order) return order;

            if (
                resultA !== undefined &&
                resultB !== undefined &&
                resultA > resultB
            ) {
                return more;
            }

            return less;
        });

        return result;
    }, [data, sortConfig]);

    const requestSort = (field: TableColumn) => {
        let direction = "asc";

        if (
            sortConfig &&
            sortConfig.sysName === field.sysName &&
            sortConfig.direction === "asc"
        ) {
            direction = "desc";
        }

        setSortConfig({ ...field, direction });
    };

    return { sortedData, requestSort, sortConfig };
};
type CompareFunction = {
    statusA: string | number;
    statusB: string | number;
    valueA: string | number;
    valueB: string | number;
};

type CompareResult = {
    order?: number;
    resultA?: string | number;
    resultB?: string | number;
};

type ObjectWithMethods = {
    [key: string]: (arg0: CompareFunction) => CompareResult;
};

function getCompareFunction(type: string) {
    const _compareFunctions: ObjectWithMethods = {
        amount({ statusA, statusB, valueA, valueB }: CompareFunction) {
            if (statusA === "Ошибка вычисления") return { order: -1 };
            if (statusB === "Ошибка вычисления") return { order: 1 };

            if (isNaN(Number(valueA))) return { order: 1 };
            if (isNaN(Number(valueB))) return { order: -1 };

            return { resultA: valueA, resultB: valueB };
        },

        date({ valueA, valueB }: CompareFunction) {
            const resultA = Date.parse(String(valueA)) || "";
            const resultB = Date.parse(String(valueB)) || "";

            if (!resultA) return { order: 1 };
            if (!resultB) return { order: -1 };

            return { resultA, resultB };
        },

        numeric({ statusA, statusB, valueA, valueB }: CompareFunction) {
            if (statusA === "Ошибка вычисления") return { order: -1 };
            if (statusB === "Ошибка вычисления") return { order: 1 };

            if (isNaN(Number(valueA))) return { order: 1 };
            if (isNaN(Number(valueB))) return { order: -1 };

            return { resultA: valueA, resultB: valueB };
        },

        numericArray({ valueA = "", valueB = "" }: CompareFunction) {
            const arrayA = String(valueA).split(",");
            const arrayB = String(valueB).split(",");

            const resultA = parseInt(arrayA[0]);
            const resultB = parseInt(arrayB[0]);

            if (isNaN(resultA)) return { order: 1 };
            if (isNaN(resultB)) return { order: -1 };

            return { resultA, resultB };
        },

        text({ valueA = "", valueB = "" }: CompareFunction) {
            if (!valueA) return { order: 1 };
            if (!valueB) return { order: -1 };

            return { resultA: valueA, resultB: valueB };
        },
    };

    return _compareFunctions[type];
}
