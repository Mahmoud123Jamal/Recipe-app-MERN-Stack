import { Card } from "react-bootstrap";
import type { Recipe } from "../types/RecipeTypes";
import type { ReactNode } from "react";

type RecipeCardProps = Recipe & {
  children?: ReactNode;
};

function RecipeCard({
  imageUrl,
  title,
  ingredients,
  instructions,
  children,
}: RecipeCardProps) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img variant="top" src={imageUrl} className="card-img-size" />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          <strong>Ingredients:</strong>{" "}
          {Array.isArray(ingredients) ? ingredients.join(", ") : ingredients}
        </Card.Text>
        <Card.Text>
          <strong>Instructions:</strong> {instructions}
        </Card.Text>
        {children && <div className="extra">{children}</div>}
      </Card.Body>
    </Card>
  );
}

export default RecipeCard;
