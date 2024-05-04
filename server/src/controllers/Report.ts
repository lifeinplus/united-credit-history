import { Request, Response } from "express";
import Report from "../models/Report";

const read = (req: Request, res: Response) => {
    const { reportId } = req.params;

    return Report.findById(reportId)
        .then((report) =>
            report
                ? res.status(200).json({ report })
                : res.status(404).json({ message: "Not found" })
        )
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response) => {
    return Report.find()
        .sort("appNumber")
        .then((reports) => res.status(200).json({ reports }))
        .catch((error) => res.status(500).json({ error }));
};

export default { read, readAll };
