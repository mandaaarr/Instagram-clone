import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // API Call to your backend
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      
      // Store the token
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.user.id);
      
      // Redirect to Home
      window.location.href = "/";
    } catch (err) {
      alert("Login Failed: " + (err.response?.data || "Server Error"));
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '300px', margin: 'auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Email" 
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: 'block', width: '100%', marginBottom: '10px' }} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: 'block', width: '100%', marginBottom: '10px' }} 
        />
        <button type="submit" style={{ width: '100%' }}>Log In</button>
      </form>
      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
    </div>
  );
}

export default Login;