import React from "react";
import { Container, Button, Row, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center vh-100 bg-light text-center"
    >
      <Row>
        <Col>
          <Image
            src="https://cdn-icons-png.flaticon.com/512/7486/7486749.png"
            alt="Not Found"
            width={180}
            className="mb-4 opacity-75"
          />
          <h1 className="display-3 fw-bold text-primary">404</h1>
          <h4 className="mb-3 text-muted">Oops! Page not found</h4>
          <p className="text-secondary mb-4">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
          <Button variant="primary" size="lg" onClick={() => navigate("/")}>
            ⬅ Back to Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
