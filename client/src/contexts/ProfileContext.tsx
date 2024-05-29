import {
    PropsWithChildren,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import axios from "../api/axios";
import type { Profile } from "../types";

const ProfileContext = createContext<Profile>({});
const ProfileUpdateContext = createContext((data: Profile) => {});

export const useProfile = () => {
    return useContext(ProfileContext);
};

export const useProfileUpdate = () => {
    return useContext(ProfileUpdateContext);
};

const ProfileProvider = ({ children }: PropsWithChildren) => {
    const [profile, setProfile] = useState<Profile>({});

    useEffect(() => {
        if (profile.userName) return;
        axios
            .get("users/getProfile", {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            })
            .then(({ data }) => setProfile(data.profile))
            .catch((error) => console.error(error));
    }, []);

    return (
        <ProfileContext.Provider value={profile}>
            <ProfileUpdateContext.Provider value={setProfile}>
                {children}
            </ProfileUpdateContext.Provider>
        </ProfileContext.Provider>
    );
};

export default ProfileProvider;
