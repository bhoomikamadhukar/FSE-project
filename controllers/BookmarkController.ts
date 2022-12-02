/**
 * @file Controller RESTful Web service API for bookmarks resource
 */
import {Express, Request, Response} from "express";
import BookmarkDao from "../daos/BookmarkDao";
import BookmarkControllerI from "../interfaces/BookmarkController";
/**
 * @class BookmarkController Implements RESTful Web service API for follows resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid/bookmarks/:tid user bookmarks a tuit and create a new bookmark instance
 *     </li>
 *     <li>GET /api/users/:tid/bookmarks to retrieve all tuits bookmarked by a user
 *     </li>
 *     <li>GET /api/tuits/:uid/bookmarks to retrieve all users that bookmarked tuits
 *     </li>
 *     <li>DELETE /api/users/:uid/bookmarks/:tid to record that a user
 *     no longer bookmarks a tuit</li>
 * </ul>
 * @property {BookmarkDao} bookmarkDao Singleton DAO implementing likes CRUD operations
 * @property {BookmarkController} bookmarkController Singleton controller implementing
 * RESTful Web service API
 */
export default class BookmarkController implements BookmarkControllerI {
    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
    private static BookmarkController: BookmarkController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return BookmarkController
     */
    public static getInstance = (app: Express): BookmarkController => {
        if(BookmarkController.BookmarkController === null) {
            BookmarkController.BookmarkController = new BookmarkController();
            app.post("/api/users/:uid/bookmarks/:tid", BookmarkController.BookmarkController.userBookmarksTuit);
            app.get("/api/users/:uid/bookmarks", BookmarkController.BookmarkController.findAllTuitsBookmarkedByUser);
            app.get("/api/tuits/:tid/bookmarks", BookmarkController.BookmarkController.findAllUsersThatBookmarkedTuit);
            app.delete("/api/users/:uid/bookmarks/:tid", BookmarkController.BookmarkController.userRemovesBookmarkTuit);
        }
        return BookmarkController.BookmarkController;
    }

    private constructor() {}

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is bookmarking the tuit
     * and the tuit being bookmarked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new bookmark that was inserted in the
     * database
     */
    userBookmarksTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userBookmarksTuit(req.params.uid, req.params.tid)
            .then(bookmarks => res.json(bookmarks));

    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is removing bookmark from
     * the tuit.
     * @param {Response} res Represents response to client, including status
     * on whether deleting the bookmark was successful or not
     */
    userRemovesBookmarkTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.userRemovesBookmarkTuit(req.params.uid, req.params.tid)
            .then(status => res.send(status));

    /**
     * Retrieves all tuits bookmarked by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user liked the tuits
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that were  bookmarked
     */
    findAllTuitsBookmarkedByUser = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findAllTuitsBookmarkedByUser(req.params.uid)
            .then(bookmarks => res.json(bookmarks));

    /**
     * Retrieves all users that bookmarked a tuit from the database
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the liked tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsersThatBookmarkedTuit = (req: Request, res: Response) =>
        BookmarkController.bookmarkDao.findAllUsersThatBookmarkedTuit(req.params.tid)
            .then(bookmarks => res.send(bookmarks));
};
