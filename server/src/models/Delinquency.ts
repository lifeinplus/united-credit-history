import mongoose, { Schema } from "mongoose";

const Delinquency: Schema = new Schema(
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

export default mongoose.model("delinquencies", Delinquency);
