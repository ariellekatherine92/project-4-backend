const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
   
    },
    body: {
        type: String,
        required: true
    }
})

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;