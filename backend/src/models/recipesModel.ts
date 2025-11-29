import mongoose, { Schema, model } from "mongoose";

import { IRecipe } from "../types/IRecipetype";
const recipeSchema = new Schema<IRecipe>({
  title: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: String, required: true },
  imageUrl: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Recipe = model<IRecipe>("Recipe", recipeSchema);
export default Recipe;
