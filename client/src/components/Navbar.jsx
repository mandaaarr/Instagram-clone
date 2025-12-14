import { Link } from 'react-router-dom';

function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = "/login";
  };

  return (
    <nav style={{ padding: '15px', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between' }}>
      <Link to="/" style={{ fontWeight: 'bold', textDecoration: 'none', color: 'black' }}>InstaClone</Link>
      <div>
        <Link to="/create" style={{ marginRight: '15px' }}>+ New Post</Link>
        <Link to="/search" style={{ marginRight: '15px' }}>🔍 Search</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;