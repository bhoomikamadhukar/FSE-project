/**
 * @file Implements the model that
 * uses follows schema in the follows collection
 */
import mongoose from "mongoose";
import FollowSchema from "./FollowSchema";
/**
 * @typedef FollowModel is the implementation of Follow model in mongoose
 */
const FollowModel = mongoose.model('FollowSchema', FollowSchema);
export default FollowModel;
