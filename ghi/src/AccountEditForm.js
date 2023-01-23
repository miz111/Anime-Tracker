import { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext, useToken } from "./auth";

const AccountEditForm = () => {
  let { user, setUser } = useAuthContext();

  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { first_name, last_name, email, username, password };
    const editUrl = `${process.env.REACT_APP_ACCOUNTS_API_HOST}/api/accounts/${user.id}`;
    const fetchConfig = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    };

    const response = await fetch(editUrl, fetchConfig)
      .then(res => res.json())
      .then(data => {
        setUser(prev => ({
          ...prev,
          first_name: first_name,
          last_name: last_name,
          email: email,
          username: username,
          password: password
        }));
        navigate("/AccountDetailView");
      })
      ;

  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="firstname" className="form-label">
          First name
        </label>
        <input
          required
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
          type="text"
          className="form-control"
          id="firstname"
          placeholder="First name"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="lastName" className="form-label">
          Last name
        </label>
        <input
          required
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
          type="text"
          className="form-control"
          id="lastName"
          placeholder="Last name"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          className="form-control"
          id="username"
          placeholder="Username"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-control"
          id="password"
          placeholder="Password"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="form-control"
          id="email"
          placeholder="you@email.com"
        />
      </div>
      <button className="btn btn-primary">Save Changes</button>
      {submitted && (
        <div className="success-message">
          Success! Your account has been updated.
        </div>
      )}
    </form>
  );
};

export default AccountEditForm;