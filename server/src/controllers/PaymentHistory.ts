import { Request, Response } from "express";
import { PaymentHistory } from "../models";

const getByLoanIds = (req: Request, res: Response) => {
    const { loanIds } = req.query;

    return PaymentHistory.find({
        loanId: { $in: loanIds },
    })
        .then((paymentHistories) =>
            paymentHistories.length
                ? res.status(200).json(paymentHistories)
                : res
                      .status(404)
                      .json({ message: "PaymentHistories not found" })
        )
        .catch((error) => res.status(500).json({ error }));
};

export default { getByLoanIds };
