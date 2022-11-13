/**
 * @file Implements an Express Node HTTP server. Declares RESTful Web services
 * enabling CRUD operations on the following resources:
 * <ul>
 *     <li>users</li>
 *     <li>tuits</li>
 *     <li>likes</li>
 *      <li>follow</li>
 *      <li>bookmarks</li>
 * <li>messages</li>
 * </ul>
 *
 * Connects to a remote MongoDB instance hosted on the Atlas cloud database
 * service
 */
import express, { Request, Response } from 'express';
import AdminController from "./controllers/AdminController";
import TuitController from "./controllers/TuitController";
import LikeController from "./controllers/LikeController";
import FollowController from "./controllers/FollowController";
import BookmarkController from "./controllers/BookmarkController";
import MessageController from "./controllers/MessageController";
import mongoose, { get } from "mongoose";


require('dotenv').config()
// build the connection string
const PROTOCOL = "mongodb+srv";
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const HOST = "cluster0.uz88i7e.mongodb.net";
const DB_NAME = "FSE-project";
const DB_QUERY = "retryWrites=true&w=majority";

//const connectionString = PROTOCOL + "://" + DB_USERNAME + ":" + DB_PASSWORD + "@" + HOST + "/" + DB_NAME + "?" + DB_QUERY;
// connect to the database
const connectionString="mongodb+srv://root:root@cluster0.pxaz2ky.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(connectionString);

const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) =>
    res.send('Welcome!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

/**
 * Create instance for all controllers.
 */

// create RESTful Web service API
const adminController = AdminController.getInstance(app);
const tuitController = TuitController.getInstance(app);
const likesController = LikeController.getInstance(app);
const followController = FollowController.getInstance(app);
const bookmarkController = BookmarkController.getInstance(app);
const messageController = MessageController.getInstance(app);

/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on AWS if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
