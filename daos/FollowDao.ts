/**
 * @file Implements DAO managing data storage of follows. Uses mongoose FollowModel
 * to integrate to intergrate with MongoDB.
 */
import Follow from "../models/Follow";
import FollowModel from "../mongoose/FollowModel";
import FollowDaoI from "../interfaces/FollowDao";
import User from "../models/User";

/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Follows
 * @property {Follow} followDao Private single instance of FollowDao
 */
export default class FollowDao implements FollowDaoI {
  /**
   * Inserts follow instance into the database
   * @param {string} uid1 User1 who follows another user and instance is added to the database.
   * @param {string} uid2 User2 who gets followed by another user sent and instance is added to the database.
   * @returns Promise To be notified when follow is sent to user and put into the database
   */
    userFollowsUser = async (uid1: string, uid2: string): Promise<any> =>
        FollowModel.create({followedBy: uid1, currUser: uid2});
    /**
     * Deletes follow instance from the database
     * @param {string} uid1 Users primary key
     * @param {string} uid2 Users primary key
     * @returns Promise To be acknowledge when follow is deleted.
     */
     userUnFollowsUser = async (uid1: string, uid2: string): Promise<any> =>
        FollowModel.deleteOne({followedBy: uid1, currUser: uid2});
    /**
     * Uses FollowModel to retrieve all follows sent by a particular
     * user
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the follows are retrieved from
     * database
     */
    findAllFollowers = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({currUser: uid})
            .populate("followedBy")
            .exec();
    /**
     * Uses FollowModel to see all following of a particular
     * user
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the followings are retrieved from
     * database
     */
    findAllFollowing = async (uid: string): Promise<Follow[]> =>
        FollowModel
            .find({followedBy: uid})
            .populate("currUser")
            .exec();
    /**
     * Creates singleton DAO instance
     * @returns FollowDao
     */
    private static followDao: FollowDao | null = null;
    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

}
