/**
 * @file Interface that has method signatures for API for Messages related data access object methods
 */
import User from "../models/User";
import Message from "../models/Message"
export default interface MessageDao {
    userMessagesUser(uid1: string, uid2: string, message: Message):Promise<Message>;
    userDeletesMessage(mid:string):Promise<any>;
    findAllSentMessages(uid:string):Promise<Message[]>;
    findAllRecievedMessages(uid:string):Promise<Message[]>;
}
