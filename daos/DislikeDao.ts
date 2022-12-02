/**
* @file Implements DAO managing data storage of Dislikes. Uses mongoose DislikeModel
* to integrate with MongoDB
*/
import Dislike from "../models/Dislike";
import DislikeModel from "../mongoose/DislikeModel";
import DislikeDaoI from "../interfaces/DislikeDao";

/**
 * @class DislikeDao Implements Data Access Object managing data storage
 * of Dislike
 * @property {UserDao} userDao Private single instance of DislikeDao
 */

export default class DislikeDao implements DislikeDaoI {

    /**
  * Uses DislikeModel to create a new Dislike for tuit.
  * @param {string} uid User id of user who Dislikes the tuit
  * @param {string} tid Tuit id of tuit to be Disliked
  * @returns Promise To be notified when the Dislikes are retrieved from
  * database
  */

    userDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.create({ tuit: tid, dislikedBy: uid });

    /**
 * Uses DislikeModel to remove a  Dislike for tuit.
 * @param {string} uid User id of user who unDislikes the tuit
 * @param {string} tid Tuit id of tuit to be unDisliked
 * @returns Promise To be notified when the Dislikes are deleted from
 * database
 */

    /**
 * Uses DislikeModel to count number of Dislikes a tuit has.
 * @param {string} tid Tuit id of tuit to be unDisliked
 * @returns Promise To be notified with the total Dislikes on specific tuit.
 */
    findTuitDislikesCount = async (tid: string): Promise<any> =>
        DislikeModel.countDocuments({ tuit: tid });

    /**
   * Uses DislikeModel to remove a  Dislike for tuit.
   * @param {string} uid User id of user who unDislikes the tuit
   * @param {string} tid Tuit id of tuit to be unDisliked
   * @returns Promise To be notified when the Dislikes are deleted from
   * database
   */
    userUndislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.deleteOne({ tuit: tid, dislikedBy: uid });

    /**
      * Uses DislikeModel to retrieve all user documents from Dislikes collection
      * @returns Promise To be notified when the users are retrieved from
      * database
      */

    findAllUsersThatDislikeTuit = async (tid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({ tuit: tid })
            .populate("dislikedBy")
            .exec();

    /**
      * Uses DislikeModel to retrieve all Dislike documents from Dislikes collection
      * @returns Promise To be notified when the Dislikes are retrieved from
      * database
      */
    findAllTuitsDislikedByUser = async (uid: string): Promise<Dislike[]> =>
        DislikeModel
            .find({ dislikedBy: uid })
            .populate({
                path: "tuit",
                populate: {
                    path: "postedBy"
                }
            }).exec();

    findUserDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.find({ dislikedBy: uid, tuit: tid });




    private static DislikeDao: DislikeDao | null = null;
    /**
     * Creates a singleton DAO instance
     * @returns DislikeDao
     */

    public static getInstance = (): DislikeDao => {
        if (DislikeDao.DislikeDao === null) {
            DislikeDao.DislikeDao = new DislikeDao();
        }
        return DislikeDao.DislikeDao;
    }

}