import mongoose, { Document, Schema } from "mongoose";

interface Common {
    reportId: string;
    chbCreditCardsAmountGbp: number;
    chbCreditCardsAmountRub: number;
    chbCreditCardsAmountTry: number;
    chbLoansAmountGbp: number;
    chbLoansAmountRub: number;
    chbLoansAmountTry: number;
    chbPaymentsAmountGbp: number;
    chbPaymentsAmountRub: number;
    chbPaymentsAmountTry: number;
    flcPaymentsAmountGbp: number;
    flcPaymentsAmountRub: number;
    flcPaymentsAmountTry: number;
    score: number;
}

interface CommonModel extends Common, Document {}

const CommonSchema: Schema = new Schema(
    {
        reportId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "reports",
            required: true,
        },

        chbCreditCardsAmountGbp: { type: Number, min: 0 },
        chbCreditCardsAmountRub: { type: Number, min: 0 },
        chbCreditCardsAmountTry: { type: Number, min: 0 },

        chbLoansAmountGbp: { type: Number, min: 0 },
        chbLoansAmountRub: { type: Number, min: 0 },
        chbLoansAmountTry: { type: Number, min: 0 },

        chbPaymentsAmountGbp: { type: Number, min: 0 },
        chbPaymentsAmountRub: { type: Number, min: 0 },
        chbPaymentsAmountTry: { type: Number, min: 0 },

        flcPaymentsAmountGbp: { type: Number, min: 0 },
        flcPaymentsAmountRub: { type: Number, min: 0 },
        flcPaymentsAmountTry: { type: Number, min: 0 },

        score: {
            type: Number,
            min: 300,
            max: 800,
        },
    },
    { versionKey: false }
);

export default mongoose.model<CommonModel>("commons", CommonSchema);
