/**
 * @file Controller RESTful Web service API for authentication resource
 */
 import {Request, Response, Express} from "express";
 import UserDao from "../daos/UserDao";
 const bcrypt = require('bcrypt-nodejs');
 const saltRounds = bcrypt.genSaltSync(10);
 
 const AuthenticationController = (app: Express) => {
 
   const userDao: UserDao = UserDao.getInstance()
 
 
 
   const signup = async (req: Request, res: Response) => {
     const newUser = req.body;
     const password = newUser.password;
     const hash = await bcrypt.hashSync(password, saltRounds);
     newUser.password = hash;
     const existingUser = await userDao.findUserByUsername(req.body.username);
     if (existingUser) {
       res.sendStatus(403);
       console.log("existing user")
       return;
     } else {
       const insertedUser = await userDao.createUser(newUser);
       console.log("creating a new user")
       //@ts-ignore
       req.session['profile'] = insertedUser;
       res.json(insertedUser);
     }
   }
 
   const profile = (req: Request, res: Response) => {
     //@ts-ignore
     const profile = req.session['profile'];
     if (profile) {
       res.json(profile);
     } else {
       res.sendStatus(403);
     }
   }
 
   const logout = (req: Request, res: Response) => {
     //@ts-ignore
     req.session.destroy();
     res.sendStatus(200);
   }
 
   const login = async (req: Request, res: Response) => {
     const user = req.body;
     const username = user.username;
     const password = user.password;
     const existingUser = await userDao
     .findUserByUsername(username);
     if (!existingUser) {
       res.sendStatus(403);
       return;
     }
     const match = await bcrypt
     .compareSync(password, existingUser.password);
     if (match) {
       //@ts-ignore
       req.session['profile'] = existingUser;
       res.json(existingUser);
     } else {
       res.sendStatus(403);
       console.log("Passwords do not match");
     }
   };
 /**
  * @class AuthController Implements RESTful Web service API for authentication resource.
  * Defines the following HTTP endpoints:
  * <ul>
  *     <li>POST /auth/login to login to the app</li>
  *     <li>POST /auth/profile to retrieve the profile of the user</li>
  *     <li>POST /auth/logout to logout of the app</li>
  *     <li>POST /auth/signup to signup a user for the app</li>
  * </ul>
  * @property {BookmarkDao} BookmarkDao Singleton DAO implementing bookmark CRUD operations
  * @property {BookmarkController} BookmarkController Singleton controller implementing
  * RESTful Web service API
  */
   app.post("/auth/login", login);
   app.post("/auth/profile", profile);
   app.post("/auth/logout", logout);
   app.post("/auth/signup", signup);
 }
 
 export default AuthenticationController;