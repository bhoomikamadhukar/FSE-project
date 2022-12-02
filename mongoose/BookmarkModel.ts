/**
 * @file Implements the model that
 * uses bookmarks schema in the bookmarks collection
 */
import mongoose from "mongoose";
import BookmarkSchema from "./BookmarkSchema";

/**
 * @typedef BookmarkModel is the implementation of Bookmark model in mongoose
 */
const BookmarkModel = mongoose.model('BookmarkSchema', BookmarkSchema);
export default BookmarkModel;
