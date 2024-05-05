import { Request, Response } from "express";
import { Person } from "../models";

const getByReportId = (req: Request, res: Response) => {
    const { reportId } = req.params;

    return Person.find({ reportId })
        .then((persons) =>
            persons
                ? res.status(200).json({ persons })
                : res.status(404).json({ message: "Not found" })
        )
        .catch((error) => res.status(500).json({ error }));
};

export default { getByReportId };
