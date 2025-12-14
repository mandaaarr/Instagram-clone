import { useState } from 'react';
import axios from 'axios';

function Search() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:5000/api/users/search/${username}`);
      setUser(res.data);
      setError('');
    } catch (err) {
      setUser(null);
      setError("User not found");
    }
  };

  const handleFollow = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/users/${user._id}/follow`, {}, {
        headers: { 'x-auth-token': token }
      });
      alert(`You are now following ${user.username}!`);
      window.location.reload();
    } catch (err) {
      alert("Error: " + (err.response?.data || "Could not follow"));
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Find Users</h2>
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px' }}>
        <input 
          type="text" placeholder="Enter username (e.g. ankit)" 
          value={username} onChange={e => setUsername(e.target.value)}
          style={{ flex: 1, padding: '8px' }}
        />
        <button type="submit">Search</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {user && (
        <div style={{ border: '1px solid #ccc', marginTop: '20px', padding: '15px', borderRadius: '8px' }}>
          <h3>{user.username}</h3>
          <p>Email: {user.email}</p>
          <button onClick={handleFollow} style={{ backgroundColor: '#0095f6', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>
            Follow
          </button>
        </div>
      )}
    </div>
  );
}

export default Search;