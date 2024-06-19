import mongoose, { Document, Schema } from "mongoose";

interface User {
    userName: string;
    password: string;
    refreshToken: string;
    roles: Record<string, number>;
}

interface UserModel extends User, Document {}

const UserSchema: Schema = new Schema(
    {
        userName: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        refreshToken: { type: String },
        roles: { type: Schema.Types.Mixed },
    },
    { versionKey: false }
);

export default mongoose.model<UserModel>("users", UserSchema);
