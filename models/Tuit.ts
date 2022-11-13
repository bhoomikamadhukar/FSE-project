/**
 * @file Creates a tuit model which represents
 * the Tuit datatype.
 */
import User from "./User";

/**
 * @typedef Tuit Represents Tuits of Tuiter
 * @property {ObjectId} _id Unique identifier of User collection
 * @property {string} tuit contents of Tuit
 * @property {Date} postedOn date tuit was posted
 * @property {User} postedBy user who posted tuit
 */
export default class Tuit {
  private id: string = '';
   private tuit: string = '';
   private postedOn: Date = new Date();
   private postedBy: User | null = null;

}
