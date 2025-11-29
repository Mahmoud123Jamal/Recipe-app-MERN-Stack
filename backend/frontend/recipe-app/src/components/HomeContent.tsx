import { Button, Col, Container, Row } from "react-bootstrap";
import foodBackground from "../assets/foodBackgroundHome.webp";
import { useNavigate } from "react-router-dom";
import Model from "./Model";
import { useUserContext } from "../context/UserContext";

function HomeContent() {
  const navigate = useNavigate();

  const { show, handleShow } = useUserContext();

  const handleAddRecipe = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/addRecipe");
    } else {
      handleShow();
    }
  };

  return (
    <>
      <Container className="mt-3 ">
        <Row className="align-items-center text-center text-md-start">
          {/* Left Column - Text Content */}
          <Col md={6} sm={12}>
            <h4 className="text-primary fw-bold ">
              Share Your Favorite Recipes with the World
            </h4>
            <p className="lead text-muted mb-4">
              Join our community of food lovers and share your favorite recipes
              with the world — where culinary creativity meets connection.
            </p>
            <Button variant="primary" size="lg" onClick={handleAddRecipe}>
              Share Recipes
            </Button>
          </Col>

          {/* Right Column - Image */}
          <Col md={6} sm={12} className="text-center">
            <img
              src={foodBackground}
              alt="foodBackground"
              className="img-fluid rounded "
              style={{ maxHeight: "300px" }}
            />
          </Col>
        </Row>
      </Container>

      {/* Decorative SVG Wave */}
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#0099ff"
            fillOpacity="1"
            d="M0,256L17.1,234.7C34.3,213,69,171,103,176C137.1,181,171,235,206,224C240,213,274,139,309,90.7C342.9,43,377,21,411,37.3C445.7,53,480,107,514,117.3C548.6,128,583,96,617,106.7C651.4,117,686,171,720,176C754.3,181,789,139,823,101.3C857.1,64,891,32,926,37.3C960,43,994,85,1029,112C1062.9,139,1097,149,1131,128C1165.7,107,1200,53,1234,32C1268.6,11,1303,21,1337,42.7C1371.4,64,1406,96,1423,112L1440,128L1440,320L1422.9,320C1405.7,320,1371,320,1337,320C1302.9,320,1269,320,1234,320C1200,320,1166,320,1131,320C1097.1,320,1063,320,1029,320C994.3,320,960,320,926,320C891.4,320,857,320,823,320C788.6,320,754,320,720,320C685.7,320,651,320,617,320C582.9,320,549,320,514,320C480,320,446,320,411,320C377.1,320,343,320,309,320C274.3,320,240,320,206,320C171.4,320,137,320,103,320C68.6,320,34,320,17,320L0,320Z"
          ></path>
        </svg>
        {show && <Model />}
      </div>
    </>
  );
}

export default HomeContent;
