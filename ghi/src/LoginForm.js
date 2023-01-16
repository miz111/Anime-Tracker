import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useToken } from "./auth";

function LoginForm() {
  const [, login] = useToken();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invalid, setInvalid] = useState(false);
  let navigate = useNavigate();

  const clearState = () => {
    setEmail("");
    setPassword("");
    setInvalid("");
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const error = await login(email, password);
    if (error) {
      setInvalid(true);
    } else {
      clearState();
      navigate("/");
    }
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1 className="text-left display-6">Login</h1>
          <div className="text-left mb-3 lead">
            Don't have an account?
            <NavLink to="/signup"> Create account</NavLink>
          </div>
          <form id="create-appointment-form" onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                type="text"
                name="email"
                id="email"
                className="form-control"
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                required
                type="password"
                name="password"
                id="password"
                className="form-control"
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="col text-left">
              <button className="btn btn-primary">Log In</button>
            </div>
          </form>
          {invalid && (
            <div
              className="alert alert-danger mb-0 p-4 mt-4"
              id="invalid-message"
            >
              Incorrect email and/or password. Please
              try again.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
