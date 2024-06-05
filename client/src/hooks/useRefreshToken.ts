import { axiosPrivate } from "../api/axios";
import { useAuth } from "../contexts";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    return async () => {
        const response = await axiosPrivate.get("users/refreshToken");
        const { accessToken, userName } = response.data;

        setAuth((prev) => {
            return { ...prev, accessToken, userName };
        });

        return accessToken;
    };
};

export default useRefreshToken;
