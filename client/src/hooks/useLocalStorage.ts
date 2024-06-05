import { useEffect, useState } from "react";

const useLocalStorage = (key: string, initValue: string) => {
    const [value, setValue] = useState(localStorage.getItem(key) || initValue);

    useEffect(() => {
        localStorage.setItem(key, value);
    }, [key, value]);

    return [value, setValue] as const;
};

export default useLocalStorage;
