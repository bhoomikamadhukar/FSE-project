/**
 * @file Implements schema for messages collection
 */
import mongoose, { Schema } from "mongoose";
import Message from '../models/Message';
/**
 * @typedef MessageSchema is the Message Schema in mongoose
 * @property {string} message message to be sent
 * @property {User} sentFrom user who sends the Messages
 * @property {User} sentTo user who receives the Messages
 * @property {Date} sentOn time the message was sent
 */
const MessageSchema = new mongoose.Schema<Message>({
  message:{type:String},
  sentFrom: {type: Schema.Types.ObjectId, ref: "UserModel"},
  sentTo: {type: Schema.Types.ObjectId, ref: "UserModel"},
  sentOn:{type: Date, default: Date.now}
}, {collection: 'messages'});
export default MessageSchema;
