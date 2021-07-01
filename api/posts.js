// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const passport = require('passport');


// Models
const { Post } = require('../models');

// Controllers
const index = async (req, res) => {
    console.log('inside of /api/posts');
    try {
        const allPosts = await Post.find({});

        res.json({ posts: allPosts });
    } catch (error) {
        console.log('Error inside of /api/posts');
        console.log(error);
        return res.status(400).json({ message: 'Posts not found. Please try again.' });
    }
}

const show = async (req, res) => {
    const { id } = req.params;
    try {
        // look for book based on id
        const post = await Post.findById(id);
        res.json({ post });
    } catch (error) {
        console.log('Error inside of /api/posts/:id');
        console.log(error);
        return res.status(400).json({ message: 'Post not found. Try again...' });
    }
}

const create = async (req, res) => {
    const { title, body } = req.body;

    try {
        const newPost = await Post.create({ title, body });
        console.log('new post created', newPost);
        res.json({ post: newPost });
    } catch (error) {
       console.log('Error inside of POST of /api/posts');
       console.log(error);
       return res.status(400).json({ message: 'Post was not created. Please try again...' }); 
    }
}

const update = async (req, res) => {
    console.log(req.body);
    try {

        const updatedPost = await Post.update({ title: req.body.title }, req.body); // updating the book
        const post = await Post.findOne({ title: req.body.title });

        console.log(updatedPost); // { n: 1, nModified: 0, ok: 1 }
        console.log(post); // a book object 

        res.redirect(`/api/posts/${post.id}`);

    } catch (error) {
        console.log('Error inside of UPDATE route');
        console.log(error);
        return res.status(400).json({ message: 'Post could not be updated. Please try again...' });
    }
}

const deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        console.log(id);
        const result = await Post.findByIdAndRemove(id);
        console.log(result);
        res.redirect('/api/posts');
    } catch (error) {
        console.log('inside of DELETE route');
        console.log(error);
        return res.status(400).json({ message: 'Post was not deleted. Please try again...' });
    }
}

// GET api/books/test (Public)
router.get('/test', (req, res) => {
    res.json({ msg: 'Posts endpoint OK!'});
});

// GET -> /api/books/
router.get('/', index); 
// GET -> /api/books/:id
router.get('/:id', show);
// POST -> /api/books
router.post('/', create);
// PUT -> /api/books
router.put('/', update);
// DELETE => /api/books/:id
router.delete('/:id', deletePost);

module.exports = router;