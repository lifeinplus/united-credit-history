import mongoose, { Schema } from "mongoose";

const Flc: Schema = new Schema(
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

export default mongoose.model("flcs", Flc);
