require('dotenv').config();
const express = require('express');
const router = express.Router();
const passport = require('passport');


// Models
const { Comments } = require('../models');

// Controllers
const index = async (req, res) => {
    console.log('inside of /api/comments');
    try {
        const allComments = await Comments.find({});

        res.json({ comments: allComments });
    } catch (error) {
        console.log('Error inside of /api/posts');
        console.log(error);
        return res.status(400).json({ message: 'Comment not found. Please try again.' });
    }
}

const show = async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await Comments.findById(id);
        res.json({ comment });
    } catch (error) {
        console.log('Error inside of /api/comments/:id');
        console.log(error);
        return res.status(400).json({ message: 'Comment not found. Try again...' });
    }
}

const create = async (req, res) => {
    const { title, body } = req.body;
    const author = req.user.id;
    console.log(author)
    const currentPost = req.body.postId;
    console.log (currentPost);
    try {
        const newComment = await Comments.create({ title, body, author});
        //integrate populate method on new comment
        console.log('new comment created', newComment);
        res.json({ comment: newComment });
    } catch (error) {
       console.log('Error inside of Comment of /api/comments');
       console.log(error);
       return res.status(400).json({ message: 'Comment was not created. Please try again...' }); 
    }
}

const update = async (req, res) => {
    console.log(req.body);
    try {

        const updatedComment = await Comment.update({ title: req.body.title }, req.body); // updating the book
        const comment = await Comment.findOne({ title: req.body.title });

        console.log(updatedComment); 
        console.log(comment); 

        res.redirect(`/api/comments/${comment.id}`);

    } catch (error) {
        console.log('Error inside of UPDATE route');
        console.log(error);
        return res.status(400).json({ message: 'Comment could not be updated. Please try again...' });
    }
}

const deleteComment = async (req, res) => {
    const { id } = req.params;
    try {
        console.log(id);
        const result = await Comment.findByIdAndRemove(id);
        console.log(result);
        res.redirect('/api/commentss');
    } catch (error) {
        console.log('inside of DELETE route');
        console.log(error);
        return res.status(400).json({ message: 'Comment was not deleted. Please try again...' });
    }
}

// GET api/books/test (Public)
router.get('/test', (req, res) => {
    res.json({ msg: 'Comments endpoint OK!'});
});

// GET -> /api/books/
router.get('/', passport.authenticate('jwt', { session: false }), index); 
// GET -> /api/books/:id
router.get('/:id', passport.authenticate('jwt', { session: false }), show);
// POST -> /api/books
router.post('/', passport.authenticate('jwt', { session: false }), create);
// PUT -> /api/books
router.put('/', passport.authenticate('jwt', { session: false }), update);
// DELETE => /api/books/:id
router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteComment);

module.exports = router;