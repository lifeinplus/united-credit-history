import axios from "axios";
import { useEffect, useState } from "react";

export const useDataByIds = <T>(method: string, ids?: string[]) => {
    const [data, setData] = useState<T>();

    useEffect(() => {
        if (!ids?.length) return;

        axios
            .get(`http://localhost:9090/${method}`, {
                params: { loanIds: ids },
            })
            .then((response) => setData(response.data))
            .catch((error) => console.log(error.message));
    }, [ids]);

    return data;
};
