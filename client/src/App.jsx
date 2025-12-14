import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Navbar from './components/Navbar'; 
import Signup from './pages/Signup';
import Search from './pages/Search';
import PostDetail from './pages/PostDetail';

function App() {
  // Check if user is logged in
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <div className="app-container">
      {isAuthenticated && <Navbar />} 
      
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/create" element={isAuthenticated ? <CreatePost /> : <Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search" element={isAuthenticated ? <Search /> : <Navigate to="/login" />} />
        <Route path="/posts/:id" element={isAuthenticated ? <PostDetail /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;