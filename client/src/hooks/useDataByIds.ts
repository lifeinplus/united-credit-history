import { useEffect, useState } from "react";
import axios from "../api/axios";

export const useDataByIds = <T>(method: string, ids?: string[]) => {
    const [data, setData] = useState<T>();

    useEffect(() => {
        if (!ids?.length) return;

        axios
            .get(`/${method}`, {
                params: { loanIds: ids },
            })
            .then((response) => setData(response.data))
            .catch((error) => console.log(error.message));
    }, [ids]);

    return data;
};
