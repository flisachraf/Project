const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');

// Create a new post
router.post('/posts', postController.createPost);

// Get all posts
router.get('/posts', postController.getAllPosts);

// Get a single post by ID
router.get('/posts/:id', postController.getPostById);

// Update a post by ID
router.put('/posts/:id', postController.updatePost);

// Delete a post by ID
router.delete('/posts/:id', postController.deletePost);

module.exports = router;
