import User from "../models/User";
import session from "express-session";

declare module "express-session" {
    interface Session {
      profile:User;
    }
  }
export=session;