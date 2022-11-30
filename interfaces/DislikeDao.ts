import Dislike from "../models/Dislike";
import Tuit from "../models/Tuit";
import User from "../models/User";

export default interface DislikeDao {
    /**
     * Uses LikeModel to create a new like for tuit.
     * @param {string} uid User id of user who Dislikes the tuit
     * @param {string} tid Tuit id of tuit to be liked
     * @returns Promise To be notified when the Dislikes are retrieved from
     * database
     */
    userDislikesTuit(uid: string, tid: string): Promise<any>;
    /**
     * Uses LikeModel to remove a  like for tuit.
     * @param {string} uid User id of user who unliked the tuit
     * @param {string} tid Tuit id of tuit to be unliked
     * @returns Promise To be notified when the Dislikes are retrieved from
     * database
     */
    userUndislikesTuit(uid: string, tid: string): Promise<any>;
    /**
     * Uses LikeModel to retrieve all Dislikes from Dislikes collection
     * @param {string} tid Tuit id for which Dislikes are to be retrieved
     * @returns Promise To be notified when the Dislikes are retrieved from
     * database
     */
     findAllTuitsDislikedByUser(uid: string): Promise<Dislike[]>;
    /**
 * Uses LikeModel to retrieve all Dislikes from Dislikes collection
 * @param {string} uid Userids of users who liked the tuit
 * @returns Promise To be notified when the Dislikes are retrieved from
 * database
 */
    findAllUsersThatDislikeTuit(tid: string): Promise<Dislike[]>;
    /**
     * Uses LikeModel to count Dislikes on a tuit.
     * @returns Promise To be notified with the Dislikes count.
     */
    findTuitDislikesCount(tid: string): void

    findUserDislikesTuit(uid:string,tid:string):Promise<any>;
}