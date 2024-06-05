import { PropsWithChildren, createContext, useContext, useState } from "react";
import type { Auth, AuthContext } from "../types/Auth";

const Context = createContext<AuthContext>({
    auth: {},
    setAuth: () => {},
});

export const useAuth = () => {
    return useContext(Context);
};

const AuthProvider = ({ children }: PropsWithChildren) => {
    const [auth, setAuth] = useState<Auth>({});

    return (
        <Context.Provider value={{ auth, setAuth }}>
            {children}
        </Context.Provider>
    );
};

export default AuthProvider;
