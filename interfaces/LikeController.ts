/**
 * @file Controller Interface RESTful Web service API for Likes resource
 */
import { Request, Response } from "express";
/**
 * @interface LikeController An interface for Likes on Tuiter.
 *
 */
export default interface LikeControllerI {
    /**
     * Retrieves all users that liked a tuit from the database
     * @param {Request} req Represents client request: includes the path
     * parameter tid representing the tuit id of liked tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsersThatLikedTuit(req: Request, res: Response): void;
    /**
     * Retrieves all tuits liked by a user from the database
     * @param {Request} req Represents client request: includes the path
     * parameter uid representing the users that liked the tuits
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that were liked
     */
    findAllTuitsLikedByUser(req: Request, res: Response): void;
    /**
     * Increments the likes count on a tuit.
     * @param {Request} req Represents client request: includes the
     * path parameters uid and tid representing the user that is liking the tuit
     * and the tuit being liked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new likes that was inserted in the
     * database
     */
    userLikesTuit(req: Request, res: Response): void;
    /**
     * Decrements the likes count on a tuit
     * @param {Request} req Represents client request: includes the
     * path parameters uid and tid representing the user that is liking the tuit
     * and the tuit being liked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new likes that was inserted in the
     * database
     */
    userUnlikesTuit(req: Request, res: Response): void;
    /**
    * Get the count of likes on  a tuit.
    * @param {Request} req Represents client request: includes the
    * path parameters uid and tid representing the user that is liking the tuit
    * and the tuit being liked
    * @param {Response} res Represents response to client, includes the total count.
    */
    findTuitLikesCount(req: Request, res: Response): void;

    findUserLikesTuit(req: Request, res: Response): void;

    userTogglesTuitLikes (req: Request, res: Response): void;
};