/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import Message from "../models/Message";
import MessageModel from "../mongoose/MessageModel";
import MessageDaoI from "../interfaces/MessageDao";
import User from "../models/User";

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Message
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {

  /**
   * Inserts message instance into the database
   * @param {string} uid1 User1 who messages another user and instance is added to the database.
   * @param {string} uid2 User2 who gets a messages another user sent and instance is added to the database.
   * @param {string} message the content user1 sends to user2.
   * @returns Promise To be notified when message is sent to user and put into the database
   */
    userMessagesUser =  async (uid1: string, uid2: string, message: Message): Promise<Message> =>
        MessageModel.create({...message, sentTo: uid2, sentFrom: uid1});
    /**
     * Deletes message instance from the database
     * @param {string} mid Message Id to be deleted.
     * @returns Promise To be acknowledge when message is deleted.
     */
    userDeletesMessage = async (mid:string): Promise<any> =>
        MessageModel.deleteOne({_id:mid});
    /**
     * Uses MessageModel to retrieve all messages sent by a particular
     * user
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the messages are retrieved from
     * database
     */
    findAllSentMessages = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({sentFrom: uid})
            .populate("message")
            .exec();
    /**
     * Uses MessageModel to retrieve all messages recieved by a particular
     * user
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the messages are retrieved from
     * database
     */
    findAllRecievedMessages = async (uid: string): Promise<Message[]> =>
        MessageModel
            .find({sentTo: uid})
            .populate("message")
            .exec();
    /**
     * Creates singleton DAO instance
     * @returns MessageDao
     */
    private static messageDao: MessageDao | null = null;
    public static getInstance = (): MessageDao => {
        if(MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

}
