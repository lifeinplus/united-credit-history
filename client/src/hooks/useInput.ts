import { ChangeEvent } from "react";
import useLocalStorage from "./useLocalStorage";

const useInput = (key: string, initValue: string) => {
    const [value, setValue] = useLocalStorage(key, initValue);

    const attributes = {
        value,
        onChange: (e: ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value),
    };

    return [value, attributes] as const;
};

export default useInput;
