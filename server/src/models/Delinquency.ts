import mongoose, { Document, Schema } from "mongoose";

interface Delinquency {
    loanId: string;
    delinquency0Plus: number;
    delinquency30Plus: number;
    delinquency60Plus: number;
    delinquency90Plus: number;
    delinquencyRefinancing: number;
}

interface DelinquencyModel extends Delinquency, Document {}

const DelinquencySchema: Schema = new Schema(
    {
        loanId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "loans",
            required: true,
        },
        delinquency0Plus: { type: Number, min: 0 },
        delinquency30Plus: { type: Number, min: 0 },
        delinquency60Plus: { type: Number, min: 0 },
        delinquency90Plus: { type: Number, min: 0 },
        delinquencyRefinancing: { type: Number, min: 0 },
    },
    { versionKey: false }
);

export default mongoose.model<DelinquencyModel>(
    "delinquencies",
    DelinquencySchema
);
