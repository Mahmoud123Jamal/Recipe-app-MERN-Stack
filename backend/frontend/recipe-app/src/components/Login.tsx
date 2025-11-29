import { Form, Button } from "react-bootstrap";
import { useUserContext } from "../context/UserContext";

function Login() {
  const {
    switchForms,
    handleSubmit,
    error,
    handleEmail,
    handlePassword,
    email,
    password,
    success,
  } = useUserContext();

  return (
    <Form id="loginForm" onSubmit={handleSubmit} method="POST">
      <Form.Group className="mb-3" controlId="loginEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          name="email"
          onChange={handleEmail}
          value={email}
          type="email"
          placeholder="name@example.com"
          autoFocus
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="loginPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="password"
          onChange={handlePassword}
          value={password}
          type="password"
          placeholder="Enter password"
        />
      </Form.Group>
      {error && <p className="text-danger">{error}</p>}
      {success && <p className="text-success">{success}</p>}
      <div className="mt-3 text-center">
        <small>
          Don’t have an account?
          <Button variant="link" onClick={switchForms} className="p-0">
            Sign up
          </Button>
        </small>
      </div>
    </Form>
  );
}

export default Login;
