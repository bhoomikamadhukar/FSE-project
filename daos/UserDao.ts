import User from "../models/User";
import UserModel from "../mongoose/UserModel";
import UserDaoI from "../interfaces/UserDao";

export default class UserDao implements UserDaoI {
    async findAllUsers(): Promise<User[]> {
        const userMongooseModels = await UserModel.find();
        const userModels = userMongooseModels
            .map((userMongooseModel) => {
                return new User(
                    userMongooseModel?._id.toString()??'',
                    userMongooseModel?.username??'',
                    userMongooseModel?.password??'',
                );
            });
        return userModels;
    }
    async findUserById(uid: string): Promise<any> {
        const userMongooseModel = await UserModel.findById(uid);
        return new User(
            userMongooseModel?._id.toString()??'',
            userMongooseModel?.username??'',
            userMongooseModel?.password??'',
        );
    }
    async createUser(user: User): Promise<User> {
        const userMongooseModel = await UserModel.create(user);
        return new User(
            userMongooseModel?._id.toString()??'',
            userMongooseModel?.username??'',
            userMongooseModel?.password??'',
        );
    }
    async deleteUser(uid: string):  Promise<any> {
        return await UserModel.deleteOne({_id: uid});
    }
    async updateUser(uid: string, user: User): Promise<any> {
        return await UserModel.updateOne({_id: uid}, {$set: {
                username: user.uName,
                password: user.pass
            }});
    }
}