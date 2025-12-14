import { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem('userId'); 

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        // 1. Get User Stats
        const userRes = await axios.get(`http://localhost:5000/api/users/${userId}`);
        setUser(userRes.data);

        // 2. Get User Posts
        const postsRes = await axios.get(`http://localhost:5000/api/posts/user/${userId}`);
        setPosts(postsRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto' }}>
      {/* Profile Header */}
      <div style={{ borderBottom: '1px solid #ccc', padding: '20px', display: 'flex', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
            <h2>{user.username}</h2>
            <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
                <span><strong>{posts.length}</strong> posts</span>
                <span><strong>{user.followers.length}</strong> followers</span>
                <span><strong>{user.following.length}</strong> following</span>
            </div>
        </div>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '20px' }}>
        {posts.map(post => (
          <img key={post._id} src={post.image} alt="Post" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
        ))}
      </div>
    </div>
  );
}

export default Profile;