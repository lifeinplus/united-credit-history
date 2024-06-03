import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { useAuth } from "../contexts";
import { useRefreshToken } from "../hooks";

import Spinner from "../components/Spinner";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const auth = useAuth();
    const refreshToken = useRefreshToken();

    useEffect(() => {
        let isMounted = true;

        if (!auth.accessToken) {
            refreshToken()
                .catch((error) => console.error(error))
                .finally(() => isMounted && setIsLoading(false));
        } else {
            setIsLoading(false);
        }

        return () => {
            isMounted = false;
        };
    }, []);

    return <>{isLoading ? <Spinner /> : <Outlet />}</>;
};

export default PersistLogin;
