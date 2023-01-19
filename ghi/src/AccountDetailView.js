import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AccountDetailView = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccountData = async () => {
      const accountUrl = `${process.env.REACT_APP_ACCOUNTS_API_HOST}/account`;
      const fetchConfig = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
      };

      const response = await fetch(accountUrl, fetchConfig);

      if (response.ok) {
        const account = await response.json();
        setEmail(account.email);
        setUsername(account.username);
        setFirstName(account.first_name);
        setLastName(account.last_name);
      } else {
        navigate("/login");
      }
    };

    fetchAccountData();
  }, [navigate]);

  return (
    <form>
      <div className="mb-3">
        <label htmlFor="firstname" className="form-label">
          First name
        </label>
        <input
          disabled
          value={first_name}
          type="text"
          className="form-control"
          id="firstname"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="lastName" className="form-label">
          Last name
        </label>
        <input
          disabled
          value={last_name}
          type="text"
          className="form-control"
          id="lastName"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          User Name
        </label>
        <input
          disabled
          value={username}
          type="text"
          className="form-control"
          id="username"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          disabled
          value={email}
          type="email"
          className="form-control"
          id="email"
        />
      </div>
    </form>
  );
};

export default AccountDetailView;