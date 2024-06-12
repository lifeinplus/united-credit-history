import { NextFunction, Request, Response } from "express";
import Logging from "../library/Logging";

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    Logging.infoIn(
        `Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]]`
    );

    res.on("finish", () => {
        Logging.infoOut(
            `Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]] - Status: [${res.statusCode}]`
        );
    });

    next();
};

export default requestLogger;
