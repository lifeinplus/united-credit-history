import mongoose, { Document, Schema } from "mongoose";

interface Flc {
    loanId: string;
    flcPayment: number;
    flcTaken: number;
    flcNchb: number;
    flcUcb: number;
}

interface FlcModel extends Flc, Document {}

const FlcSchema: Schema = new Schema(
    {
        loanId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "loans",
            required: true,
        },
        flcPayment: { type: Number, min: 0 },
        flcTaken: Number,
        flcNchb: Number,
        flcUcb: Number,
    },
    { versionKey: false }
);

export default mongoose.model<FlcModel>("flcs", FlcSchema);
