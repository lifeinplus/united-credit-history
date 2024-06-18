import { Request } from "express";

export interface UserRequest extends Request {
    roles?: number[];
}

export interface UserToken {
    userName: string;
    roles: number[];
}
