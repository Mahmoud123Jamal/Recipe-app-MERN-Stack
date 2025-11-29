import { Form, Button } from "react-bootstrap";
import { useUserContext } from "../context/UserContext";

function SignUp() {
  const {
    switchForms,
    handleSubmit,
    handleEmail,
    handlePassword,
    handleConfirmPassword,
    email,
    password,
    confirmPassword,
    error,
    success,
  } = useUserContext();

  return (
    <Form id="signupForm" onSubmit={handleSubmit} method="POST">
      <Form.Group className="mb-3" controlId="signupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={handleEmail}
          placeholder="name@example.com"
          autoFocus
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="signupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={handlePassword}
          placeholder="Enter password"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="signupConfirmPassword">
        <Form.Label>Confirm password</Form.Label>
        <Form.Control
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPassword}
          placeholder="Re-enter password"
        />
      </Form.Group>

      {error && <p className="text-danger">{error}</p>}
      {success && <p className="text-success">{success}</p>}

      <Button type="submit" className="mt-2 w-100">
        Sign Up
      </Button>

      <div className="mt-3 text-center">
        <small>
          Already have an account?
          <Button variant="link" onClick={switchForms} className="p-0">
            Login
          </Button>
        </small>
      </div>
    </Form>
  );
}

export default SignUp;
