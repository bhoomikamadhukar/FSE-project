/**
 * @file Implements the model that
 * uses messages schema in the messages collection
 */
import mongoose from "mongoose";
import MessageSchema from "./MessageSchema";
/**
 * @typedef MessageModel is the implementation of Message model in mongoose
 */
const MessageModel = mongoose.model('MessageSchema', MessageSchema);
export default MessageModel;
