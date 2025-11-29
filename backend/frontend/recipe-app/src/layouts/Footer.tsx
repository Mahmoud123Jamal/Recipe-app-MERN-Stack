import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer: React.FC = () => {
  return (
    <footer className="bg-light py-4 mt-5">
      <Container>
        <Row className="align-items-center text-center text-md-start">
          {/* Left Section */}
          <Col md={6} sm={12} className="mb-3 mb-md-0">
            <h5 className="fw-bold mb-2 text-primary">Recipe App</h5>
            <p className="text-muted small mb-0">
              Discover and share your favorite recipes with the world.
            </p>
          </Col>

          {/* Right Section */}
          <Col
            md={6}
            sm={12}
            className="text-center text-md-end small text-muted"
          >
            <p className="mb-0">
              © {new Date().getFullYear()} All Rights Reserved | Designed by{" "}
              <span className="text-primary fw-semibold">
                ENG:Mahmoud Jamal
              </span>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
