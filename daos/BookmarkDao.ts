/**
 * @file Implements DAO managing data storage of bookmarks. Uses mongoose BookmarkDao
 * to integrate to intergrate with MongoDB.
 */
import Bookmark from "../models/Bookmark";
import BookmarkModel from "../mongoose/BookmarkModel";
import BookmarkDaoI from "../interfaces/BookmarkDao";
import User from "../models/User";
import Tuit from "../models/Tuit"

/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of Bookmarks
 * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
 */
export default class BookmarkDao implements BookmarkDaoI {
  /**
   * Inserts bookmarks instance into the database
   * @param {string} uid User id who bookmarks a tuit and the instance is added to the database.
   * @param {string} tid Tuit which is bookmarked by User.
   * @returns Promise To be notified when bookmark is inserted into the database
   */
    userBookmarksTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.create({bookmarkedBy: uid, bookmarkedTuit: tid});
    /**
     * Deletes bookmark instance from the database
     * @param {string} uid User's primary key
     * @param {string} tid Tuits primary key
     * @returns Promise To be acknowledge when bookmarks is deleted.
     */
    userRemovesBookmarkTuit = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({bookmarkedBy: uid, bookmarkedTuit: tid});
    /**
     * Uses BookmarkModel to retrieve all bookmarked tuits
     * @param {string} tid Tuits's primary key
     * @returns Promise To be notified when the bookmarks are retrieved from
     * database
     */
    findAllUsersThatBookmarkedTuit = async (tid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({bookmarkedTuit: tid})
            .populate("bookmarkedBy")
            .exec();
    /**
     * Uses BookmarkModel to retrieve all bookmarked users
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the bookmarks are retrieved from
     * database
     */
    findAllTuitsBookmarkedByUser = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel
            .find({bookmarkedBy: uid})
            .populate("bookmarkedTuit")
            .exec();
      /**
       * Creates singleton DAO instance
       * @returns BookmarkDao
       */
    private static bookmarkDao: BookmarkDao | null = null;
    public static getInstance = (): BookmarkDao => {
        if(BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }

}
