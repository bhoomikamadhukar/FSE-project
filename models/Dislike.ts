/**
 * @file declares Like datatype.
 */
 import User from "./User";
 import Tuit from "./Tuit";
 
 /**
   * @typedef Dislike represents tuit that is disliked
   * by a user.
   */
 
 export default interface Dislike {
     tuit: Tuit,
     dislikedBy: User
 };