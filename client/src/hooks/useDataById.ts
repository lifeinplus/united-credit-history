import { useEffect, useState } from "react";
import axios from "../api/axios";

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
