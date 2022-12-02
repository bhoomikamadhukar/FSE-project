/**
 * @file Interface that has method signatures for API for Follows related data access object methods
 */
import Follow from "../models/Follow";
import User from "../models/User";

export default interface FollowDaoI {
    userFollowsUser(uid1: string, uid2: string):Promise<any>;
    userUnFollowsUser(uid1:string, uid2:string):Promise<any>;
    findAllFollowers(uid:string):Promise<Follow[]>;
    findAllFollowing(uid:string):Promise<Follow[]>;
}
