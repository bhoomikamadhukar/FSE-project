/**
 * @file Controller RESTful Web service API for users resource
 */
import AdminDao from "../daos/UserDao";
import User from "../models/User";
import {Express, Request, Response} from "express";
import AdminControllerI from "../interfaces/AdminController";

/**
  * @class AdminController Implements RESTful Web service API for tuits resource.
  * Defines the following HTTP endpoints:
  * <ul>
  *     <li>POST /api/users to create a new users</li>
  *     <li>GET /api/users/:uid to retrieve all the users by id </li>
  *     <li>GET /api/users to retrieve all users instances</li>
  *     <li>PUT /api/users/:uid to modify an individual user instance </li>
  *     <li>DELETE /api/users/:uid to remove a particular user instance</li>
  * </ul>
  * @property {AdminDao} adminDao Singleton DAO implementing user CRUD operations
  * @property {AdminController} adminController Singleton controller implementing
  * RESTful Web service API
  */
export default class AdminController implements AdminControllerI {
    private static adminDao: AdminDao = AdminDao.getInstance();
    private static adminController: AdminController | null = null;
    /**
      * Creates singleton controller instance
      * @param {Express} app Express instance to declare the RESTful Web service
      * API
      * @return AdminController
      */
    public static getInstance = (app: Express): AdminController => {
        if(AdminController.adminController === null) {
            AdminController.adminController = new AdminController();
            app.get("/api/admin", AdminController.adminController.findAllUsers);
            app.get("/api/admin/:uid", AdminController.adminController.findUserById);
            app.get("/api/admin/:username", AdminController.adminController.findUserByUsername);
            app.post("/api/admin", AdminController.adminController.createUser);
            app.put("/api/admin/:uid", AdminController.adminController.updateUser);
            app.delete("/api/admin/:uid", AdminController.adminController.deleteUser);
            app.get("/api/admin/username/:username/delete",
                AdminController.adminController.deleteUsersByUsername);
        }
        return AdminController.adminController;
    }

    private constructor() {}

    /**
      * Retrieves all admin from the database and returns an array of admin.
      * @param {Request} req Represents request from client
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the users objects
      */

    findAllUsers = (req: Request, res: Response) =>
        AdminController.adminDao.findAllUsers()
            .then((users: User[]) => res.json(users));
     /**
      * Retrieves user object from the database for a particular user id and returns
      * a user object.
      * @param {Request} req Represents request from client
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the user objects
      */
    findUserById = (req: Request, res: Response) =>
        AdminController.adminDao.findUserById(req.params.uid)
            .then((user: User) => res.json(user));
    
    /**
      * Retrieves user object from the database for a particular username and returns
      * a user object.
      * @param {Request} req Represents request from client
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON arrays containing the user objects
      */
     findUserByUsername = (req: Request, res: Response) =>
     AdminController.adminDao.findUserByUsername(req.params.username)
         .then((user: User) => res.json(user));
    /**
      * @param {Request} req Represents request from client
      * @param {Response} res Represents response to client, including the
      * body formatted as JSON containing the user object
      */
    createUser = (req: Request, res: Response) =>
        AdminController.adminDao.createUser(req.body)
            .then((user: User) => res.json(user));
    /**
      * @param {Request} req Represents request from client, including path
      * parameter tid identifying the primary key of the user to be modified
      * @param {Response} res Represents response to client, including status
      * on whether updating a user was successful or not
      */
    updateUser = (req: Request, res: Response) =>
        AdminController.adminDao.updateUser(req.params.uid, req.body)
            .then((status) => res.send(status));
    deleteUser = (req: Request, res: Response) =>
        AdminController.adminDao.deleteUser(req.params.uid)
            .then((status) => res.send(status));

        /**
   * Removes all user instances with specific username from the database. Useful for testing
   * @param {Request} req Represents request from client
   * @param {Response} res Represents response to client, including status
   * on whether deleting users was successful or not
   */
     deleteUsersByUsername = (req: Request, res: Response) =>
     AdminController.adminDao.deleteUsersByUsername(req.params.username)
         .then((status) => res.send(status));
};
