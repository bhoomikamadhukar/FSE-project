/**
 * @file Interface that has method signatures for API for Follows related controller methods
 */
import {Request, Response} from "express";

export default interface FollowControllerI {
    findAllFollowing (req: Request, res: Response): void;
    findAllFollowers (req: Request, res: Response): void;
    userFollowsUser (req: Request, res: Response): void;
    userUnFollowsUser (req: Request, res: Response): void;
};
