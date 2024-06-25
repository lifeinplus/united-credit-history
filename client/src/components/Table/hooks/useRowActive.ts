import { useMemo } from "react";
import { Loan, Person, Report } from "../../../types/Report";
import { User } from "../../../types/User";

const useRowActive = (
    rowActive: boolean,
    data: Loan[] | Person[] | Report[] | User[] = []
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
