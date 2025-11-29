import { Request, Response } from "express";
import Recipe from "../models/recipesModel";

export const createRecipe = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const { title, ingredients, instructions } = req.body;
    if (!title || !ingredients || !instructions) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }
    const imageUrl = `http://localhost:3001/uploads/${req.file?.filename}`;
    const newRecipe = await Recipe.create({
      title,
      ingredients,
      instructions,
      imageUrl,
      createdBy: user?.id,
    });

    res.status(201).json({
      message: "✅ Recipe created successfully",
      recipe: newRecipe,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating recipe", error });
  }
};

export const getRecipes = async (req: Request, res: Response) => {
  try {
    const recipes = await Recipe.find();
    if (!recipes) {
      return res.status(404).json({ message: "No recipes found" });
    }
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipes", error });
  }
};

export const getRecipeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipe", error });
  }
};

export const updateRecipe = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, ingredients, instructions } = req.body;
    const imageUrl = `http://localhost:3001/uploads/${req.file?.filename}`;

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      { title, ingredients, instructions, imageUrl },
      { new: true, runValidators: true }
    );
    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ message: "Error updating recipe", error });
  }
};

export const deleteRecipe = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedRecipe = await Recipe.findByIdAndDelete(id);
    if (!deletedRecipe) {
      return res
        .status(404)
        .json({ status: "fail", data: { message: "Recipe not found" } });
    }
    res.status(200).json({ status: "success", data: deletedRecipe });
  } catch (error) {
    res
      .status(500)
      .json({ status: "error", message: "Error deleting recipe", error });
  }
};
