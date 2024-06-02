import { axiosPrivate } from "../api/axios";
import { useProfile, useProfileUpdate } from "../contexts";

const useRefreshToken = () => {
    const profile = useProfile();
    const profileUpdate = useProfileUpdate();

    return async () => {
        const response = await axiosPrivate.get("users/refreshToken");
        const { accessToken } = response.data;
        profileUpdate({ ...profile, accessToken });
        return accessToken;
    };
};

export default useRefreshToken;
