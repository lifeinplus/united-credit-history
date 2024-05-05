import mongoose, { Schema } from "mongoose";

const PersonSchema: Schema = new Schema(
    {
        reportId: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "reports",
            required: true,
        },

        birthDate: String,

        clientName: String,

        dataSource: {
            type: String,
            required: true,
        },

        documentIssueDate: String,

        documentNumber: String,

        documentSeries: String,
    },
    { versionKey: false }
);

export default mongoose.model("persons", PersonSchema);
