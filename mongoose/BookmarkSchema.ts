/**
 * @file Implements schema for bookmarks collection
 */
import mongoose, { Schema } from "mongoose";
import Bookmark from '../models/Bookmark';
/**
 * @typedef BookmarkSchema is the Bookmark Schema in mongoose
 * @property {User} bookmarkedBy user who bookmarks a tuit
 * @property {Tuit} bookmarkedTuit tuit being bookmarked
 */
const BookmarkSchema = new mongoose.Schema<Bookmark>({
  bookmarkedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
  bookmarkedTuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
}, {collection: 'bookmarks'});
export default BookmarkSchema;
