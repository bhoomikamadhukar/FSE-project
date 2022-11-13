/**
 * @file Implements model for Likes.
 */


import User from "./User";
import Tuit from "./Tuit";

/**
* @typedef Like represents interacting of user and tuits
* @property {User} likedBy user who likes the Tuits
* @property {Tuit} tuit tuit that user likes
*/
export default interface Like {
    tuit: Tuit,
    likedBy: User
};
