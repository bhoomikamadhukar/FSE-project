/**
 * @file Creates a model to represent Follows.
 */
import User from "./User";

/**
* @typedef Follow represents interaction of users
* @property {User} followedBy user who is followedBy other Users
* @property {User} currUser current user following other users.
*/
export default interface Follow {
    followedBy: User,
    currUser: User
};
