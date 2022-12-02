

/**
 * @file Controller Interface RESTful Web service API for tuits resource
 */
import {Request, Response} from "express";
import Tuit from "../models/tuit";
/**
 * @interface LikeControllerI An interface for tuits on Tuiter.
 *
 */
export default interface TuitControllerI {
    /**
   * Retrieves all tuits from the database and returns an array of tuits.
   * @param {Request} req Represents request from client
   * @param {Response} res Represents client response: body formatted as JSON array 
   * contains the tuit objects.
   */
    findAllTuits (req: Request, res: Response): void;
     /**
     * Retrieves tuit from the database based on the user id match.
     * @param {Request} req Represents client request: includes path
     * parameter uid - user's primary key for tuit retrival. 
     * @param {Response} res Represents response to client: includes the
     * body formatted as JSON array containing tuit objects.
     */
    findAllTuitsByUser (req: Request, res: Response): void;
     /**
     * Retrieves tuit from the database based on the tuit id match.
     * @param {Request} req Represents client request: includes path
     * parameter tid - tuit's primary key for tuit retrival. 
     * @param {Response} res Represents response to client: includes the
     * body formatted as JSON and the tuit matching the uid.
     */
    findTuitById (req: Request, res: Response): void;
    /**
     * Inserts a new tuit instance in the tuits collection.
     * @param {Request} req Represents request from client, including body
     * containing the JSON object for the new tuit to be inserted in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new tuit that was inserted in the
     * database
     */
    createTuitByUser (req: Request, res: Response): void;
    /**
     * Updates tuit with new values in database.
     * @param {Request} req Represents request from client, including path
     * parameter tid identifying the primary key of the tuit to be modified
     * @param {Response} res Represents response to client, including status
     * on whether updating a tuit was successful or not
     */
    updateTuit (req: Request, res: Response): void;
    /**
    * Removes tuit from the database.
    * @param {Request} req Represents request from client, including path
    * parameter tid identifying the primary key of the tuit to be removed
    * @param {Response} res Represents response to client, including status
    * on whether deleting a user was successful or not
    */
    deleteTuit (req: Request, res: Response): void;

    /**
    * Removes tuit from the database. This is not a RESTful api. 
    * @param {Request} req Represents request from client, including path
    * parameter tuit string identifying the tuit to be removed
    * @param {Response} res Represents response to client, including status
    * on whether deleting a user was successful or not
    */
    deleteTuitsByTuit (req: Request, res: Response): void;
};