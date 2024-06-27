import { PropsWithChildren, createContext, useContext, useState } from "react";
import { ModalData, ModalDataContext } from "../types";

const Context = createContext<ModalDataContext>({
    modalData: {},
    setModalData: () => {},
});

export const useModalData = () => {
    return useContext(Context);
};

const ModalDataProvider = ({ children }: PropsWithChildren) => {
    const [modalData, setModalData] = useState<ModalData>({});

    return (
        <Context.Provider value={{ modalData, setModalData }}>
            {children}
        </Context.Provider>
    );
};

export default ModalDataProvider;
