import { Request, Response } from "express";
import { Report } from "../models";

const getAll = (req: Request, res: Response) => {
    return Report.find()
        .select("-__v")
        .sort("appNumber")
        .then((reports) =>
            reports.length
                ? res.status(200).json(reports)
                : res.status(404).json({ message: "Reports not found" })
        )
        .catch((error) => res.status(500).json({ error }));
};

const getById = (req: Request, res: Response) => {
    const { reportId } = req.params;

    return Report.findById(reportId)
        .select("-__v")
        .then((report) =>
            report
                ? res.status(200).json(report)
                : res.status(404).json({ message: "Report not found" })
        )
        .catch((error) => res.status(500).json({ error }));
};

export default { getAll, getById };
