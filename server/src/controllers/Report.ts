import { Request, Response } from "express";
import Report from "../models/Report";

const readAll = (req: Request, res: Response) => {
    return Report.find()
        .sort("appNumber")
        .then((reports) => res.status(200).json({ reports }))
        .catch((error) => res.status(500).json({ error }));
};

export default { readAll };
