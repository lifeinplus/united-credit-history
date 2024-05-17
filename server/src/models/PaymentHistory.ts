import mongoose, { Schema } from "mongoose";

const PaymentHistory: Schema = new Schema(
    {
        loanId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "loans",
            required: true,
        },

        date: String,

        status: String,
    },
    { versionKey: false }
);

export default mongoose.model("paymenthistories", PaymentHistory);
