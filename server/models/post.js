import mongoose from "mongoose";
import {userModel} from "./user.js";

const postSchema = new mongoose.Schema({
  postId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  datetime: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  visibility: {
    type: String, enum: ['public', 'private', 'consultant'],
    default: 'public'
  },
  userId: { type: String, required: true },
  anonymousName: { type: String },
  sentiment: {
    type: String,
    enum: ['positive', 'negative'],
    required: true 
  }
});

const commentSchema = new mongoose.Schema({ 
  postId: { type: String, required: true, unique: true },
  comments: {
    type: [{
      text: { type: String, required: true }, 
      datetime: { type: Date, default: Date.now }, 
      userId: { type: String, required: true }, 
    }],
    default: []
  }
});

const PostModel = mongoose.model('Post', postSchema);
const CommentModel = mongoose.model('Comment', commentSchema);

export {PostModel, CommentModel};