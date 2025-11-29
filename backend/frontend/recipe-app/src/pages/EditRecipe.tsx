import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import type { Recipe } from "../types/RecipeTypes";

function EditRecipe() {
  interface RecipeForm extends Omit<Recipe, "imageUrl"> {
    imageUrl: File | null | string;
  }

  const [recipe, setRecipe] = useState<RecipeForm>({
    title: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const getRecipe = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3001/api/recipes/${id}`
        );

        setRecipe({
          title: data.title,
          ingredients: Array.isArray(data.ingredients)
            ? data.ingredients
            : data.ingredients.split(",").map((item: string) => item.trim()),
          instructions: data.instructions,
          imageUrl: data.imageUrl || "",
        });
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    getRecipe();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "ingredients") {
      const ingredientsArray = value
        .split(",")
        .map((item: string) => item.trim());
      setRecipe((prev) => ({ ...prev, ingredients: ingredientsArray }));
    } else {
      setRecipe((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", recipe.title);
    formData.append("instructions", recipe.instructions);
    formData.append("ingredients", recipe.ingredients.join(","));

    if (selectedFile) {
      formData.append("imageUrl", selectedFile);
    }

    try {
      await axios.put(`http://localhost:3001/api/recipes/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      navigate("/recipes");
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  return (
    <div className="p-4 mt-3 w-50 mx-auto border border-3 border-primary rounded shadow shadow-lg">
      <h2 className="fw-bold text-center text-primary mb-2">Edit Recipe</h2>

      <Form onSubmit={handleSubmit} className="d-flex flex-column gap-1">
        <Form.Group controlId="formRecipeName">
          <Form.Label>Recipe Name</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="text"
            name="title"
            value={recipe.title}
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
            value={recipe.ingredients.join(", ")}
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
            value={recipe.instructions}
            placeholder="Enter cooking instructions"
            style={{ resize: "none" }}
            required
          />
        </Form.Group>

        <Form.Group controlId="formRecipeImage">
          <Form.Label>Recipe Image</Form.Label>
          <Form.Control
            onChange={handleFileChange}
            type="file"
            name="imageFile"
            accept="image/*"
            required
          />
        </Form.Group>

        <div className="text-center">
          <Button variant="primary" type="submit" className="mt-3">
            Update Recipe
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default EditRecipe;
