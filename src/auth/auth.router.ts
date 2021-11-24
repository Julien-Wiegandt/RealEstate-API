import express from "express";
import { BaseUser } from "../users/users.interface";
import { Credentials } from "./auth.interface";
import * as AuthService from "./auth.service";

export const authRouter = express.Router();

authRouter.get("/login", async (req, res) => {
  try {
    const credentials: Credentials = req.body;
    const token = await AuthService.login(credentials);
    res.status(200).json(token);
  } catch {
    res.sendStatus(500);
  }
});

authRouter.post("register", async (req, res) => {
  try {
    const user: BaseUser = req.body;
    const newUser = await AuthService.register(user);
    return newUser;
  } catch {
    res.sendStatus(500);
  }
});
