import { useMemo } from "react";
import { ILoan, IPerson, IReport } from "../../../types";

const useRowActive = (
    rowActive: boolean,
    data: ILoan[] | IPerson[] | IReport[] = []
) => {
    return useMemo(() => {
        return rowActive
            ? data?.map((element, index) => ({
                  ...element,
                  activeId: String(index),
              }))
            : data;
    }, [rowActive, data]);
};

export { useRowActive };
