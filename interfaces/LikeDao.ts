/**
 * @file Interface that has method signatures for API for Likes related data access object methods
 */
import Like from "../models/Like";
import Tuit from "../models/Tuit";
import User from "../models/User";

export default interface LikeDao {
    userLikesTuit(uid: string, tid: string):Promise<any>;
    userUnlikesTuit(uid:string, tid:string):Promise<any>;
    findAllTuitsLikedByUser(uid:string):Promise<Like[]>;
    findAllUsersThatLikedTuit(tid:string):Promise<Like[]>;
}
