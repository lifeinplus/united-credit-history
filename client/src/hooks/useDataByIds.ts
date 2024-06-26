import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useAxiosPrivate from "./useAxiosPrivate";

const useDataByIds = <T>(method: string, ids?: string[]) => {
    const [data, setData] = useState<T>();
    const axiosPrivate = useAxiosPrivate();
    const location = useLocation();
    const navigate = useNavigate();
    const effectRan = useRef(false);

    useEffect(() => {
        if (ids?.length && effectRan.current === true) {
            axiosPrivate
                .get(`/${method}`, {
                    params: { loanIds: ids },
                })
                .then((response) => setData(response.data))
                .catch((error) => {
                    console.log(error.message);
                    navigate("/login", {
                        state: { from: location },
                        replace: true,
                    });
                });
        }

        return () => {
            effectRan.current = true;
        };
    }, [ids]);

    return data;
};

export default useDataByIds;
