import { Schema, model, Document } from "mongoose";
import { IUser } from "../types/IUsertype";
const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = model<IUser>("User", userSchema);

export default User;
