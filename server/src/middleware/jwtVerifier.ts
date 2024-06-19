import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

import { config } from "../config";
import Logging from "../library/Logging";
import { UserRequest, UserToken } from "../types";

const jwtVerifier = (req: UserRequest, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;

    if (!authorization?.startsWith("Bearer ")) {
        return res.sendStatus(401);
    }

    try {
        const token = authorization.split(" ")[1];

        const decoded = jwt.verify(
            token,
            config.token.access.secret
        ) as UserToken;

        req.roles = decoded.roles;
        next();
    } catch (error) {
        Logging.error(error);

        if (error instanceof Error) {
            return res
                .status(403)
                .json({ message: "jwtVerifier: " + error.message });
        }

        return res.status(500).json({ error });
    }
};

export default jwtVerifier;
