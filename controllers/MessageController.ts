/**
 * @file Controller RESTful Web service API for message resource
 */
import {Express, Request, Response} from "express";
import MessageDao from "../daos/MessageDao";
import MessageControllerI from "../interfaces/MessageController";
import Message from "../models/Message"
/**
 * @class MessageController Implements RESTful Web service API for message resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid1/messages/:uid2 to send messages to users </li>
 *     <li>GET /api/users/:uid/sentMessages retrieve all sent messages of a particular user </li>
 *     <li>GET /api/users/:uid/recievedMessages to retrieve all recievedMessages of a particular user </li>
 *     <li>DELETE /api/messages/:mid/ to remove a particular message instance </li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing message CRUD operations
 * @property {MessageController} tuitController Singleton controller implementing
 * RESTful Web service API
 */
export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static MessageController: MessageController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @returns MessageController
     */
    public static getInstance = (app: Express): MessageController => {
        if(MessageController.MessageController === null) {
            MessageController.MessageController = new MessageController();
            app.post("/api/users/:uid1/messages/:uid2", MessageController.MessageController.userMessagesUser);
            app.get("/api/users/:uid/sentMessages", MessageController.MessageController.findAllSentMessages);
            app.get("/api/users/:uid/recievedMessages", MessageController.MessageController.findAllRecievedMessages);
            app.delete("/api/messages/:mid/", MessageController.MessageController.userDeletesMessage);
        }
        return MessageController.MessageController;
    }

    private constructor() {}

    /**
     * Retrieves all sent messages from the database and returns an array of messages.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findAllSentMessages = (req: Request, res: Response) =>
        MessageController.messageDao.findAllSentMessages(req.params.uid)
            .then((messages) => res.json(messages));
    /**
     * Retrieves all recieved messages from the database and returns an array of messages.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findAllRecievedMessages = (req: Request, res: Response) =>
        MessageController.messageDao.findAllRecievedMessages(req.params.uid)
            .then((messages) => res.json(messages));
    /**
     * User sends a new message and it creates a message instance
     * @param {Request} req Represents request from client, including body
     * containing the JSON object for the new tuit to be inserted in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new message that was inserted in the
     * database
     */
    userMessagesUser = (req: Request, res: Response) =>
        MessageController.messageDao.userMessagesUser(req.params.uid1,req.params.uid2,req.body)
            .then((message:Message) => res.json(message));
    /**
     * Removes a message instance from the database
     * @param {Request} req Represents request from client, including path
     * parameter tid identifying the primary key of the tuit to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a tuit was successful or not
     */
    userDeletesMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userDeletesMessage(req.params.mid)
            .then(status => res.send(status));
};
