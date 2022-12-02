
/**
 * @file Controller Interface RESTful Web service API for users resource
 */
import {Request, Response} from "express";
/**
 * @interface UserController An interface for users on Tuiter.
 *
 */
export default interface UserControllerI {
    /**
   * Fetches all users from database and returns an array of users.
   * @param {Request} req Represents client request.
   * @param {Response} res Represents response to client - includes the
   * body formatted as JSON arrays containing the user objects.
   */
    findAllUsers (req: Request, res: Response): void;
    /**
   * Fetches the user by their primary key.
   * @param {Request} req Represents client request: includes path.
   * parameter uid identifying the primary key of the user to be retrieved
   * @param {Response} res Represents response to client: includes the
   * body formatted as JSON and contains user that matched userid.
   */
    findUserById (req: Request, res: Response): void;
    /**
   * Creates a new user instance
   * @param {Request} req Represents client request: includes body
   * containing JSON object for user to be addded to database.
   * @param {Response} res Represents response to client: the
   * body formatted as JSON and contains the new user that got inserted in
   * database
   */
    createUser (req: Request, res: Response): void;
    /**
   * Modifies an existing user instance.
   * @param {Request} req Represents client request: includes path
   * parameter uid - primary key of the user to be modified.
   * @param {Response} res Represents response to client: includes status
   * on whether update successful or not.
   */
    updateUser (req: Request, res: Response): void;

   /**
   * Removes a user instance from the database
   * @param {Request} req Represents client request: includes path
   * parameter uid - the primary key of the user to be removed.
   * @param {Response} res Represents response to client: includes status
   * on whether deletion successful or not.
   */
    deleteUser (req: Request, res: Response): void;
    /**
   * Removes all user instances from the database
   * @param {Response} res Represents response to client: includes status
   * on whether deletion successful or not.
   */
    deleteAllUsers (req: Request, res: Response): void;

     /**
   * Removes all user instances with specific username from the database. This is not a RESTful api.
   * @param {Response} res Represents response to client: includes status
   * on whether deletion successful or not. 
   */
      deleteUsersByUsername (req: Request, res: Response): void;

      findUserByUsername(req: Request, res: Response):void;
};