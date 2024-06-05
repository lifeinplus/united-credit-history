import { useMemo } from "react";
import { Loan, Person, Report } from "../../../types";

const useRowActive = (
    rowActive: boolean,
    data: Loan[] | Person[] | Report[] = []
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

export default useRowActive;
