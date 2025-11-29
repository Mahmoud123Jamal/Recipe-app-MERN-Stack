import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import type { Recipe } from "../types/RecipeTypes";
import RecipeCard from "./RecipeCard";

function AllRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/recipes")
      .then((response) => setRecipes(response.data))
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">All Recipes</h2>
      <Row className="g-4 ">
        {recipes.map(
          ({ title, ingredients, instructions, imageUrl }, index) => (
            <Col key={index} xs={12} sm={6} md={4}>
              <RecipeCard
                title={title}
                ingredients={ingredients}
                instructions={instructions}
                imageUrl={imageUrl}
              />
            </Col>
          )
        )}
      </Row>
    </Container>
  );
}

export default AllRecipes;
