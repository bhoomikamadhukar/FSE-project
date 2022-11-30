/**
 * @file imports mongoose schema for Tuit.
 */
import mongoose, { Schema } from "mongoose";
import Tuit from "../models/Tuit"
/**
 * @typedef TuitSchema is how tuits are represented.
 * @property {ObjecpostedBytId} userid: primary key of user
 */
const TuitSchema = new mongoose.Schema<Tuit>({
    tuit: { type: String, required: true },
    postedBy: { type: Schema.Types.ObjectId, ref: "UserModel" },
    postedOn: { type: Date, default: Date.now },
    stats: {
        replies: {type: Number, default: 0},
        retuits: {type: Number, default: 0},
        likes: {type: Number, default: 0},
        dislikes :{type: Number, default: 0}
    }
}, { collection: "tuits" });
export default TuitSchema;