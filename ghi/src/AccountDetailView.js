import React, { useState, useEffect } from "react";

const AccountDetailView = () => {
const [first_name, setFirstname] = useState("");
const [last_name, setLastname] = useState("");
const [username, setUsername] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');

  useEffect(() => {
    // Fetch current user information
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getUserInfo();
        setFirstname(data.firstname);
        setLastname(data.lastname);
        setUsername(data.username);
        setEmail(data.email);
        setPassword(data.password);
      } catch (err) {
        setError("Couldn't fetch user information, please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="account-detail-view">
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && (
        <>
            <p>First Name: {first_name}</p>
            <p>Last Name: {last_name}</p>
          <p>Username: {username}</p>
          <p>Email: {email}</p>
          <p>Password: *******</p>
        </>
      )}
      <button onClick={() => history.push("/edit-account")}>Edit Account</button>
      <button onClick={() => history.push("/homepage")}>Back to Home Page</button>
    </div>
  );
};

export default AccountDetailView;