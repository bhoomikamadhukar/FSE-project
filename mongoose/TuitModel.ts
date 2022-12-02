/**
 * @file Implements the model that
 * uses tuits schema in the tuits collection
 */
import mongoose from "mongoose";
import TuitSchema from "./TuitSchema";
/**
 * @typedef TuitModel is implementation of the Tuit model in mongoose
 */
const TuitModel = mongoose.model('TuitModel', TuitSchema);
export default TuitModel;
