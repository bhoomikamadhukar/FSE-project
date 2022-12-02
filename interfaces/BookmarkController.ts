/**
 * @file Interface that has method signatures for API for Bookmark related controller methods
 */
import {Request, Response} from "express";

export default interface BookmarkControllerI {
    findAllTuitsBookmarkedByUser (req: Request, res: Response): void;
    findAllUsersThatBookmarkedTuit (req: Request, res: Response): void;
    userBookmarksTuit (req: Request, res: Response): void;
    userRemovesBookmarkTuit (req: Request, res: Response): void;
};
