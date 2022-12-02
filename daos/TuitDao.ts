/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import TuitModel from "../mongoose/TuitModel";
import Tuit from "../models/Tuit";
import TuitDaoI from "../interfaces/TuitDao";
import Stats from "../models/Stats";

/**
 * @class TuitDao Implements Data Access Object managing data storage
 * of Tuits
 * @property {UserDao} userDao Private single instance of TuitDao
 */
export default class TuitDao implements TuitDaoI {
    private static tuitDao: TuitDao | null = null;
    /**
     * Creates singleton DAO instance
     * @returns TuitDao
     */
    public static getInstance = (): TuitDao => {
        if (TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }
    private constructor() { }

    /**
     * Uses TuitModel to retrieve all tuit documents from tuits collection
     * @returns Promise To be notified when the tuits are retrieved from
     * database
     */
    findAllTuits = async (): Promise<Tuit[]> =>
        TuitModel.find()
            .exec();
    /**
      * Uses TuitModel to retrieve all tuit documents by a user from tuits
      * collection using user uid identifying user primary key 
      * @param {string} uid User's primary key
      * @returns Promise To be notified when the tuits are retrieved from
      * database
      */

    findAllTuitsByUser = async (uid: string): Promise<Tuit[]> =>
        TuitModel.find({ postedBy: uid })
            .exec();

    /**
      * Uses TuitModel to retrieve the tuit documens by a user
      * @param {string} tid Tuit's primary key
      * @returns Promise To be notified when the tuit is retrieved from
      * database
      */
    findTuitById = async (tid: string): Promise<any> =>
        TuitModel.findById(tid)
            .populate("tuit")
            .populate("postedBy")
            .exec();

    /**
     * Inserts tuit instance into the database
     * @param {Tuit} tuit Instance to be inserted into the database by a
     * @param {User} user user instance
     * @returns Promise To be notified when tuit is inserted into the database
     */
    createTuitByUser = async (uid: string, tuit: Tuit): Promise<Tuit> =>
        TuitModel.create({ ...tuit, postedBy: uid });

    /**
 * Updates tuit instance into the database
 * @param {Tuit} tuit Instance to be inserted into the database by a
 * @param {User} user user instance
 * @returns Promise To be notified when tuit is updated into the database
 */
    updateTuit = async (uid: string, tuit: Tuit): Promise<any> =>
        TuitModel.updateOne(
            { _id: uid },
            { $set: tuit });

    /**
  * Removes tuit instance from the database
  * @param {Tuit} tuit Instance to be removed from the database by user
  * @returns Promise To be notified when tuit is removed into the database
  */
    deleteTuit = async (tid: string): Promise<any> =>
        TuitModel.deleteOne({ _id: tid });

    /**
    * Removes tuit instance given a specific tuit message string from the database. This is for testing only.
    * @param {Tuit} tuit Instance to be removed from the database by user
    * @returns Promise To be notified when tuit is removed into the database
    */
    deleteTuitsByTuit = async (tuit: string): Promise<any> =>
        TuitModel.deleteMany({ tuit: tuit });


    /**
    * Updates tuit stats instance given a tuit id from the database.
    * @param {string} tid Tuit's primary key
    * @param {Stats} newStats Stats object instance to be updated
    *  @returns Promise To be notified when tuit is update with stats into the database
    */
    updateLikes =
        async (tid: string, newStats: Stats) =>
            TuitModel.updateOne(
                { _id: tid },
                { $set: { stats: newStats } });


    /**
    * Updates tuit stats instance given a tuit id from the database.
    * @param {string} tid Tuit's primary key
    * @param {Stats} newStats Stats object instance to be updated
    *  @returns Promise To be notified when tuit is update with stats into the database
    */
    updateDislikes =
        async (tid: string, newStats: Stats) =>
            TuitModel.updateOne(
                { _id: tid },
                { $set: { stats: newStats } });
}