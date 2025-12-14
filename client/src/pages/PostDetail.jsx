import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');

  const fetchPost = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
      setPost(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchPost(); }, [id]);

  const handleComment = async () => {
    const token = localStorage.getItem('token');
    await axios.post(`http://localhost:5000/api/posts/${id}/comment`, 
      { text: comment }, { headers: { 'x-auth-token': token } }
    );
    setComment('');
    fetchPost(); // Refresh to show new comment
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', border: '1px solid #ccc', padding: '20px' }}>
      <h3>{post.user.username}'s Post</h3>
      <img src={post.image} alt="Detail" style={{ width: '100%' }} />
      <p>{post.caption}</p>
      
      <div style={{ marginTop: '20px', background: '#f9f9f9', padding: '10px' }}>
        <h4>Comments</h4>
        {post.comments.map((c, i) => (
          <div key={i} style={{ borderBottom: '1px solid #ddd', padding: '5px 0' }}>
            <strong>{c.user ? c.user.username : 'User'}: </strong> {c.text}
          </div>
        ))}
        
        <div style={{ marginTop: '10px', display: 'flex' }}>
            <input 
                value={comment} 
                onChange={e => setComment(e.target.value)}
                placeholder="Write a comment..."
                style={{ flex: 1, padding: '10px' }}
            />
            <button onClick={handleComment}>Post</button>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;