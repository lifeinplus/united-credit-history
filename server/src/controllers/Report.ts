import { Request, Response } from "express";
import { Report } from "../models";

const getById = (req: Request, res: Response) => {
    const { reportId } = req.params;

    return Report.findById(reportId)
        .then((report) =>
            report
                ? res.status(200).json(report)
                : res.status(404).json({ message: "report not found" })
        )
        .catch((error) => res.status(500).json({ error }));
};

const get = (req: Request, res: Response) => {
    return Report.find()
        .sort("appNumber")
        .then((reports) =>
            reports.length
                ? res.status(200).json(reports)
                : res.status(404).json({ message: "reports not found" })
        )
        .catch((error) => res.status(500).json({ error }));
};

export default { getById, get };
