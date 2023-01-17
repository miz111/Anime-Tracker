import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { validateEmail, validatePassword } from './validation';
import { getUserInfo, updateUserInfo } from './api';

const EditAccount = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    // Fetch current user information
    const fetchData = async () => {
      try {
        const data = await getUserInfo();
        setUsername(data.username);
        setEmail(data.email);
      } catch (err) {
        setError("Couldn't fetch user information, please try again later.");
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validateEmail(email)) {
      setError("Invalid email address.");
      return;
    }
    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters long, contains at least one lowercase letter, one uppercase letter and one number.");
      return;
    }
    if (password !== passwordConfirm) {
      setError("Password confirmation doesn't match.");
      return;
    }
    setLoading(true);
    try {
      // Make a request to update user information
      const data = await updateUserInfo(username, email, password);
      // If update is successful
      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          history.push('/profile');
        }, 2000);
      } else {
        setError(data.message  );
      }
    } catch (err) {
      setError('There was an error updating your account. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleCancel = () => {
    history.push('/profile');
  };

  return (
    <form onSubmit={handleSubmit} className="edit-account-form">
      <label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
      </label>
      <label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
      </label>
      <label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
      </label>
      <label>
        <input
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          placeholder="Confirm Password"
          required
        /> 
        </label>
      <div className="form-buttons">
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">Changes saved successfully!</p>}
    </form>
  );
};

export default EditAccount;