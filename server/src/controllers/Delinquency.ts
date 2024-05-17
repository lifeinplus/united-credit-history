import { Request, Response } from "express";
import { Delinquency } from "../models";

const getByLoanIds = (req: Request, res: Response) => {
    const { loanIds } = req.query;

    return Delinquency.find({
        loanId: { $in: loanIds },
    })
        .then((delinquencies) =>
            delinquencies.length
                ? res.status(200).json(delinquencies)
                : res.status(404).json({ message: "Delinquencies not found" })
        )
        .catch((error) => res.status(500).json({ error }));
};

export default { getByLoanIds };
