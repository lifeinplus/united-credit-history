import mongoose, { Schema } from "mongoose";

const ReportSchema: Schema = new Schema({
    appNumber: {
        type: String,
        required: true,
    },

    appCreationDate: {
        type: String,
        required: true,
    },

    clientName: {
        type: String,
        required: true,
    },

    documentNumber: {
        type: String,
        required: true,
    },

    documentSeries: {
        type: String,
        required: true,
    },

    reportCreationDate: {
        type: String,
        required: true,
    },
});

export default mongoose.model("reports", ReportSchema);
