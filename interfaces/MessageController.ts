/**
 * @file Interface that has method signatures for API for Messages related controller methods
 */
import {Request, Response} from "express";

export default interface MessageControllerI {
    userMessagesUser (req: Request, res: Response): void;
    userDeletesMessage (req: Request, res: Response): void;
    findAllSentMessages (req: Request, res: Response): void;
    findAllRecievedMessages (req: Request, res: Response): void;
};
