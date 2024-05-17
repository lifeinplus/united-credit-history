import { Request, Response } from "express";
import { Flc } from "../models";

const getByLoanIds = (req: Request, res: Response) => {
    const { loanIds } = req.query;

    return Flc.find({
        loanId: { $in: loanIds },
    })
        .then((flcs) =>
            flcs.length
                ? res.status(200).json(flcs)
                : res.status(404).json({ message: "Flcs not found" })
        )
        .catch((error) => res.status(500).json({ error }));
};

export default { getByLoanIds };
