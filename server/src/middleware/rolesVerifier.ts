import { NextFunction, Response } from "express";
import { UserRequest } from "../types";

const rolesVerifier = (...allowedRoles: number[]) => {
    return (req: UserRequest, res: Response, next: NextFunction) => {
        if (!req?.roles) return res.sendStatus(401);

        const rolesArray = [...allowedRoles];

        const result = req.roles
            .map((role) => rolesArray.includes(role))
            .find((value) => value === true);

        if (!result) return res.sendStatus(401);

        next();
    };
};

export default rolesVerifier;
