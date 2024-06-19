import { AxiosResponse } from "axios";
import { Dispatch, FormEvent, SetStateAction } from "react";

export interface Auth {
    userName?: string;
    accessToken?: string;
    roles?: number[];
}

export interface AuthContext {
    auth: Auth;
    setAuth: Dispatch<SetStateAction<Auth>>;
}

export interface AuthProps {
    buttonText: string;
    submit: { callback: SubmitCallback; url: string };
    question: {
        link: string;
        linkText: string;
        text: string;
    };
    title: string;
}

export interface SubmitCallback {
    (response: AxiosResponse, userName: string): void;
}

export interface SubmitHandler {
    (e: FormEvent<HTMLFormElement>): void;
}
