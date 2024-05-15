import { Request, Response } from "express";
import { RequestCount } from "../models";

const getByReportId = (req: Request, res: Response) => {
    const { reportId } = req.params;

    return RequestCount.findOne({ reportId })
        .then((requestCounts) =>
            requestCounts
                ? res.status(200).json(requestCounts)
                : res.status(404).json({ message: "requestCounts not found" })
        )
        .catch((error) => res.status(500).json({ error }));
};

export default { getByReportId };
