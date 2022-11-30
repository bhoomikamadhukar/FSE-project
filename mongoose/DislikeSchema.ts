/**
 * @file imports mongoose schema for Like.
 */
 import mongoose, { Schema } from "mongoose";
 import Dislike from '../models/Dislike';
 /**
   * @typedef DislikeSchema is how likes are represented.
   * @property {dislikedBy} userid: primary key of user who liked tuit.
   * @property {tuit} tid: primary key of tuit liked.
 */
 const DislikeSchema = new mongoose.Schema<Dislike>({
     tuit: { type: Schema.Types.ObjectId, ref: "TuitModel" },
     dislikedBy: { type: Schema.Types.ObjectId, ref: "UserModel" },
 }, { collection: 'dislikes' });
 export default DislikeSchema;
