import { axiosPrivate } from "../api/axios";
import { useAuth } from "../contexts";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    return async () => {
        const response = await axiosPrivate.get("auth/refreshToken");
        const { accessToken, roles, userName } = response.data;

        setAuth((prev) => {
            return { ...prev, accessToken, roles, userName };
        });

        return accessToken;
    };
};

export default useRefreshToken;
