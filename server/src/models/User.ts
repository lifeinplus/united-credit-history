import mongoose, { Document, Schema } from "mongoose";

interface User {
    userName: string;
    password: string;
}

interface UserModel extends User, Document {}

const UserSchema: Schema = new Schema(
    {
        userName: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { versionKey: false }
);

export default mongoose.model<UserModel>("users", UserSchema);
