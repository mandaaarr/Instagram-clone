import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const [image, setImage] = useState('');
  const [caption, setCaption] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    try {
      await axios.post('http://localhost:5000/api/posts', 
        { image, caption },
        { headers: { 'x-auth-token': token } }
      );
      navigate('/'); // Redirect to Home after posting
    } catch (err) {
      alert("Error creating post");
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc' }}>
      <h3>Create New Post</h3>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Image URL (e.g. https://via.placeholder.com/150)" 
          value={image} 
          onChange={e => setImage(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <textarea 
          placeholder="Caption..." 
          value={caption} 
          onChange={e => setCaption(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <button type="submit" style={{ width: '100%', padding: '10px' }}>Share Post</button>
      </form>
    </div>
  );
}

export default CreatePost;