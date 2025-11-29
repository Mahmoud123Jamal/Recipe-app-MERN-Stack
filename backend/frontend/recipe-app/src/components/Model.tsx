import { Modal, Button } from "react-bootstrap";
import { useUserContext } from "../context/UserContext";
import Login from "./Login";
import SignUp from "./SignUp";

function ModalForm() {
  const { show, handleClose, formToggle } = useUserContext();

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{formToggle ? "Login" : "Sign Up"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{formToggle ? <Login /> : <SignUp />}</Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          form={formToggle ? "loginForm" : "signupForm"}
          type="submit"
        >
          {formToggle ? "Login" : "Sign Up"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalForm;
