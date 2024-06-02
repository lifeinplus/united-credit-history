import { PropsWithChildren, createContext, useContext, useState } from "react";
import type { Auth } from "../types/Auth";

const AuthContext = createContext<Auth>({});
const AuthUpdateContext = createContext((data: Auth) => {});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const useAuthUpdate = () => {
    return useContext(AuthUpdateContext);
};

const AuthProvider = ({ children }: PropsWithChildren) => {
    const [auth, setAuth] = useState<Auth>({});

    return (
        <AuthContext.Provider value={auth}>
            <AuthUpdateContext.Provider value={setAuth}>
                {children}
            </AuthUpdateContext.Provider>
        </AuthContext.Provider>
    );
};

export default AuthProvider;
