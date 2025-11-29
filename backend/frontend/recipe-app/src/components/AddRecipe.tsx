import axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import type { Recipe } from "../types/RecipeTypes";

function AddRecipe() {
  interface RecipeForm extends Omit<Recipe, "imageUrl"> {
    imageUrl: File | null;
  }
  const [recipe, setRecipe] = useState<RecipeForm>({
    title: "",
    ingredients: [],
    instructions: "",
    imageUrl: null,
  });
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // If the field is a file input
    if (name === "imageUrl" && e.target instanceof HTMLInputElement) {
      const file = e.target.files?.[0] || null;
      setRecipe((prev) => ({ ...prev, imageUrl: file }));
      return;
    }

    // For ingredients (split by commas)
    const newValue =
      name === "ingredients"
        ? value.split(",").map((item) => item.trim())
        : value;

    setRecipe((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", recipe.title);
    formData.append("instructions", recipe.instructions);
    formData.append("ingredients", recipe.ingredients.join(","));
    if (recipe.imageUrl) {
      formData.append("imageUrl", recipe.imageUrl);
    }
    try {
      await axios.post("http://localhost:3001/api/recipes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4 mt-3 w-50 mx-auto border border-3 border-primary rounded shadow shadow-lg">
      <h2 className="fw-bold text-center text-primary mb-2">
        Add a New Recipe
      </h2>

      <Form onSubmit={handleSubmit} className="d-flex flex-column gap-1">
        <Form.Group controlId="formRecipeName">
          <Form.Label>Recipe Name</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="text"
            name="title"
            placeholder="Enter recipe name"
            required
          />
        </Form.Group>

        <Form.Group controlId="formRecipeIngredients">
          <Form.Label>Ingredients</Form.Label>
          <Form.Control
            onChange={handleChange}
            as="textarea"
            rows={2}
            name="ingredients"
            placeholder="Enter ingredients (comma separated)"
            style={{ resize: "none" }}
            required
          />
        </Form.Group>

        <Form.Group controlId="formRecipeInstructions">
          <Form.Label>Instructions</Form.Label>
          <Form.Control
            onChange={handleChange}
            as="textarea"
            rows={2}
            name="instructions"
            placeholder="Enter cooking instructions"
            style={{ resize: "none" }}
            required
          />
        </Form.Group>

        <Form.Group controlId="formRecipeImage">
          <Form.Label>Add Image</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="file"
            name="imageUrl"
            required
          />
        </Form.Group>

        <div className="text-center">
          <Button variant="primary" type="submit" className="mt-3">
            Add Recipe
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default AddRecipe;
