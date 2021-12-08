import express from "express";
import { NotFoundError } from "../exceptions/NotFoundError";
import { UniqueError } from "../exceptions/UniqueError";
import { WrongTypeError } from "../exceptions/WrongTypeError";
import { BaseUser, castToBaseUser } from "../users/users.interface";
import { castToCredentials, Credentials } from "./auth.interface";
import * as AuthService from "./auth.service";

export const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  try {
    const credentials = castToCredentials(req.body);
    const token = await AuthService.login(credentials);
    console.log(token);
    res.status(200).json({ jwt: token });
  } catch (e) {
    if (e instanceof NotFoundError) {
      res.status(403).json({ message: e.getMessage() });
    } else if (e instanceof WrongTypeError) {
      res.status(403).json({ message: "Bad request (body)" });
    } else {
      res.sendStatus(500);
    }
  }
});

authRouter.post("/register", async (req, res) => {
  try {
    const user: BaseUser = castToBaseUser(req.body);
    const newUser = await AuthService.register(user);
    res.status(201).json(newUser);
  } catch (e) {
    if (e instanceof UniqueError) {
      res.status(403).json({ message: e.getMessage() });
    } else if (e instanceof WrongTypeError) {
      res.status(403).json({ message: "Bad request (body)" });
    } else {
      res.sendStatus(500);
    }
  }
});
