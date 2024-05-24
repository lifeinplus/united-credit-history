import { AxiosResponse } from "axios";
import { ChangeEvent, FormEvent } from "react";

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

export interface OnChangeHandler {
    (e: ChangeEvent<HTMLInputElement>, inputName: string): void;
}

export interface SubmitCallback {
    (response: AxiosResponse, userData: UserData): void;
}

export interface SubmitHandler {
    (e: FormEvent<HTMLFormElement>): void;
}

export interface UserData {
    userName: string;
    password: string;
}
