/**
 * @file Implements schema for follows collection
 */
import mongoose, { Schema } from "mongoose";
import Follow from '../models/Follow';
/**
 * @typedef FollowSchema is the Follow Schema in mongoose
 * @property {User} followedBy user who is being follows by User
 * @property {User} currUser current user who follows others
 */
const FollowSchema = new mongoose.Schema<Follow>({
  followedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
  currUser: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: 'follows'});
export default FollowSchema;
