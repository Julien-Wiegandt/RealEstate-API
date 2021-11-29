import { RequestHandler } from "express";
import { verify } from "jsonwebtoken";

export const verifyAccess: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split("Bearer ")[1];
  console.log(token);
  if (!token) {
    res.sendStatus(401);
    return;
  }
  verify(token, process.env.JWT_KEY!, (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(401);
      return;
    }
    if (result && result.access_token) {
      console.log(result);
      req.user = result.user;
      next();
    } else {
      res.sendStatus(403);
      return;
    }
  });
};
