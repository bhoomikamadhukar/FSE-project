import Like from "../models/Like";
import Tuit from "../models/Tuit";
import User from "../models/User";

export default interface LikeDao {
    /**
     * Uses LikeModel to create a new like for tuit.
     * @param {string} uid User id of user who likes the tuit
     * @param {string} tid Tuit id of tuit to be liked
     * @returns Promise To be notified when the likes are retrieved from
     * database
     */
    userLikesTuit(uid: string, tid: string): Promise<any>;
    /**
     * Uses LikeModel to remove a  like for tuit.
     * @param {string} uid User id of user who unliked the tuit
     * @param {string} tid Tuit id of tuit to be unliked
     * @returns Promise To be notified when the likes are retrieved from
     * database
     */
    userUnlikesTuit(uid: string, tid: string): Promise<any>;
    /**
     * Uses LikeModel to retrieve all likes from likes collection
     * @param {string} tid Tuit id for which likes are to be retrieved
     * @returns Promise To be notified when the likes are retrieved from
     * database
     */
    findAllTuitsLikedByUser(uid: string): Promise<Like[]>;
    /**
 * Uses LikeModel to retrieve all likes from likes collection
 * @param {string} uid Userids of users who liked the tuit
 * @returns Promise To be notified when the likes are retrieved from
 * database
 */
    findAllUsersThatLikedTuit(tid: string): Promise<Like[]>;
    /**
     * Uses LikeModel to count likes on a tuit.
     * @returns Promise To be notified with the likes count.
     */
    findTuitLikesCount(tid: string): void


    /**
     * Uses LikeModel to find the like with a specific user and tuit.
     * @param {string} uid User id of user who unliked the tuit
     * @param {string} tid Tuit id of tuit to be unliked
     * @returns Promise To be notified when the likes are retrieved from
     * database
     */

    findUserLikesTuit(uid:string,tid:string):Promise<any>;
}