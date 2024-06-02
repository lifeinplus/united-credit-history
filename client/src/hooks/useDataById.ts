import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useAxiosPrivate from "./useAxiosPrivate";

const useDataById = <T>(method: string, id?: string) => {
    const [data, setData] = useState<T>();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const effectRan = useRef(false);

    useEffect(() => {
        if (id && effectRan.current === true) {
            axiosPrivate
                .get(`/${method}/${id}`)
                .then((response) => setData(response.data))
                .catch((error) => {
                    console.log(error.message);
                    navigate("/signin", {
                        state: { from: location },
                        replace: true,
                    });
                });
        }

        return () => {
            effectRan.current = true;
        };
    }, [id]);

    return data;
};

export default useDataById;
