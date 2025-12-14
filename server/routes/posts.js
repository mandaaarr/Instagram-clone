const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');
const auth = require('../middleware/auth'); // Protects routes

// CREATE POST [cite: 146]
router.post('/', auth, async (req, res) => {
  const newPost = new Post({
    user: req.user.id,
    image: req.body.image, // URL string
    caption: req.body.caption
  });

  try {
    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET FEED [cite: 159]
// Shows posts from users you follow
router.get('/feed', auth, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);
    
    // Find posts where the author is in the 'following' list
    const feedPosts = await Post.find({
      user: { $in: currentUser.following }
    })
    .populate('user', 'username') // Add author details
    .sort({ createdAt: -1 }); // Newest first

    res.json(feedPosts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LIKE / UNLIKE POST [cite: 152]
router.put('/:id/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    // Check if already liked
    if (!post.likes.includes(req.user.id)) {
      await post.updateOne({ $push: { likes: req.user.id } });
      res.json("Post liked");
    } else {
      await post.updateOne({ $pull: { likes: req.user.id } });
      res.json("Post unliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET SINGLE POST
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('user', 'username')
      .populate('comments.user', 'username');
    res.json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;