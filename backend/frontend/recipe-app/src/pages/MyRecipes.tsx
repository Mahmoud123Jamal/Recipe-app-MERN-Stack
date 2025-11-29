import { useEffect, useState } from "react";
import type { Recipe } from "../types/RecipeTypes";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import RecipeCard from "../components/RecipeCard";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function MyRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const user = JSON.parse(localStorage.getItem("user") as string);
      if (!user) return;

      try {
        const { data } = await axios.get("http://localhost:3001/api/recipes");
        const filteredRecipes = data.filter(
          (recipe: any) => recipe.createdBy === user._id
        );
        setRecipes(filteredRecipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);
  const navigate = useNavigate();
  //handle deleting
  const onHandleDelete = async (_id: string) => {
    await axios.delete(`http://localhost:3001/api/recipes/${_id}`);
    setRecipes((prev) => prev.filter((r) => r._id !== _id));
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">My Recipes</h2>

      {recipes.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center text-muted fs-5 mt-4 No-recipes-found ">
          <p> No recipes found 😔</p>
        </div>
      ) : (
        <Row className="g-4">
          {recipes.map(
            ({ _id, title, ingredients, instructions, imageUrl }) => (
              <Col key={_id} xs={12} sm={6} md={4}>
                <RecipeCard
                  title={title}
                  ingredients={ingredients}
                  instructions={instructions}
                  imageUrl={imageUrl}
                >
                  <div className="d-flex justify-content-between ">
                    <FaEdit
                      onClick={() => {
                        navigate(`/editRecipe/${_id}`);
                      }}
                      className="my-recipes-icons text-dark  "
                    />
                    <MdDelete
                      onClick={() => {
                        onHandleDelete(_id!);
                      }}
                      className="my-recipes-icons text-danger  "
                    />
                  </div>
                </RecipeCard>
              </Col>
            )
          )}
        </Row>
      )}
    </Container>
  );
}

export default MyRecipes;
