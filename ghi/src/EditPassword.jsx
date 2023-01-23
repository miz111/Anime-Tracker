import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditPassword = () => {
  const [submitted, setSubmitted] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="oldPassword" className="form-label">
         Old Password
        </label>
        <input
          required
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          type="password"
          className="form-control"
          id="oldPassword"
          placeholder="Old Password"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="newPassword" className="form-label">
            New Password
        </label>
        <input
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-control"
          id="newPassword"
          placeholder="New Password"
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

export default EditPassword;