const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    name: {
        type: String,
        required: true,
        },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;