import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // <--- 1. ADDED THIS IMPORT

function Home() {
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState({});

  const fetchFeed = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:5000/api/posts/feed', {
        headers: { 'x-auth-token': token }
      });
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  const handleLike = async (postId) => {
    const token = localStorage.getItem('token');
    await axios.put(`http://localhost:5000/api/posts/${postId}/like`, {}, {
      headers: { 'x-auth-token': token }
    });
    fetchFeed();
  };

  const handleComment = async (postId) => {
    const token = localStorage.getItem('token');
    const text = commentText[postId];
    if (!text) return;

    try {
      await axios.post(`http://localhost:5000/api/posts/${postId}/comment`, 
        { text }, 
        { headers: { 'x-auth-token': token } }
      );
      setCommentText({ ...commentText, [postId]: '' });
      fetchFeed();
    } catch (err) {
      alert("Error adding comment");
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto' }}>
      <h2>Home Feed</h2>
      {posts.length === 0 ? <p>No posts yet. Go to Search to follow someone!</p> : null}

      {posts.map((post) => (
        <div key={post._id} className="post-card">
          
          <div style={{ padding: '10px', fontWeight: 'bold', borderBottom: '1px solid #eee' }}>
            {post.user.username}
          </div>
          
          {/* 2. WRAPPED IMAGE IN LINK HERE */}
          <Link to={`/posts/${post._id}`}>
            <img src={post.image} alt="Post" style={{ width: '100%', display: 'block' }} />
          </Link>
          
          <div style={{ padding: '10px' }}>
            <button onClick={() => handleLike(post._id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>
              {post.likes.includes(localStorage.getItem('userId')) ? "❤️" : "🤍"}
            </button>
            <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>{post.likes.length} likes</span>
            
            <p style={{ marginTop: '5px' }}>
              <strong>{post.user.username}</strong> {post.caption}
            </p>

            <div style={{ marginTop: '10px', borderTop: '1px solid #eee', paddingTop: '10px' }}>
              {post.comments.map((c, index) => (
                <div key={index} style={{ fontSize: '0.9rem', marginBottom: '4px' }}>
                  <strong>{c.user ? c.user.username : "User"}</strong>: {c.text}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', marginTop: '10px' }}>
              <input 
                type="text" 
                placeholder="Add a comment..." 
                value={commentText[post._id] || ''}
                onChange={(e) => setCommentText({ ...commentText, [post._id]: e.target.value })}
                style={{ flex: 1, padding: '5px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
              <button onClick={() => handleComment(post._id)} style={{ marginLeft: '5px', color: '#0095f6', background: 'none', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
                Post
              </button>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;