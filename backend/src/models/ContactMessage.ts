import mongoose, { Schema, Document } from "mongoose";
import { IContactMessage } from "../types/IContacttype";

const contactSchema = new Schema<IContactMessage>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ContactMessage = mongoose.model<IContactMessage>(
  "ContactMessage",
  contactSchema
);

export default ContactMessage;
