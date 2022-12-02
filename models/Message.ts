/**
 * @file Implements model for messages collection
 */
import User from "./User";

/**
 * @typedef Message Represents the interaction of users
 * @property {string} message The message sent by user
 * @property {User} sentFrom user who sends the Messages
 * @property {User} sentTo user who receives the Messages
 * @property {Date} sentOn time the message was sent
*/
export default interface Message {
    message: string,
    sentFrom: User,
    sentTo : User,
    sentOn : Date
};
