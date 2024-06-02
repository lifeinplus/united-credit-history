import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";
import Logging from "../library/Logging";

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;

    if (!authorization) return res.sendStatus(401);

    try {
        const token = authorization.split(" ")[1];
        jwt.verify(token, config.token.access.secret);
        next();
    } catch (error) {
        Logging.error(error);

        if (error instanceof Error) {
            return res
                .status(403)
                .json({ message: "verifyJWT: " + error.message });
        }

        return res.status(500).json({ error });
    }
};

export default verifyJWT;
