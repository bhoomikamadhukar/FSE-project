/**
 * @file Interface that has method signatures for API for Users related controller methods
 */
import {Request, Response} from "express";

export default interface AdminController {
    findAllUsers (req: Request, res: Response): void;
    findUserById (req: Request, res: Response): void;
    findUserByUsername (req: Request, res: Response): void;
    createUser (req: Request, res: Response): void;
    updateUser (req: Request, res: Response): void;
    deleteUser (req: Request, res: Response): void;

};
