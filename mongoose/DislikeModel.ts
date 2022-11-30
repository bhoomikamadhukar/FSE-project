/**
 * @file DislikeModel implements the mongoose model to CRUD docs in dislikes collection.
 */
 import mongoose from "mongoose";
 import DislikeSchema from "./DislikeSchema";
 const DislikeModel = mongoose.model('DislikeSchema', DislikeSchema);
 export default DislikeModel;