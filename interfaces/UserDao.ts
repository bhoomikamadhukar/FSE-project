/**
 * @file Interface that has method signatures for API for Users related data access object methods
 */
import User from "../models/User";

export default interface AdminDao {
   findAllUsers(): Promise<User[]>;
   findUserById(uid: string): Promise<any>;
   findUserByUsername(username:string):Promise<any>;
   createUser(user: User): Promise<User>;
   updateUser(uid: string, user: User): Promise<any>;
   deleteUser(uid: string): Promise<any>;
   deleteUsersByUsername(username:string): Promise<any>;
}
