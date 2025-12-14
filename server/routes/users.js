const router = require('express').Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// 1. FOLLOW USER
router.put('/:id/follow', auth, async (req, res) => {
  if (req.user.id !== req.params.id) {
    try {
      const targetUser = await User.findById(req.params.id); // The user to be followed
      const currentUser = await User.findById(req.user.id);  // The logged-in user

      // Only follow if not already following
      if (!targetUser.followers.includes(req.user.id)) {
        await targetUser.updateOne({ $push: { followers: req.user.id } });
        await currentUser.updateOne({ $push: { following: req.params.id } });
        res.status(200).json("User has been followed");
      } else {
        res.status(403).json("You already follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You cannot follow yourself");
  }
});

// 2. UNFOLLOW USER [cite: 143]
router.put('/:id/unfollow', auth, async (req, res) => {
    if (req.user.id !== req.params.id) {
      try {
        const targetUser = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user.id);
  
        // Only unfollow if currently following
        if (targetUser.followers.includes(req.user.id)) {
          await targetUser.updateOne({ $pull: { followers: req.user.id } });
          await currentUser.updateOne({ $pull: { following: req.params.id } });
          res.status(200).json("User has been unfollowed");
        } else {
          res.status(403).json("You don't follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You cannot unfollow yourself");
    }
  });

  // GET USER BY USERNAME (Search)
router.get('/search/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select("-password");
    if (!user) return res.status(404).json("User not found");
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USER BY ID (For Profile Stats)
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;