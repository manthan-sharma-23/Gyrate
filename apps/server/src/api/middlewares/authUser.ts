import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "src/config/exports";
import { UserJwtPayload } from "src/utils/interfaces/express";

// Define ProtectedRequest interface extending Request
export interface ProtectedRequest extends Request {
  user?: string; // Example property added by the middleware
}

// Middleware function
export const authUser = (
  req: ProtectedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.header("Authorization");
    if (!token) return res.sendStatus(401);

    if (token.startsWith("Bearer ")) token = token.split(" ")[1];

    const payload = jwt.verify(token!, JWT_SECRET!) as UserJwtPayload;

    if (!payload.userId) {
      return res.sendStatus(401);
    }

    req.user = payload.userId;

    next();
  } catch (error) {
    return res.sendStatus(500);
  }
};
