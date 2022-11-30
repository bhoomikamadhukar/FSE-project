/**
 * @file Implements DAO managing data storage of users. Uses mongoose UserModel
 * to integrate with MongoDB
 */
import UserModel from "../mongoose/UserModel";
import User from "../models/User";
import AdminDaoI from "../interfaces/AdminDao";

/**
 * @class Implements Data Access Object managing data storage
 * of Users
 * @implements {AdminDaoI} AdminDaoI
 * @property {AdminDao} adminDao Private single instance of AdminDao
 */
export default class AdminDao implements AdminDaoI {
    private static adminDao: AdminDao | null = null;
    public static getInstance = (): AdminDao => {
        if(AdminDao.adminDao === null) {
            AdminDao.adminDao = new AdminDao();
        }
        return AdminDao.adminDao;
    }
    private constructor() {}
    /**
      * Retrieves all users from the database and returns an array of users.
      */
    findAllUsers = async (): Promise<User[]> =>
        UserModel.find().exec();
    /**
      * Retrieves user object from the database for a particular user id and returns
      * a user object.
      * @param {String} aid user id
      */
    findUserById = async (aid: string): Promise<any> =>
        UserModel.findById(aid);
/**
      * Retrieves user object from the database for a particular username and returns
      * a user object.
      * @param {String} userName username
      */
      findUserByUsername = async(username:string):Promise<any>=>
        UserModel.findOne({username:username});
    /**
     * Create user
      * @param {User} user user object
      */

    createUser = async (user: User): Promise<User> =>
        UserModel.create(user);
    /** Update user
      * @param {String} aid user id
      * @param {User} user user object
      */
    updateUser = async (aid: string, user: User): Promise<any> =>
        UserModel.updateOne(
            {_id: aid},
            {$set: user});
    /** Delete the user
      * @param {String} aid user id
    **/
    deleteUser = async (aid: string): Promise<any> =>
        UserModel.deleteOne({_id: aid});

    /**
   * Removes all users with a specific username string from the database. Useful for testing
   * @returns Promise To be notified when users with specific usernames are removed from the
   * database
   */
   deleteUsersByUsername = async (username:string): Promise<any> =>
      UserModel.deleteMany({username:username});

};
