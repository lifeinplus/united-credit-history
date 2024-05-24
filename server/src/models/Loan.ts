import mongoose, { Document, Schema } from "mongoose";

interface Loan {
    reportId: string;
    balanceAmount: number;
    businessCategory: string;
    chbPayment: number;
    chbPaymentStatus: string;
    closeDate: string;
    contractPeriod: number;
    creationDate: string;
    currency: string;
    debtAmount: number;
    delinquencyAmount: number;
    guarantee: string;
    lastUpdateDate: string;
    loanAmount: number;
    loanNumberNchb: string;
    loanNumberUcb: string;
    loanType: string;
    monthsNumberBeforeCloseDate: number;
    monthsNumberSinceCreationDate: number;
    paymentPeriod: number;
    status: string;
    unpaidPercent: number;
    unpaidPercentStatus: string;
}

interface LoanModel extends Loan, Document {}

const LoanSchema: Schema = new Schema(
    {
        reportId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "reports",
            required: true,
        },
        balanceAmount: { type: Number, min: 0 },
        businessCategory: String,
        chbPayment: { type: Number, min: 0 },
        chbPaymentStatus: String,
        closeDate: String,
        contractPeriod: { type: Number, min: 0 },
        creationDate: String,
        currency: String,
        debtAmount: { type: Number },
        delinquencyAmount: { type: Number, min: 0 },
        guarantee: String,
        lastUpdateDate: String,
        loanAmount: { type: Number, min: 0 },
        loanNumberNchb: String,
        loanNumberUcb: String,
        loanType: String,
        monthsNumberBeforeCloseDate: { type: Number, min: 0 },
        monthsNumberSinceCreationDate: { type: Number, min: 0 },
        paymentPeriod: { type: Number, min: 0 },
        status: String,
        unpaidPercent: { type: Number },
        unpaidPercentStatus: String,
    },
    { versionKey: false }
);

export default mongoose.model<LoanModel>("loans", LoanSchema);
