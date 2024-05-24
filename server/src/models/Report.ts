import mongoose, { Document, Schema } from "mongoose";

interface Report {
    appNumber: string;
    appCreationDate: string;
    clientName: string;
    documentNumber: string;
    documentSeries: string;
    reportCreationDate: string;
}

interface ReportModel extends Report, Document {}

const ReportSchema: Schema = new Schema(
    {
        appNumber: { type: String, required: true },
        appCreationDate: { type: String, required: true },
        clientName: { type: String, required: true },
        documentNumber: { type: String, required: true },
        documentSeries: { type: String, required: true },
        reportCreationDate: { type: String, required: true },
    },
    { versionKey: false }
);

export default mongoose.model<ReportModel>("reports", ReportSchema);
