/**
 * @file Declares API for Tuits related data access object methods
 */

import Stats from "../models/Stats";
import Tuit from "../models/Tuit";
/**
 * @interface TuitDao An interface for Tuits Data access objects - tuits of Tuiter.
 *
 */
export default interface TuitDaoI {
    /**
   * Uses TuitModel to retrieve all tuits from tuits collection.
   * @returns Promise to be notified when the tuits are retrieved from
   * database
   */
    findAllTuits(): Promise<Tuit[]>;
    /**
   * Retrievew tuits of a particular user from tuits collection.
   * @param {string} uid User's primary key
   * @returns Promise To be notified when tuits are retrieved from the database
   */
    findAllTuitsByUser(uid: string): Promise<Tuit[]>;
    /**
  * Retrieves single tuit from users collection.
  * @param {string} tid Tuit's primary key
  * @returns Promise To be notified when tuit is retrieved from the database
  */
    findTuitById(tid: string): Promise<Tuit>;
    /**
   * Inserts tuit instance into the database
   * @param {Tuit} tuit Instance to be inserted into the database
   * @returns Promise To be notified when tuit is added into the database
   */
    createTuitByUser(uid: string, tuit: Tuit): Promise<Tuit>;
    /**
   * Updates tuit with new values in database
   * @param {string} tid Primary key of tuit to be modified
   * @param {Tuit} tuit Tuit object containing edited tuit.
   * @returns Promise To be notified when tuit is updated in the database
   */
    updateTuit(tid: string, tuit: Tuit): Promise<any>;
    /**
   * Removes tuit from the database.
   * @param {string} tid Primary key of tuit to be removed
   * @returns Promise To be notified when tuit is removed from the database
   */
    deleteTuit(tid: string): Promise<any>;

     /**
   * Removes tuit from the database.
   * @param {string} tid Primary key of tuit to be removed
   * @returns Promise To be notified when tuit is removed from the database
   */
      deleteTuit(tid: string): Promise<any>;

     /**
   * Removes tuit from the database.
   * @param {string} tuit Message tuit to be used as an identifier to delete a tuit
   * @returns Promise To be notified when tuit is removed from the database
   */
      deleteTuitsByTuit(tuit: string): Promise<any>;
      updateDislikes(tid:string, newStats:Stats):Promise<any>;
      updateLikes(tid:string, newStats:Stats):Promise<any>;
     
};