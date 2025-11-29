import mongoose, { Document, Schema } from "mongoose";

export interface IRecipe extends Document {
  title: string;
  ingredients: string[];
  instructions: string;
  imageUrl: string;
  createdBy: mongoose.Types.ObjectId;
}
