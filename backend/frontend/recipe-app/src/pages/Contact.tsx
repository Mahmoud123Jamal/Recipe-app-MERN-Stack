import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Card,
} from "react-bootstrap";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can integrate with backend API here (e.g., send message)
    console.log(formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center text-center mb-5">
        <Col md={8}>
          <h2 className="fw-bold text-primary mb-3">Contact RecipeHub</h2>
          <p className="text-muted fs-5">
            Got a question, feedback, or recipe idea? We’d love to hear from
            you!
          </p>
        </Col>
      </Row>

      <Row className="g-4">
        <Col md={6}>
          <Card className="shadow-sm p-4 h-100">
            <h4 className="mb-3 text-primary">Send Us a Message</h4>

            {submitted && (
              <Alert variant="success">
                ✅ Your message has been sent! We’ll get back to you soon.
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="message">
                <Form.Label>Your Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Write your message..."
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button type="submit" variant="primary" className="w-100">
                Send Message
              </Button>
            </Form>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow-sm p-4 h-100">
            <h4 className="mb-3 text-primary">Contact Info</h4>
            <p className="d-flex align-items-center mb-3">
              <FaEnvelope className="me-3 text-primary" size={20} />
              <span>support@recipehub.com</span>
            </p>
            <p className="d-flex align-items-center mb-3">
              <FaPhoneAlt className="me-3 text-primary" size={20} />
              <span>01098836658</span>
            </p>
            <p className="d-flex align-items-center">
              <FaMapMarkerAlt className="me-3 text-primary" size={20} />
              <span>RecipeHub HQ, Cairo, Egypt</span>
            </p>

            <div className="mt-4">
              <iframe
                title="RecipeHub Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.0146502588925!2d31.2357!3d30.0444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14584102c7b3b25b%3A0x4e7f8b9f40ecb0f!2sCairo%2C%20Egypt!5e0!3m2!1sen!2seg!4v1672339200000"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
