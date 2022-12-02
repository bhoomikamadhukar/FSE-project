/**
 * @file Controller RESTful Web service API for follows resource
 */
import {Express, Request, Response} from "express";
import FollowDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/FollowController";

/**
 * @class FollowController Implements RESTful Web service API for follows resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid1/follows/:uid2 user follows other user and create a new follow instance
 *     </li>
 *     <li>GET /api/users/:uid/followedBy to retrieve all users that is followed by a user
 *     </li>
 *     <li>GET /api/users/:uid/following to retrieve all users that are following other users
 *     </li>
 *     <li>DELETE /api/users/:uid1/unfollows/:uid2 to record that a user
 *     no longer follows a user</li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing likes CRUD operations
 * @property {FollowController} FollowController Singleton controller implementing
 * RESTful Web service API
 */
export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static FollowController: FollowController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return FollowController
     */
    public static getInstance = (app: Express): FollowController => {
        if(FollowController.FollowController === null) {
            FollowController.FollowController = new FollowController();
            app.post("/api/users/:uid1/follows/:uid2", FollowController.FollowController.userFollowsUser);
            app.get("/api/users/:uid/followedBy", FollowController.FollowController.findAllFollowers);
            app.get("/api/users/:uid/following", FollowController.FollowController.findAllFollowing);
            app.delete("/api/users/:uid1/unfollows/:uid2", FollowController.FollowController.userUnFollowsUser);
        }
        return FollowController.FollowController;
    }

    private constructor() {}

    /**
     * Retrieves all users that follows another user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the liked tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllFollowing = (req: Request, res: Response) =>
        FollowController.followDao.findAllFollowing(req.params.uid)
            .then(follows => res.json(follows));

    /**
     * Retrieves all users followed by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user liked the tuits
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects that were followed by users
     */
    findAllFollowers = (req: Request, res: Response) =>
        FollowController.followDao.findAllFollowers(req.params.uid)
            .then(follows => res.json(follows));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid1 and uid2 representing the user that is following the user
     * and the user is being followed
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new follows that was inserted in the
     * database
     */
    userFollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsUser(req.params.uid1, req.params.uid2)
            .then(follows => res.json(follows));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid1 and uid2 representing the user that is unfollowing
     * the user and the user being unfollowed
     * @param {Response} res Represents response to client, including status
     * on whether deleting the follow was successful or not
     */
    userUnFollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnFollowsUser(req.params.uid1, req.params.uid2)
            .then(status => res.send(status));
};
