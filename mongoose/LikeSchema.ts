/**
 * @file Implements schema for likes collection
 */
import mongoose, { Schema } from "mongoose";
import Like from '../models/Like';
/**
 * @typedef LikeSchema is the Likes Schema in mongoose
 * @property {Tuit} tuit tuit being liked
 * @property {User} likedBy user who likes the tuits
 */
const LikeSchema = new mongoose.Schema<Like>({
  tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
  likedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: 'likes'});
export default LikeSchema;
