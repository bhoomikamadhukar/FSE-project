/**
 * @file Implements model that
 * uses schema for User collection.
 */
import mongoose from "mongoose";
import UserSchema from "./UserSchema";
/**
 * @typedef UserModel is the implementation of User model in mongoose
 */
const UserModel = mongoose.model('UserModel', UserSchema);
export default UserModel;
