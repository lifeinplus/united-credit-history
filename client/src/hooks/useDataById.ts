import axios from "axios";
import { useEffect, useState } from "react";

export const useDataById = <T>(method: string, id?: string) => {
    const [data, setData] = useState<T>();

    useEffect(() => {
        if (!id) return;

        axios
            .get(`/${method}/${id}`)
            .then((response) => setData(response.data))
            .catch((error) => console.log(error.message));
    }, [id]);

    return data;
};
