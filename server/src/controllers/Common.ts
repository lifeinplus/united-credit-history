import { Request, Response } from "express";
import { Common } from "../models";

const getByReportId = (req: Request, res: Response) => {
    const { reportId } = req.params;

    return Common.findOne({ reportId })
        .then((commons) =>
            commons
                ? res.status(200).json(commons)
                : res.status(404).json({ message: "commons not found" })
        )
        .catch((error) => res.status(500).json({ error }));
};

export default { getByReportId };
