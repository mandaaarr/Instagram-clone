import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        username, email, password
      });
      alert("Account created! Please log in.");
      window.location.href = "/login";
    } catch (err) {
      alert("Error: " + (err.response?.data || "Signup failed"));
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '300px', margin: 'auto' }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input 
          type="text" placeholder="Username" 
          onChange={e => setUsername(e.target.value)} required
          style={{ width: '100%', marginBottom: '10px' }} 
        />
        <input 
          type="email" placeholder="Email" 
          onChange={e => setEmail(e.target.value)} required
          style={{ width: '100%', marginBottom: '10px' }} 
        />
        <input 
          type="password" placeholder="Password" 
          onChange={e => setPassword(e.target.value)} required
          style={{ width: '100%', marginBottom: '10px' }} 
        />
        <button type="submit" style={{ width: '100%' }}>Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/login">Log in</Link></p>
    </div>
  );
}

export default Signup;