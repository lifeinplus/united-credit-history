import { axiosPrivate } from "../api/axios";
import { useAuth, useAuthUpdate } from "../contexts";

const useRefreshToken = () => {
    const auth = useAuth();
    const authUpdate = useAuthUpdate();

    return async () => {
        const response = await axiosPrivate.get("users/refreshToken");
        const { accessToken, userName } = response.data;
        authUpdate({ ...auth, accessToken, userName });
        return accessToken;
    };
};

export default useRefreshToken;
