import { Request, Response } from "express";
import { Loan } from "../models";

const getByReportId = (req: Request, res: Response) => {
    const { reportId } = req.params;

    return Loan.find({ reportId })
        .then((loans) =>
            loans.length
                ? res.status(200).json(loans)
                : res.status(404).json({ message: "loans not found" })
        )
        .catch((error) => res.status(500).json({ error }));
};

export default { getByReportId };
