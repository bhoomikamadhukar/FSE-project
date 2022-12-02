/**
 * @file Creates a model to represent Bookmarks
 */
import User from "./User";
import Tuit from "./Tuit"

/**
* @typedef Bookmarks represents interaction of user and tuits
* @property {User} bookmarkedBy user who bookmarks the Tuits
* @property {Tuit} bookmarkedTuit tuit that user bookmarks
*/
export default interface Bookmark {
    bookmarkedBy: User,
    bookmarkedTuit: Tuit
};
