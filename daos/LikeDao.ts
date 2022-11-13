/**
 * @file Implements DAO managing data storage of likes. Uses mongoose LikeModel
 * to integrate to intergrate with MongoDB.
 */
import Like from "../models/Like";
import LikeModel from "../mongoose/LikeModel";
import LikeDaoI from "../interfaces/LikeDao";
import User from "../models/User";
import Tuit from "../models/Tuit";

/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of Likes
 * @property {LikeDao} likeDao Private single instance of LikeDao
 */
export default class LikeDao implements LikeDaoI {
  /**
   * Inserts likes instance into the database
   * @param {string} uid User who likes a user tuit instance is added to the database.
   * @param {string} tid Tuit which is liked by User.
   * @returns Promise To be notified when likes is inserted into the database
   */
    userLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.create({tuit: tid, likedBy: uid});
  /**
   * Deletes likes instance from the database
   * @param {string} uid User's primary key
   * @param {string} tid Tuits primary key
   * @returns Promise To be acknowledge when like is deleted.
   */
    userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.deleteOne({tuit: tid, likedBy: uid});
    /**
     * Uses LikeModel to retrieve all likes to a
     * particular tuit.
     * @param {string} tid Tuits's primary key
     * @returns Promise To be notified when the likes are retrieved from
     * database
     */
    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel
            .find({tuit: tid})
            .populate("likedBy")
            .exec();
    /**
     * Uses LikeModel to retrieve all tuits liked by a particular
     * user
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the messages are retrieved from
     * database
     */
    findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
        LikeModel
            .find({likedBy: uid})
            .populate("tuit")
            .exec();
    /**
     * Creates singleton DAO instance
     * @returns LikesDao
     */
    private static likeDao: LikeDao | null = null;
    public static getInstance = (): LikeDao => {
        if(LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }

}
