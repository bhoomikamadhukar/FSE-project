/**
* @file Implements DAO managing data storage of likes. Uses mongoose LikeModel
* to integrate with MongoDB
*/
import Like from "../models/Like";
import LikeModel from "../mongoose/LikeModel";
import LikeDaoI from "../interfaces/LikeDao";

/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of Like
 * @property {UserDao} userDao Private single instance of LikeDao
 */

export default class LikeDao implements LikeDaoI {

    /**
  * Uses LikeModel to create a new like for tuit.
  * @param {string} uid User id of user who likes the tuit
  * @param {string} tid Tuit id of tuit to be liked
  * @returns Promise To be notified when the likes are retrieved from
  * database
  */

    userLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.create({ tuit: tid, likedBy: uid });

    /**
 * Uses LikeModel to remove a  like for tuit.
 * @param {string} uid User id of user who unlikes the tuit
 * @param {string} tid Tuit id of tuit to be unliked
 * @returns Promise To be notified when the likes are deleted from
 * database
 */

    /**
 * Uses LikeModel to count number of likes a tuit has.
 * @param {string} tid Tuit id of tuit to be unliked
 * @returns Promise To be notified with the total likes on specific tuit.
 */
    findTuitLikesCount = async (tid: string): Promise<any> =>
        LikeModel.countDocuments({ tuit: tid });

    /**
   * Uses LikeModel to remove a  like for tuit.
   * @param {string} uid User id of user who unlikes the tuit
   * @param {string} tid Tuit id of tuit to be unliked
   * @returns Promise To be notified when the likes are deleted from
   * database
   */
    userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.deleteOne({ tuit: tid, likedBy: uid });

    /**
      * Uses LikeModel to retrieve all user documents from likes collection
      * @returns Promise To be notified when the users are retrieved from
      * database
      */

    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel
            .find({ tuit: tid })
            .populate("likedBy")
            .exec();

    /**
      * Uses LikeModel to retrieve all like documents from likes collection
      * @returns Promise To be notified when the likes are retrieved from
      * database
      */
     findAllTuitsLikedByUser = async (uid:string):Promise<Like[]> =>
     LikeModel
       .find({likedBy: uid})
       .populate({
        path: "tuit",
        populate: {
          path: "postedBy"
        }
      }).exec();
       

    findUserLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel
            .find({ likedBy: uid, tuit: tid });

    private static likeDao: LikeDao | null = null;
    /**
     * Creates a singleton DAO instance
     * @returns likeDao
     */

    public static getInstance = (): LikeDao => {
        if (LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    }



}