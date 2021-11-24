import { RequestHandler } from "express";
import { verify } from "jsonwebtoken";

export const verifyAccess: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split("Bearer ")[1];
  if (!token) {
    res.sendStatus(401);
    return;
  }
  verify(token, process.env.JWT_KEY!, (err, result) => {
    if (err) {
      res.sendStatus(401);
      return;
    }
    if (result!.access_token) {
      req.user = result!.user;
      next();
    } else {
      res.sendStatus(403);
      return;
    }
  });
};
