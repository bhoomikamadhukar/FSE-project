/**
 * @file Implements the model that
 * uses likes schema in the likes collection
 */
import mongoose from "mongoose";
import LikeSchema from "./LikeSchema";
/**
 * @typedef LikeModel is the implementation of Like model in mongoose
 */
const LikeModel = mongoose.model('LikeSchema', LikeSchema);
export default LikeModel;
