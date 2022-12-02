/**
 * @file declares Like datatype.
 */
import User from "./User";
import Tuit from "./Tuit";

/**
  * @typedef Like represents tuit that is liked
  * by a user.
  */

export default interface Like {
    tuit: Tuit,
    likedBy: User
};