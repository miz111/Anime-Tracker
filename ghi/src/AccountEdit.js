import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const EditAccount = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  useEffect(() => {
    // Fetch current user information
    const fetchData = async () => {
      const data = await getUserInfo();
      setUsername(data.username);
      setEmail(data.email);
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a request to update user information
      const data = await updateUserInfo(username, email, password);
      // If update is successful
      if (data.success) {
        history.push('/profile');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('There was an error updating your account. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Save Changes</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default EditAccount;
